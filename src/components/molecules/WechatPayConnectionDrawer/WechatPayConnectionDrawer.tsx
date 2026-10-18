import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Button, Input, Label, Sheet, Spacer, Textarea } from '@/components/atoms';
import ConnectionApi from '@/api/ConnectionApi';
import { CONNECTION_PROVIDER_TYPE, Connection } from '@/models';
import { CreateConnectionPayload, UpdateConnectionPayload, WechatPayConnectionMetadata } from '@/types/dto';
import {
	validateApiV3Key,
	validateMerchantPrivateKey,
	validateNotifyUrl,
	validatePlatformPublicKey,
	WechatPayFieldValidation,
} from './wechatPayValidation';

interface WechatPayConnectionDrawerProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	connection?: Connection;
	onSave: (connection: Connection) => void;
}

interface WechatPayFormData {
	name: string;
	appid: string;
	mchid: string;
	merchant_certificate_serial_number: string;
	merchant_private_key: string;
	api_v3_key: string;
	platform_public_key: string;
	platform_public_key_id: string;
	notify_url: string;
}

type WechatPayFormField = keyof WechatPayFormData;
type WechatPaySecretField = Exclude<WechatPayFormField, 'name'>;

type WechatPayFormErrors = Partial<Record<WechatPayFormField, string>>;

const WECHAT_PAY_PROVIDER = 'WeChat Pay';

const EMPTY_FORM: WechatPayFormData = {
	name: '',
	appid: '',
	mchid: '',
	merchant_certificate_serial_number: '',
	merchant_private_key: '',
	api_v3_key: '',
	platform_public_key: '',
	platform_public_key_id: '',
	notify_url: '',
};

// Wire keys of encrypted_secret_data. The backend merges updates field by field and treats
// blanks as "keep the stored value", so only filled fields are ever sent.
const SECRET_FIELDS = [
	'appid',
	'mchid',
	'merchant_certificate_serial_number',
	'merchant_private_key',
	'api_v3_key',
	'platform_public_key',
	'platform_public_key_id',
	'notify_url',
] as const satisfies readonly WechatPaySecretField[];

const requiredWhenBlank = (value: string): WechatPayFieldValidation => (value.trim() ? null : 'required');

const FIELD_CHECKS: ReadonlyArray<{
	field: WechatPaySecretField;
	validate: (value: string) => WechatPayFieldValidation;
	requiredKey: string;
	invalidKey?: string;
}> = [
	{ field: 'appid', validate: requiredWhenBlank, requiredKey: 'connection.wechatpay.appIdRequired' },
	{ field: 'mchid', validate: requiredWhenBlank, requiredKey: 'connection.wechatpay.merchantIdRequired' },
	{
		field: 'merchant_certificate_serial_number',
		validate: requiredWhenBlank,
		requiredKey: 'connection.wechatpay.certificateSerialNumberRequired',
	},
	{
		field: 'merchant_private_key',
		validate: validateMerchantPrivateKey,
		requiredKey: 'connection.wechatpay.merchantPrivateKeyRequired',
		invalidKey: 'connection.wechatpay.merchantPrivateKeyInvalid',
	},
	{
		field: 'api_v3_key',
		validate: validateApiV3Key,
		requiredKey: 'connection.wechatpay.apiV3KeyRequired',
		invalidKey: 'connection.wechatpay.apiV3KeyInvalid',
	},
	{
		field: 'platform_public_key',
		validate: validatePlatformPublicKey,
		requiredKey: 'connection.wechatpay.platformPublicKeyRequired',
		invalidKey: 'connection.wechatpay.platformPublicKeyInvalid',
	},
	{
		field: 'platform_public_key_id',
		validate: requiredWhenBlank,
		requiredKey: 'connection.wechatpay.platformPublicKeyIdRequired',
	},
	{
		field: 'notify_url',
		validate: validateNotifyUrl,
		requiredKey: 'connection.wechatpay.notifyUrlRequired',
		invalidKey: 'connection.wechatpay.notifyUrlInvalid',
	},
];

interface WechatPayFormProps {
	isOpen: boolean;
	connection?: Connection;
	onOpenChange: (open: boolean) => void;
	onSave: (connection: Connection) => void;
}

// Mounts the form only while open, so each open starts from fresh state and closing drops
// anything entered; `key` remounts it when the edited connection changes.
const WechatPayConnectionDrawer: FC<WechatPayConnectionDrawerProps> = ({ isOpen, connection, onOpenChange, onSave }) => {
	if (!isOpen) return null;
	return (
		<WechatPayConnectionForm
			key={connection?.id ?? 'create'}
			isOpen={isOpen}
			connection={connection}
			onOpenChange={onOpenChange}
			onSave={onSave}
		/>
	);
};

