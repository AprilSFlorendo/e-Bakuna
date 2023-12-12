<script lang="ts">
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import Collapse from './Collapse.svelte';

	const drawer = getDrawerStore();

	$: activeClass = (href: string) => ($page.url.pathname === href ? 'bg-primary-500 selected' : '');
</script>

<nav class="list-nav p-4">
	<ul>
		<li>
			<a on:keypress on:click={drawer.close} href="/" class={activeClass('/')}> Home </a>
		</li>
		<li>
			<a on:keypress on:click={drawer.close} href="/livestocks" class={activeClass('/livestocks')}>
				Live Stocks
			</a>
		</li>
		<li>
			<a on:keypress on:click={drawer.close} href="/schedules" class={activeClass('/schedules')}>
				Schedules
			</a>
		</li>
	</ul>
</nav>

<style lang="postcss">
	.selected {
		color: var(--on-primary) !important;
	}
</style>
