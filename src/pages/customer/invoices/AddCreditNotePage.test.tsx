import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { createInstance } from 'i18next';
import type { i18n as I18nInstance } from 'i18next';
import billingEn from '@/i18n/locales/en/billing.json';
import commonEn from '@/i18n/locales/en/common.json';
import type * as AtomsModule from '@/components/atoms';
import type * as ReactRouterModule from 'react-router';

const mockGetInvoiceById = vi.hoisted(() => vi.fn());
const mockCreateCreditNote = vi.hoisted(() => vi.fn());
const mockPreviewCreditNote = vi.hoisted(() => vi.fn());
const mockNavigate = vi.hoisted(() => vi.fn());
const mockRefetchInvoiceQueries = vi.hoisted(() => vi.fn());
const mockRefetchQueries = vi.hoisted(() => vi.fn());
const mockToastSuccess = vi.hoisted(() => vi.fn());
const mockToastError = vi.hoisted(() => vi.fn());

vi.mock('@/api/InvoiceApi', () => ({
	default: {
		getInvoiceById: (...args: unknown[]) => mockGetInvoiceById(...args),
	},
}));

vi.mock('@/api/CreditNoteApi', () => ({
	default: {
		createCreditNote: (...args: unknown[]) => mockCreateCreditNote(...args),
		previewCreditNote: (...args: unknown[]) => mockPreviewCreditNote(...args),
	},
}));

vi.mock('@/store/useBreadcrumbsStore', () => ({
	useBreadcrumbsStore: () => ({ updateBreadcrumb: vi.fn(), setSegmentLoading: vi.fn() }),
}));

vi.mock('react-hot-toast', () => ({
	default: { success: mockToastSuccess, error: mockToastError },
}));

vi.mock('@/core/services/tanstack/queryKeys', () => ({
	refetchInvoiceQueries: mockRefetchInvoiceQueries,
}));

vi.mock('@/core/services/tanstack/ReactQueryProvider', () => ({
	refetchQueries: mockRefetchQueries,
}));

vi.mock('@/components/organisms/PlanForm/SetupChargesSection', () => ({
	AddChargesButton: ({ onClick, label }: { onClick: () => void; label: string }) => <button onClick={onClick}>{label}</button>,
}));

// Radix Select does not open in jsdom; a native select keeps the page behaviour testable.
vi.mock('@/components/atoms', async (importOriginal) => {
	const actual = await importOriginal<typeof AtomsModule>();
	return {
		...actual,
		Select: ({
			options,
			value,
			onChange,
			placeholder,
			disabled,
		}: {
			options: { value: string; label: string }[];
			value?: string;
			onChange?: (value: string) => void;
			placeholder?: string;
			disabled?: boolean;
		}) => (
			<select aria-label={placeholder} value={value ?? ''} disabled={disabled} onChange={(event) => onChange?.(event.target.value)}>
				<option value=''>Choose...</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		),
	};
});

vi.mock('react-router', async () => {
	const actual = await vi.importActual<typeof ReactRouterModule>('react-router');
	return {
		...actual,
		useParams: () => ({ invoice_id: 'inv_1' }),
		useNavigate: () => mockNavigate,
	};
});

import AddCreditNotePage from './AddCreditNotePage';

let testI18n: I18nInstance;

beforeAll(async () => {
	const instance = createInstance();
	await instance.use(initReactI18next).init({
		lng: 'en',
		fallbackLng: 'en',
		ns: ['billing', 'common'],
		defaultNS: 'billing',
		resources: { en: { billing: billingEn, common: commonEn } },
		interpolation: { escapeValue: false },
	});
	testI18n = instance;
});

const createQueryClient = (queries: { refetchOnMount?: boolean } = {}) =>
	new QueryClient({
		defaultOptions: { queries: { retry: false, ...queries }, mutations: { retry: false } },
	});

const renderPage = (entry = '/credit-note?refund_target=BACK_TO_SOURCE', queryClient = createQueryClient()) => {
	return render(
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={testI18n}>
				<MemoryRouter initialEntries={[entry]}>
					<AddCreditNotePage />
				</MemoryRouter>
			</I18nextProvider>
		</QueryClientProvider>,
	);
};

