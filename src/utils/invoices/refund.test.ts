import { describe, expect, it } from 'vitest';
import { INVOICE_STATUS } from '@/models/Invoice';
import type { Invoice } from '@/models/Invoice';
import { PAYMENT_STATUS } from '@/constants/payment';
import { canRefundInvoice, getRefundableAmount } from './refund';

type EligibilityFields = Pick<Invoice, 'invoice_status' | 'payment_status' | 'amount_paid' | 'refunded_amount'>;

const eligible = (over: Partial<EligibilityFields> = {}): EligibilityFields => ({
	invoice_status: INVOICE_STATUS.FINALIZED,
	payment_status: PAYMENT_STATUS.SUCCEEDED,
	amount_paid: 100,
	refunded_amount: 0,
	...over,
});

describe('getRefundableAmount', () => {
	it('subtracts decimals without leaving a floating-point residual', () => {
		expect(getRefundableAmount({ amount_paid: 0.3, refunded_amount: 0.1 })).toBe(0.2);
		expect(getRefundableAmount({ amount_paid: 100.1, refunded_amount: 0.2 })).toBe(99.9);
	});

	it('returns zero once the paid amount has been fully refunded', () => {
		expect(getRefundableAmount({ amount_paid: 40, refunded_amount: 40 })).toBe(0);
		expect(getRefundableAmount({ amount_paid: 40, refunded_amount: 55 })).toBe(0);
	});

	it('never returns a value for non-finite amounts', () => {
		expect(getRefundableAmount({ amount_paid: NaN, refunded_amount: 0 })).toBe(0);
		expect(getRefundableAmount({ amount_paid: Infinity, refunded_amount: 0 })).toBe(0);
		expect(getRefundableAmount({ amount_paid: -Infinity, refunded_amount: 0 })).toBe(0);
		expect(getRefundableAmount({ amount_paid: 10, refunded_amount: NaN })).toBe(0);
	});
});

describe('canRefundInvoice', () => {
	it('allows a finalized invoice with successful or partially refunded payment and money left', () => {
		expect(canRefundInvoice(eligible())).toBe(true);
		expect(canRefundInvoice(eligible({ payment_status: PAYMENT_STATUS.PARTIALLY_REFUNDED, amount_paid: 100, refunded_amount: 30 }))).toBe(
			true,
		);
	});

	it('rejects invoices that are not finalized', () => {
		expect(canRefundInvoice(eligible({ invoice_status: INVOICE_STATUS.DRAFT }))).toBe(false);
		expect(canRefundInvoice(eligible({ invoice_status: INVOICE_STATUS.VOIDED }))).toBe(false);
		expect(canRefundInvoice(eligible({ invoice_status: INVOICE_STATUS.SKIPPED }))).toBe(false);
	});

	it('rejects payment states the backend does not turn into a refund', () => {
		for (const paymentStatus of [
			PAYMENT_STATUS.PENDING,
			PAYMENT_STATUS.PROCESSING,
			PAYMENT_STATUS.INITIATED,
			PAYMENT_STATUS.FAILED,
			PAYMENT_STATUS.REFUNDED,
			PAYMENT_STATUS.OVERPAID,
		]) {
			expect(canRefundInvoice(eligible({ payment_status: paymentStatus }))).toBe(false);
		}
	});

	it('rejects an exhausted or invalid refundable amount', () => {
		expect(canRefundInvoice(eligible({ amount_paid: 100, refunded_amount: 100 }))).toBe(false);
		expect(canRefundInvoice(eligible({ amount_paid: 100, refunded_amount: 120 }))).toBe(false);
		expect(canRefundInvoice(eligible({ amount_paid: 0 }))).toBe(false);
		expect(canRefundInvoice(eligible({ amount_paid: NaN }))).toBe(false);
		expect(canRefundInvoice(eligible({ amount_paid: Infinity }))).toBe(false);
	});
});
