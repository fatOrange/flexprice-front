import { Decimal } from 'decimal.js';
import { INVOICE_STATUS, type Invoice } from '@/models/Invoice';
import { PAYMENT_STATUS } from '@/constants/payment';

type RefundableInvoice = Pick<Invoice, 'amount_paid' | 'refunded_amount'>;
type RefundEligibilityInvoice = Pick<Invoice, 'invoice_status' | 'payment_status' | 'amount_paid' | 'refunded_amount'>;

/**
 * Payment states the backend turns into a REFUND credit note. PAYMENT_STATUS.OVERPAID has no
 * case in the backend's credit-note type switch, so it is deliberately absent: refunding an
 * overpaid invoice is rejected server-side.
 */
const REFUNDABLE_PAYMENT_STATUSES: Partial<Record<PAYMENT_STATUS, true>> = {
	[PAYMENT_STATUS.SUCCEEDED]: true,
	[PAYMENT_STATUS.PARTIALLY_REFUNDED]: true,
};

/**
 * Amount still refundable on an invoice: what was paid minus what has already been refunded.
 *
 * Uses decimal arithmetic because money is stored as decimal values on the backend; subtracting
 * binary floats can leave a phantom residual (0.3 - 0.1 = 0.19999999999999998) and enable a
 * refund for an invoice that is actually exhausted. Invalid or non-finite input is never
 * refundable.
 */
export const getRefundableAmount = (invoice: RefundableInvoice): number => {
	const paid = new Decimal(invoice.amount_paid ?? 0);
	const refunded = new Decimal(invoice.refunded_amount ?? 0);
	if (!paid.isFinite() || !refunded.isFinite()) return 0;

	const remaining = paid.minus(refunded);
	if (!remaining.isPositive()) return 0;

	const amount = remaining.toNumber();
	return Number.isFinite(amount) ? amount : 0;
};

/**
 * Whether an invoice can start a refund through the existing credit-note flow. The backend only
 * refunds FINALIZED invoices whose payment status is SUCCEEDED or PARTIALLY_REFUNDED, and caps
 * the refund at amount_paid - refunded_amount.
 */
export const canRefundInvoice = (invoice: RefundEligibilityInvoice): boolean =>
	invoice.invoice_status === INVOICE_STATUS.FINALIZED &&
	REFUNDABLE_PAYMENT_STATUSES[invoice.payment_status] === true &&
	getRefundableAmount(invoice) > 0;
