<script lang="ts">
	import { quadInOut } from 'svelte/easing';
	import { fade, slide } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let open = false;

	let arrowClass = 'rotate';

	$: arrowClass = open ? 'rotate down' : 'rotate';
</script>

<div class="space-y-1">
	<button class="w-full" on:click={() => (open = !open)}>
		<div class="flex w-full space-x-1">
			<div class="flex-1 flex">
				<slot class="flex-none" name="header" />
			</div>
			<div></div>
			<div class="flex-none">
				<div class={arrowClass}>
					<Icon name="expand-more" width="1.5rem" height="1.5rem" />
				</div>
			</div>
		</div>
	</button>

	{#if open}
		<div transition:slide={{ duration: 150, axis: 'y', easing: quadInOut }}>
			<div class="space-y-1" transition:fade={{ duration: 250 }}>
				<slot name="items" />
			</div>
		</div>
	{/if}
</div>

<style>
	.rotate {
		-moz-transition: all 0.25s linear;
		-webkit-transition: all 0.25s linear;
		transition: all 0.25s linear;
	}
	.rotate.down {
		-moz-transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
	}
</style>
