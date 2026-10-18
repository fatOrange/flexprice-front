/**
 * Pre-flight checks for the WeChat Pay connection form.
 *
 * These mirror the backend's rules for the values a pasted credential can plausibly get
 * wrong — they are UX guards, not proof that the merchant account accepts them. The
 * backend re-validates notify_url when saving and checks the PEM and key formats when
 * the connection is first used.
 *
 * Each check returns `'required'` for a blank value (callers drop that on edit,
 * where blank means "keep the saved value"), `'invalid'` for a malformed value,
 * or `null` when the value passes.
 */

export type WechatPayFieldValidation = 'required' | 'invalid' | null;

// The backreference forces BEGIN and END to be the same form: PKCS#8 ("PRIVATE KEY") or
// PKCS#1 ("RSA PRIVATE KEY"), never a mix of the two.
const PRIVATE_KEY_PEM_PATTERN = /^-----BEGIN (RSA )?PRIVATE KEY-----[\s\S]+-----END \1PRIVATE KEY-----$/;
const PUBLIC_KEY_PEM_PATTERN = /^-----BEGIN PUBLIC KEY-----[\s\S]+-----END PUBLIC KEY-----$/;

const API_V3_KEY_BYTE_LENGTH = 32;

export const validateMerchantPrivateKey = (value: string): WechatPayFieldValidation => {
	const trimmed = value.trim();
	if (!trimmed) return 'required';
	// PKCS#8 ("PRIVATE KEY") and PKCS#1 ("RSA PRIVATE KEY") PEMs are both accepted by the
	// backend; encrypted keys ("ENCRYPTED PRIVATE KEY") are not.
	return PRIVATE_KEY_PEM_PATTERN.test(trimmed) ? null : 'invalid';
};

export const validatePlatformPublicKey = (value: string): WechatPayFieldValidation => {
	const trimmed = value.trim();
	if (!trimmed) return 'required';
	return PUBLIC_KEY_PEM_PATTERN.test(trimmed) ? null : 'invalid';
};

export const validateApiV3Key = (value: string): WechatPayFieldValidation => {
	const trimmed = value.trim();
	if (!trimmed) return 'required';
	return new TextEncoder().encode(trimmed).length === API_V3_KEY_BYTE_LENGTH ? null : 'invalid';
};

const isPrivateIPv4 = (hostname: string): boolean => {
	const octets = hostname.split('.').map((part) => (/^\d{1,3}$/.test(part) ? Number(part) : NaN));
	if (octets.length !== 4 || octets.some((octet) => Number.isNaN(octet) || octet > 255)) return false;
	const [a, b] = octets;
	return (
		a === 0 ||
		a === 10 ||
		a === 127 ||
		(a === 169 && b === 254) ||
		(a === 172 && b >= 16 && b <= 31) ||
		(a === 192 && b === 168) ||
		a >= 224
	);
};

const isPrivateIPv6 = (hostname: string): boolean => {
	const host = hostname.replace(/^\[|\]$/g, '').toLowerCase();
	if (!host.includes(':')) return false;
	if (host === '::1' || host === '::') return true;
	// IPv4-mapped addresses serialize as ::ffff:<hex16>:<hex16>; classify the decoded IPv4
	// tail so mapped private/loopback forms are caught (public mapped addresses stay public).
	const mapped = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(host);
	if (mapped) {
		const high = parseInt(mapped[1], 16);
		const low = parseInt(mapped[2], 16);
		return isPrivateIPv4(`${high >> 8}.${high & 0xff}.${low >> 8}.${low & 0xff}`);
	}
	return /^f[cd][0-9a-f]{2}:/i.test(host) || /^fe[89ab][0-9a-f]:/i.test(host);
};

const isPublicNotifyHost = (hostname: string): boolean => {
	const host = hostname.toLowerCase();
	if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) return false;
	return !isPrivateIPv4(host) && !isPrivateIPv6(host);
};

export const validateNotifyUrl = (value: string): WechatPayFieldValidation => {
	const raw = value.trim();
	if (!raw) return 'required';
	if (/\s/.test(raw)) return 'invalid';

	let parsed: URL;
	try {
		parsed = new URL(raw);
	} catch {
		return 'invalid';
	}

	if (parsed.protocol !== 'https:') return 'invalid';
	if (parsed.username || parsed.password) return 'invalid';
	if (parsed.search || parsed.hash) return 'invalid';
	if (!isPublicNotifyHost(parsed.hostname)) return 'invalid';
	// The path is the prefix the backend appends the tenant and environment segments to.
	if (parsed.pathname === '' || parsed.pathname === '/') return 'invalid';

	return null;
};
