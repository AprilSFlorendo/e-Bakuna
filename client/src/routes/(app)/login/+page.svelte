<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { ProgressRadial, getToastStore, focusTrap } from '@skeletonlabs/skeleton';
	import { validation, onSubmit, resetValidationOnInput } from '$lib/utils/input-helpers';
	import { user } from '$lib/store';
	import { ToastType, showToast } from '$lib/utils/toast-manager';
	import PasswordInput from '$lib/components/PasswordInput.svelte';

	const toastStore = getToastStore();

	export let form;

	let submitting = false;

	let redirectUrl = $page.url.searchParams.get('redirectUrl');
	let formAction = redirectUrl ? `/login?redirectUrl=${decodeURIComponent(redirectUrl)}` : '/login';
</script>

<main class="flex justify-center py-8 px-2">
	<form
		method="POST"
		action={formAction}
		use:focusTrap={true}
		use:enhance={() => {
			submitting = true;

			return async ({ result, update }) => {
				await update();

				if (result.type === 'success') {
					localStorage.setItem('user', JSON.stringify(result?.data?.user));

					user.set(JSON.stringify(result?.data?.user));

					if (redirectUrl) goto(redirectUrl, { replaceState: true });
					else goto('/');
				} else {
					//@ts-ignore
					showToast(ToastType.Error, toastStore, result?.data?.message ?? 'Login failed');
				}
				submitting = false;
			};
		}}
		class="flex flex-col card bg-initial m-4 p-8 w-80"
	>
		<h1 class="text-xl font-bold text-center mb-2">Welcome</h1>
		<div class="label mb-2">
			<span class="label-text">Username</span>
			<input
				required
				type="text"
				name="username"
				placeholder="username"
				class="input input-bordered"
				value={form?.username ?? ''}
				use:validation={['', '']}
				use:resetValidationOnInput
			/>
			<div class="error-text"></div>
		</div>

		<div class="label mb-2">
			<span class="label-text">Password</span>
			<PasswordInput id="password" name="password" required value={form?.password ?? ''} />
		</div>
		<button disabled={submitting} class="btn variant-filled-primary my-4" on:click={onSubmit}>
			{#if submitting}
				<ProgressRadial
					class="w-5"
					stroke={60}
					meter="stroke-primary-50"
					track="stroke-primary-100/30"
					strokeLinecap="round"
				/>
			{:else}
				<span class="btn-text">Login</span>
			{/if}
		</button>
	</form>
</main>

<style>
	.btn-text {
		color: var(--on-primary);
		font-size: 1rem;
	}
</style>
