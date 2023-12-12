<script lang="ts">
	import { tooltip } from '$lib/utils/tooltip';
	import { roundArrow } from 'tippy.js';
	import Icon from './Icon.svelte';
	import PaginatorGoTo from './PaginatorGoTo.svelte';

	export let selectedPage = 1;
	export let pageCount = 150;
	export let togglePageCount = 3;
	export let disabled = false;

	let prevNumber = '';

	$: {
		const num = parseInt(prevNumber);
		if (isNaN(num)) {
			prevNumber = '';
		} else {
			const max = buttons.length > 0 ? buttons[0] - 1 : 1;
			if (num < 1) {
				prevNumber = '1';
			} else if (num > max) {
				prevNumber = max.toString();
			}
		}
	}

	let nextNumber = '';
	let minNextNumber = 0;

	$: {
		const num = parseInt(nextNumber);
		if (isNaN(num)) {
			nextNumber = '';
		} else {
			minNextNumber = buttons.length > 0 ? buttons[buttons.length - 1] + 1 : pageCount;
			if (num > pageCount) {
				nextNumber = pageCount.toString();
			}
		}
	}

	$: disableNextPopup = isNaN(parseInt(nextNumber)) || parseInt(nextNumber) < minNextNumber;

	let buttons: number[] = [];
	let startingPage = 1;

	$: {
		if (buttons.find((btn) => btn === selectedPage) === undefined) {
			const newButtons: number[] = [];

			const flor = selectedPage - togglePageCount;

			if (flor > 0) {
				startingPage = flor + 1;
			}

			if (selectedPage < startingPage) {
				startingPage = selectedPage;
			}

			for (let i = startingPage; i <= startingPage + togglePageCount - 1; i++) {
				newButtons.push(i);
			}

			buttons = newButtons;
		}
	}

	function gotoPage(page: number) {
		selectedPage = page;
	}
</script>

<div class="btn-group variant-outline-surface">
	<button
		disabled={disabled || selectedPage == 1}
		use:tooltip={'First'}
		on:click={() => (selectedPage = 1)}
	>
		<Icon name="arrow-left-double" />
	</button>
	<button
		use:tooltip={'Prev'}
		disabled={disabled || selectedPage == 1}
		on:click={() => (selectedPage = selectedPage - 1)}
	>
		<Icon name="arrow-left" width="1.5rem" height="1.5rem" />
	</button>

	{#if buttons.find((btn) => btn === 1) === undefined}
		<div use:tooltip={'Back to'}>
			<PaginatorGoTo
				{disabled}
				bind:inputValue={prevNumber}
				onNext={() => {
					const num = parseInt(prevNumber);
					if (!isNaN(num)) gotoPage(num);
				}}
				disableNextPopup={isNaN(parseInt(prevNumber))}
			/>
		</div>
	{/if}

	{#each buttons as btn}
		<button
			{disabled}
			class={selectedPage == btn ? 'active selected' : ''}
			use:tooltip={`Page ${btn} of ${pageCount}`}
			on:click={() => gotoPage(btn)}
		>
			{btn}
		</button>
	{/each}

	{#if buttons.find((btn) => btn === pageCount) === undefined}
		<div use:tooltip={'Go to'}>
			<PaginatorGoTo
				{disabled}
				alignLeft={false}
				bind:inputValue={nextNumber}
				onNext={() => {
					const num = parseInt(nextNumber);
					if (!isNaN(num)) gotoPage(num);
				}}
				{disableNextPopup}
			/>
		</div>
	{/if}

	<button
		use:tooltip={'Next'}
		disabled={disabled || selectedPage == pageCount}
		on:click={() => (selectedPage = selectedPage + 1)}
	>
		<Icon name="arrow-right" />
	</button>
	<button
		use:tooltip={'Last'}
		disabled={disabled || selectedPage == pageCount}
		on:click={() => (selectedPage = pageCount)}
	>
		<Icon name="arrow-right-double" />
	</button>
</div>

<style>
	button {
		padding-block: 5px !important;
		padding-inline: 10px !important;
	}

	.active {
		--tw-bg-opacity: 1;
		background-color: rgb(var(--color-primary-500) / var(--tw-bg-opacity)) !important;
	}

	.selected {
		color: var(--on-primary) !important;
	}
</style>
