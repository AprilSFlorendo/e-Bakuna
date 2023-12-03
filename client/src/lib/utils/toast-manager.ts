import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

export function showToast(type: ToastType, store: ToastStore, message: string) {
	const t: ToastSettings = {
		message: message,
		background: toastTypeToBg[type]
	};

	store.trigger(t);
}

export enum ToastType {
	Success = 'success',
	Error = 'error',
	Warning = 'warning',
	Info = 'info'
}

const toastTypeToBg: Record<ToastType, string> = {
	[ToastType.Success]: 'variant-filled-success',
	[ToastType.Error]: 'variant-filled-error',
	[ToastType.Warning]: 'variant-filled-warning',
	[ToastType.Info]: 'variant-filled-info'
};
