<script lang="ts">
	import { clearOnClick, focusOnClick } from '$lib/utils/input-helpers';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Icon from './Icon.svelte';
	import type { EventHandler } from 'svelte/elements';

	export let disabled = false;
	export let disableNextPopup = false;
	export let alignLeft = true;
	export let inputValue = '';
	export let onNext: EventHandler<SubmitEvent, HTMLFormElement>;

	let id = crypto.randomUUID();

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};
</script>

<button
	{disabled}
	use:focusOnClick={id}
	use:clearOnClick={id}
	use:popup={popupClick}
	on:click={() => (inputValue = '')}
>
	<Icon name="more-horiz" />
</button>

<div class="card" data-popup="popupClick">
	<form on:submit|preventDefault={onNext}>
		<div class="input-group grid-cols-[1fr_auto]">
			{#if alignLeft}
				<button class="pop-up-btn" tabindex="-1" type="submit" disabled={disableNextPopup}>
					<Icon name="arrow-left" />
				</button>
				<input {id} bind:value={inputValue} class="input small left" type="number" />
			{:else}
				<input {id} bind:value={inputValue} class="input small right" type="number" />
				<button class="pop-up-btn" tabindex="-1" type="submit" disabled={disableNextPopup}>
					<Icon name="arrow-right" />
				</button>
			{/if}
		</div>
	</form>
</div>

<style>
	button {
		padding-block: 5px !important;
		padding-inline: 10px !important;
	}
	.input.small {
		width: 50px;
	}

	.input.small.left {
		padding-left: 0 !important;
	}

	.input.small.right {
		padding-right: 0 !important;
	}

	.pop-up-btn:disabled {
		cursor: not-allowed !important;
		opacity: 0.5 !important;
	}

	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button,
	input[type='number'] {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
