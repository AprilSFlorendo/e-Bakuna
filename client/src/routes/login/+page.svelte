<script>
	import { goto } from '$app/navigation';
	import { ProgressRadial, getToastStore, focusTrap } from '@skeletonlabs/skeleton';
	import { validation, onSubmit, resetValidationOnInput } from '$lib/utils/input-helpers';
	import { login } from './service';
	import { token, user } from '$lib/store';
	import { ToastType, showToast } from '$lib/utils/toast-manager';
	import { page } from '$app/stores';
	import PasswordInput from '$lib/components/PasswordInput.svelte';

	const toastStore = getToastStore();

	let username = '';
	let password = '';

	let isFocused = true;
	let submitting = false;

	async function handleSubmit() {
		submitting = true;
		const res = await login(username, password);

		if (res.status === 200) {
			document.cookie = `token=${res.body.token}; path=/; expires=${new Date(
				new Date().getTime() + 1000 * 60 * 60 * 24 * 7
			).toUTCString()}`;

			localStorage.setItem('user', JSON.stringify(res.body.user));
			localStorage.setItem('userImage', JSON.stringify(res.body.user.image));

			token.set(res.body.token);
			user.set(JSON.stringify(res.body.user));

			var redirectUrl = $page.url.searchParams.get('redirectUrl');

			await goto(redirectUrl ? `/${redirectUrl}` : '/');
		} else {
			console.log(res);
			showToast(ToastType.Error, toastStore, res.error);
		}
		submitting = false;
	}
</script>

<main class="flex justify-center py-8 px-2">
	<form
		on:submit|preventDefault={handleSubmit}
		use:focusTrap={isFocused}
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
				bind:value={username}
				use:validation={['', '']}
				use:resetValidationOnInput
			/>
			<div class="error-text"></div>
		</div>

		<div class="label mb-2">
			<span class="label-text">Password</span>
			<PasswordInput id="password" name="password" required bind:value={password} />
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