const makeInvoice = (overrides: Record<string, unknown> = {}) => ({
	id: 'inv_1',
	invoice_number: 'INV-001',
	invoice_status: 'FINALIZED',
	payment_status: 'SUCCEEDED',
	currency: 'usd',
	amount_paid: 100,
	refunded_amount: 0,
	amount_remaining: 0,
	amount_due: 0,
	customer: { external_id: 'cust_1' },
	line_items: [{ id: 'li_1', display_name: 'Plan', quantity: '1', amount: 100 }],
	...overrides,
});

const quote = (subtotal: number, tax = 0) => ({
	subtotal: String(subtotal),
	total_tax: String(tax),
	total_amount: String(subtotal + tax),
	currency: 'usd',
	credit_note_type: 'REFUND',
});

const chooseReasonAndAmount = async (amount: string) => {
	await screen.findByText('INV-001');
	await screen.findByPlaceholderText('0.00');
	await userEvent.selectOptions(screen.getByLabelText('Select a reason'), 'DUPLICATE');
	fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: amount } });
};

describe('AddCreditNotePage refunds', () => {
	beforeEach(() => {
		mockGetInvoiceById.mockReset();
		mockCreateCreditNote.mockReset();
		mockPreviewCreditNote.mockReset();
		mockNavigate.mockReset();
		mockRefetchInvoiceQueries.mockReset().mockResolvedValue(undefined);
		mockRefetchQueries.mockReset().mockResolvedValue(undefined);
		mockToastSuccess.mockReset();
		mockToastError.mockReset();
	});

	it('submits an explicit BACK_TO_SOURCE refund at the full remaining amount', async () => {
		mockGetInvoiceById.mockResolvedValue(makeInvoice());
		mockPreviewCreditNote.mockResolvedValue(quote(100));
		mockCreateCreditNote.mockResolvedValue({ id: 'cn_1' });

		renderPage();
		await chooseReasonAndAmount('100');

		const cta = screen.getByRole('button', { name: 'Refund payment' });
		await waitFor(() => expect(cta).toBeEnabled(), { timeout: 2000 });

		await userEvent.click(cta);
		const dialog = await screen.findByRole('dialog');
		expect(within(dialog).getByText('Original payment method')).toBeInTheDocument();
		const confirm = within(dialog).getByRole('button', { name: 'Submit refund' });
		await waitFor(() => expect(confirm).toBeEnabled());

		await userEvent.click(confirm);

		await waitFor(() => expect(mockCreateCreditNote).toHaveBeenCalledTimes(1));
		expect(mockCreateCreditNote).toHaveBeenCalledWith(
			expect.objectContaining({
				invoice_id: 'inv_1',
				reason: 'DUPLICATE',
				process_credit_note: true,
				refund_target: 'BACK_TO_SOURCE',
				line_items: [expect.objectContaining({ invoice_line_item_id: 'li_1', amount: 100 })],
			}),
		);
	});

	it('blocks a refund when tax pushes the quote over the remaining refundable amount', async () => {
		mockGetInvoiceById.mockResolvedValue(makeInvoice());
		mockPreviewCreditNote.mockResolvedValue(quote(100, 10));

		renderPage();
		await chooseReasonAndAmount('100');

		await waitFor(() => expect(screen.getByText('Tax')).toBeInTheDocument(), { timeout: 2000 });
		expect(screen.getByRole('button', { name: 'Refund payment' })).toBeDisabled();
		expect(mockCreateCreditNote).not.toHaveBeenCalled();
	});

	it('does not let a stale quote authorize a changed amount', async () => {
		mockGetInvoiceById.mockResolvedValue(makeInvoice());
		mockPreviewCreditNote.mockImplementation(({ line_items }: { line_items: { amount: number }[] }) =>
			Promise.resolve(quote(line_items[0].amount)),
		);

		renderPage();
		await chooseReasonAndAmount('50');

		const cta = screen.getByRole('button', { name: 'Refund payment' });
		await waitFor(() => expect(cta).toBeEnabled(), { timeout: 2000 });

		// The 50 quote is still cached, but the amounts on screen are now 80.
		fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '80' } });
		expect(screen.getByRole('button', { name: 'Refund payment' })).toBeDisabled();

		await waitFor(() => expect(screen.getByRole('button', { name: 'Refund payment' })).toBeEnabled(), { timeout: 2000 });
		expect(mockPreviewCreditNote).toHaveBeenCalledTimes(2);
	});

	it('does not turn a refund link into an adjustment when the invoice is no longer refundable', async () => {
		mockGetInvoiceById.mockResolvedValue(makeInvoice({ payment_status: 'REFUNDED', amount_paid: 100, refunded_amount: 100 }));
		mockPreviewCreditNote.mockResolvedValue(quote(20, 5));

		renderPage();
		await chooseReasonAndAmount('20');
		await screen.findByRole('alert');
		await waitFor(() => expect(screen.getByText('Tax')).toBeInTheDocument(), { timeout: 2000 });

		const refundCta = screen.getByRole('button', { name: 'Refund payment' });
		expect(refundCta).toBeDisabled();
		await userEvent.click(refundCta);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: /create credit note/i })).not.toBeInTheDocument();
		expect(mockCreateCreditNote).not.toHaveBeenCalled();
	});

	it('does not submit from a cached invoice while the shared invoice query is still refreshing', async () => {
		// Mirrors the app's global refetchOnMount=false; the page must opt in to a fresh invoice.
		const queryClient = createQueryClient({ refetchOnMount: false });
		queryClient.setQueryData(['fetchInvoice', 'inv_1'], makeInvoice());
		mockGetInvoiceById.mockReturnValue(new Promise(() => {}));
		mockPreviewCreditNote.mockResolvedValue(quote(20, 5));

		renderPage(undefined, queryClient);
		await chooseReasonAndAmount('20');
		await waitFor(() => expect(screen.getByText('Tax')).toBeInTheDocument(), { timeout: 2000 });
		await waitFor(() => expect(mockGetInvoiceById).toHaveBeenCalledTimes(1));

		const refundCta = screen.getByRole('button', { name: 'Refund payment' });
		expect(refundCta).toBeDisabled();
		await userEvent.click(refundCta);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: /create credit note/i })).not.toBeInTheDocument();
		expect(mockCreateCreditNote).not.toHaveBeenCalled();
	});

	it('does not submit from a cached eligible invoice when the fresh invoice is ineligible', async () => {
		const queryClient = createQueryClient({ refetchOnMount: false });
		queryClient.setQueryData(['fetchInvoice', 'inv_1'], makeInvoice());
		mockGetInvoiceById.mockResolvedValue(makeInvoice({ payment_status: 'REFUNDED', amount_paid: 100, refunded_amount: 100 }));
		mockPreviewCreditNote.mockResolvedValue(quote(20, 5));

		renderPage(undefined, queryClient);
		await waitFor(() => expect(queryClient.getQueryData(['fetchInvoice', 'inv_1'])).toMatchObject({ payment_status: 'REFUNDED' }));
		await screen.findByRole('alert');
		await chooseReasonAndAmount('20');
		await waitFor(() => expect(screen.getByText('Tax')).toBeInTheDocument(), { timeout: 2000 });

		const refundCta = screen.getByRole('button', { name: 'Refund payment' });
		expect(refundCta).toBeDisabled();
		await userEvent.click(refundCta);
		expect(screen.queryByRole('button', { name: /create credit note/i })).not.toBeInTheDocument();
		expect(mockCreateCreditNote).not.toHaveBeenCalled();
	});

	it('keeps the adjustment flow unchanged and omits refund_target', async () => {
		mockGetInvoiceById.mockResolvedValue(makeInvoice({ payment_status: 'FAILED', amount_paid: 0, refunded_amount: 0 }));
		mockPreviewCreditNote.mockResolvedValue(quote(20));
		mockCreateCreditNote.mockResolvedValue({ id: 'cn_2' });

		renderPage('/credit-note');
		await chooseReasonAndAmount('20');

		expect(screen.getByRole('heading', { name: 'Issue Credit Note' })).toBeInTheDocument();
		expect(screen.queryByText('Refund destination')).not.toBeInTheDocument();

		const cta = screen.getByRole('button', { name: 'Create Credit Note' });
		await waitFor(() => expect(cta).toBeEnabled(), { timeout: 2000 });
		await userEvent.click(cta);

		const dialog = await screen.findByRole('dialog');
		const confirm = within(dialog).getByRole('button', { name: 'Create Credit Note' });
		await waitFor(() => expect(confirm).toBeEnabled());
		await userEvent.click(confirm);

		await waitFor(() => expect(mockCreateCreditNote).toHaveBeenCalledTimes(1));
		expect(mockCreateCreditNote).toHaveBeenCalledWith(
			expect.objectContaining({
				invoice_id: 'inv_1',
				reason: 'DUPLICATE',
				process_credit_note: true,
			}),
		);
		expect(mockCreateCreditNote.mock.calls[0][0]).not.toHaveProperty('refund_target');
	});
});
