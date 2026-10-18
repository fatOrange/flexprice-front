import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import { Locale } from '@/config/branding';

beforeEach(() => {
	vi.resetModules();
	localStorage.clear();
});

vi.mock('i18next', () => ({
	default: { changeLanguage: vi.fn() },
}));

vi.mock('@/config/config', () => ({
	config: {
		i18n: { locale: 'en', direction: 'ltr' },
		allowedLocales: ['en', 'ar'],
	},
}));

async function importStore() {
	const { useLocaleStore } = await import('./useLocaleStore');
	return useLocaleStore;
}

describe('useLocaleStore', () => {
	it('setLocale updates locale and direction', async () => {
		const useLocaleStore = await importStore();
		act(() => useLocaleStore.getState().setLocale(Locale.Ar));
		const state = useLocaleStore.getState();
		expect(state.locale).toBe(Locale.Ar);
		expect(state.direction).toBe('rtl');
	});

	it('setLocale updates document direction', async () => {
		const useLocaleStore = await importStore();
		act(() => useLocaleStore.getState().setLocale(Locale.Ar));
		expect(document.documentElement.dir).toBe('rtl');
	});

	it('switches from rtl Arabic to ltr Simplified Chinese', async () => {
		const useLocaleStore = await importStore();
		act(() => useLocaleStore.getState().setLocale(Locale.Ar));
		expect(useLocaleStore.getState().direction).toBe('rtl');
		expect(document.documentElement.lang).toBe(Locale.Ar);
		expect(document.documentElement.dir).toBe('rtl');

		act(() => useLocaleStore.getState().setLocale(Locale.ZhCn));
		const state = useLocaleStore.getState();
		expect(state.locale).toBe(Locale.ZhCn);
		expect(state.direction).toBe('ltr');
		expect(document.documentElement.lang).toBe(Locale.ZhCn);
		expect(document.documentElement.dir).toBe('ltr');
	});

	it('persists a Simplified Chinese selection', async () => {
		const useLocaleStore = await importStore();
		act(() => useLocaleStore.getState().setLocale(Locale.ZhCn));
		const persisted = JSON.parse(localStorage.getItem('flexprice_locale') ?? '{}');
		expect(persisted.state.locale).toBe(Locale.ZhCn);
	});

	it('restores a persisted Simplified Chinese selection', async () => {
		localStorage.setItem('flexprice_locale', JSON.stringify({ state: { locale: Locale.ZhCn }, version: 0 }));
		const useLocaleStore = await importStore();
		const state = useLocaleStore.getState();
		expect(state.locale).toBe(Locale.ZhCn);
		expect(state.direction).toBe('ltr');
	});
});
