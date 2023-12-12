<script lang="ts">
	export let id = '';
	export let value = '';
	export let name = '';
	export let placeholder = 'password';
	export let required = false;
	export let error = '';

	import Icon from '$lib/components/Icon.svelte';
	import { resetValidationOnInput, validation } from '$lib/utils/input-helpers';

	let showPassword = false;
	$: type = showPassword ? 'text' : 'password';

	function onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
	}

	const passId = crypto.randomUUID();
</script>

<div class="input-group grid-cols-[1fr_auto]">
	<input
		{id}
		{type}
		{name}
		{value}
		{placeholder}
		{required}
		class="input input-bordered"
		on:input={onInput}
		use:validation={[passId, error]}
		use:resetValidationOnInput
	/>
	<button tabindex="-1" type="button" on:click={() => (showPassword = !showPassword)}>
		{#if showPassword}
			<Icon name="eye-slash" width="1.1rem" height="1.1rem" />
		{:else}
			<Icon name="eye" width="1.1rem" height="1.1rem" />
		{/if}
	</button>
</div>
<div class="error-text" id={passId}></div>

<style>
	input::-ms-reveal,
	input::-ms-clear {
		display: none;
	}
</style>