const WechatPayConnectionForm: FC<WechatPayFormProps> = ({ isOpen, connection, onOpenChange, onSave }) => {
	const { t } = useTranslation('settings');
	const { t: tc } = useTranslation('common');
	const [formData, setFormData] = useState<WechatPayFormData>(() => (connection ? { ...EMPTY_FORM, name: connection.name } : EMPTY_FORM));
	const [errors, setErrors] = useState<WechatPayFormErrors>({});
	const isEditMode = !!connection;

	const {
		mutate: createConnection,
		isPending: isCreating,
		reset: resetCreate,
	} = useMutation({
		mutationFn: async () => {
			const payload: CreateConnectionPayload = {
				name: formData.name.trim(),
				provider_type: CONNECTION_PROVIDER_TYPE.WECHATPAY,
				encrypted_secret_data: {
					provider_type: CONNECTION_PROVIDER_TYPE.WECHATPAY,
					appid: formData.appid.trim(),
					mchid: formData.mchid.trim(),
					merchant_certificate_serial_number: formData.merchant_certificate_serial_number.trim(),
					merchant_private_key: formData.merchant_private_key.trim(),
					api_v3_key: formData.api_v3_key.trim(),
					platform_public_key: formData.platform_public_key.trim(),
					platform_public_key_id: formData.platform_public_key_id.trim(),
					notify_url: formData.notify_url.trim(),
				},
			};
			return await ConnectionApi.Create(payload);
		},
		onSuccess: (response) => {
			// Clear the mutation state that captured the submitted credentials before closing.
			resetCreate();
			toast.success(t('connection.toast.created', { provider: WECHAT_PAY_PROVIDER }));
			onSave(response);
			onOpenChange(false);
		},
		// The API error message is not surfaced: rejected credential payloads can be echoed
		// back inside it. The drawer stays open so the value can be corrected and retried.
		onError: () => {
			toast.error(t('connection.toast.failedToCreate'));
		},
	});

	const {
		mutate: updateConnection,
		isPending: isUpdating,
		reset: resetUpdate,
	} = useMutation({
		mutationFn: async () => {
			const payload: UpdateConnectionPayload = { name: formData.name.trim() };
			const secretPatch: Partial<WechatPayConnectionMetadata> = {};
			for (const field of SECRET_FIELDS) {
				const value = formData[field].trim();
				if (value) secretPatch[field] = value;
			}
			if (Object.keys(secretPatch).length > 0) {
				payload.encrypted_secret_data = { provider_type: CONNECTION_PROVIDER_TYPE.WECHATPAY, ...secretPatch };
			}
			// handleSave calls this mutation only in edit mode, so connection is defined here.
			return await ConnectionApi.Update(connection!.id, payload);
		},
		onSuccess: (response) => {
			// Clear the mutation state that captured the submitted credentials before closing.
			resetUpdate();
			toast.success(t('connection.toast.updated', { provider: WECHAT_PAY_PROVIDER }));
			onSave(response);
			onOpenChange(false);
		},
		// Same rationale as create: keep the raw API message out of the UI.
		onError: () => {
			toast.error(t('connection.toast.failedToUpdate'));
		},
	});

	const isPending = isCreating || isUpdating;

	const handleChange = (field: WechatPayFormField, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	const validateForm = (): WechatPayFormErrors => {
		const next: WechatPayFormErrors = {};
		if (!formData.name.trim()) next.name = t('connection.validation.nameRequired');

		for (const { field, validate, requiredKey, invalidKey } of FIELD_CHECKS) {
			const code = validate(formData[field]);
			if (code === 'invalid') {
				if (invalidKey) next[field] = t(invalidKey);
				continue;
			}
			// Blank fields are only an error on create; on edit they keep the saved value.
			if (code === 'required' && !isEditMode) next[field] = t(requiredKey);
		}
		return next;
	};

	const handleSave = () => {
		const nextErrors = validateForm();
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		if (isEditMode) {
			updateConnection();
		} else {
			createConnection();
		}
	};

	const handleOpenChange = (open: boolean) => {
		// Keep the drawer open while a save is in flight so a retry doesn't lose the form.
		if (!open && isPending) return;
		if (!open) {
			// Drop anything entered — and the mutation state that captured it — before closing.
			resetCreate();
			resetUpdate();
			setFormData(EMPTY_FORM);
			setErrors({});
		}
		onOpenChange(open);
	};

	return (
		<Sheet
			isOpen={isOpen}
			onOpenChange={handleOpenChange}
			title={
				isEditMode
					? t('integrationDrawer.title.edit', { providerName: WECHAT_PAY_PROVIDER })
					: t('integrationDrawer.title.connect', { providerName: WECHAT_PAY_PROVIDER })
			}
			description={t('connection.wechatpay.description')}
			size='lg'>
			<div className='space-y-6 mt-6'>
				<Input
					id='wechatpay-name'
					label={t('integrationDrawer.connectionName')}
					englishOnly={false}
					placeholder={t('connection.wechatpay.connectionPlaceholder')}
					value={formData.name}
					onChange={(value) => handleChange('name', value)}
					error={errors.name}
					description={t('connection.wechatpay.connectionHint')}
				/>

				{isEditMode && (
					<div className='bg-info-muted border border-info-line rounded-lg p-4'>
						<h4 className='font-medium text-info-deepest mb-2'>{t('connection.wechatpay.editNoticeTitle')}</h4>
						<p className='text-sm text-info-deep'>{t('connection.wechatpay.editNoticeBody')}</p>
					</div>
				)}

				<Input
					id='wechatpay-appid'
					label={t('connection.wechatpay.appId')}
					placeholder={t('connection.wechatpay.appIdPlaceholder')}
					value={formData.appid}
					onChange={(value) => handleChange('appid', value)}
					error={errors.appid}
					description={t('connection.wechatpay.appIdHint')}
				/>

				<Input
					id='wechatpay-mchid'
					label={t('connection.wechatpay.merchantId')}
					placeholder={t('connection.wechatpay.merchantIdPlaceholder')}
					value={formData.mchid}
					onChange={(value) => handleChange('mchid', value)}
					error={errors.mchid}
					description={t('connection.wechatpay.merchantIdHint')}
				/>

				<Input
					id='wechatpay-certificate-serial-number'
					label={t('connection.wechatpay.certificateSerialNumber')}
					placeholder={t('connection.wechatpay.certificateSerialNumberPlaceholder')}
					value={formData.merchant_certificate_serial_number}
					onChange={(value) => handleChange('merchant_certificate_serial_number', value)}
					error={errors.merchant_certificate_serial_number}
					description={t('connection.wechatpay.certificateSerialNumberHint')}
				/>

				<div className='space-y-1 w-full flex flex-col'>
					{/* Textarea does not wire its own label to the control, so pair the shared Label
					    atom with the id to keep a real accessible name for this field. */}
					<Label htmlFor='wechatpay-merchant-private-key' label={t('connection.wechatpay.merchantPrivateKey')} />
					<Textarea
						id='wechatpay-merchant-private-key'
						placeholder={t(
							isEditMode ? 'connection.wechatpay.merchantPrivateKeyPlaceholderEdit' : 'connection.wechatpay.merchantPrivateKeyPlaceholder',
						)}
						value={formData.merchant_private_key}
						onChange={(value) => handleChange('merchant_private_key', value)}
						error={errors.merchant_private_key}
						description={t('connection.wechatpay.merchantPrivateKeyHint')}
						textAreaClassName='font-fira-code text-xs min-h-[8rem]'
					/>
				</div>

				<Input
					id='wechatpay-api-v3-key'
					type='password'
					label={t('connection.wechatpay.apiV3Key')}
					englishOnly={false}
					placeholder={t(isEditMode ? 'connection.wechatpay.apiV3KeyPlaceholderEdit' : 'connection.wechatpay.apiV3KeyPlaceholder')}
					value={formData.api_v3_key}
					onChange={(value) => handleChange('api_v3_key', value)}
					error={errors.api_v3_key}
					description={t('connection.wechatpay.apiV3KeyHint')}
				/>

				<div className='space-y-1 w-full flex flex-col'>
					{/* Same Textarea label-association gap as the merchant private key field. */}
					<Label htmlFor='wechatpay-platform-public-key' label={t('connection.wechatpay.platformPublicKey')} />
					<Textarea
						id='wechatpay-platform-public-key'
						placeholder={t('connection.wechatpay.platformPublicKeyPlaceholder')}
						value={formData.platform_public_key}
						onChange={(value) => handleChange('platform_public_key', value)}
						error={errors.platform_public_key}
						description={t('connection.wechatpay.platformPublicKeyHint')}
						textAreaClassName='font-fira-code text-xs min-h-[8rem]'
					/>
				</div>

				<Input
					id='wechatpay-platform-public-key-id'
					label={t('connection.wechatpay.platformPublicKeyId')}
					placeholder={t('connection.wechatpay.platformPublicKeyIdPlaceholder')}
					value={formData.platform_public_key_id}
					onChange={(value) => handleChange('platform_public_key_id', value)}
					error={errors.platform_public_key_id}
					description={t('connection.wechatpay.platformPublicKeyIdHint')}
				/>

				<Input
					id='wechatpay-notify-url'
					label={t('connection.wechatpay.notifyUrl')}
					placeholder={t('connection.wechatpay.notifyUrlPlaceholder')}
					value={formData.notify_url}
					onChange={(value) => handleChange('notify_url', value)}
					error={errors.notify_url}
					description={t('connection.wechatpay.notifyUrlHint')}
				/>

				<Spacer className='!h-1' />
				<div className='flex gap-1'>
					<Button variant='outline' onClick={() => handleOpenChange(false)} className='flex-1' disabled={isPending}>
						{tc('actions.cancel')}
					</Button>
					<Button onClick={handleSave} className='flex-1' isLoading={isPending}>
						{isEditMode ? tc('actions.update') : tc('actions.save')}
					</Button>
				</div>
			</div>
		</Sheet>
	);
};

export default WechatPayConnectionDrawer;
