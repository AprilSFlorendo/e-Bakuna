<script lang="ts">
	import '../app.postcss';
	import {
		AppBar,
		Avatar,
		Drawer,
		Toast,
		LightSwitch,
		storePopup,
		getDrawerStore,
		initializeStores
	} from '@skeletonlabs/skeleton';

	import { fade, fly, slide } from 'svelte/transition';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	import Navigation from '$lib/components/Navigation.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { quadInOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { user } from '$lib/store';
	import { parseUser } from '$lib/utils/user-helpers';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerSettings: DrawerSettings = {
		width: 'w-[250px]',
		rounded: 'rounded-l'
	};

	const drawer = getDrawerStore();

	function drawerOpen(): void {
		drawer.open(drawerSettings);
	}

	let sideBarOpen = true,
		innerWidth = 768;

	$: if (innerWidth < 768) {
		sideBarOpen = false;
	}

	$: isLogin = $page.url.pathname === '/login';

	let image = '',
		initials = '';

	$: {
		const current = $user;

		if (current !== null) {
			const parsed = parseUser(current);
			image = parsed.image;
			initials = parsed.initials;
		}
	}
</script>

<svelte:window bind:innerWidth />
<Toast />
<Drawer>
	<div class="px-4 pt-4 flex items-center">
		<img class="m-2 w-8 h-8" src="/favicon.png" alt="logo" />
		<strong class="text-xl">e-Bakuna</strong>
	</div>
	<Navigation />
</Drawer>

<div class="flex h-full">
	{#if sideBarOpen && !isLogin}
		<aside
			transition:slide={{ duration: 200, axis: 'x', easing: quadInOut }}
			class="sidebar w-[250px] bg-surface-500/10"
		>
			<div
				transition:fly={{ x: -150 }}
				class="scroll-smooth overflow-hidden overflow-y-auto h-full"
			>
				<div class="px-4 py-2 flex items-center">
					<img class="m-2 w-8 h-8" src="/favicon.png" alt="logo" />
					<strong class="text-xl">e-Bakuna</strong>
				</div>
				<div>
					<Navigation />
				</div>
			</div>
		</aside>
	{/if}
	<div class="flex-1 flex flex-col h-full scroll-smooth overflow-auto">
		<div class="sticky top-0 w-full">
			<AppBar>
				<svelte:fragment slot="lead">
					{#if !isLogin}
						<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
							<span>
								<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
									<rect width="100" height="10" />
									<rect y="30" width="100" height="10" />
									<rect y="60" width="100" height="10" />
								</svg>
							</span>
						</button>
						<button
							class="hidden md:block btn btn-sm mr-4"
							on:click={() => (sideBarOpen = !sideBarOpen)}
						>
							<span>
								<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
									<rect width="100" height="10" />
									<rect y="30" width="100" height="10" />
									<rect y="60" width="100" height="10" />
								</svg>
							</span>
						</button>
					{/if}
					{#if !sideBarOpen || isLogin}
						<div
							in:fly={{ x: -150, duration: 300 }}
							out:fade={{ duration: 300 }}
							class="flex items-center"
						>
							<img class="mr-2 w-8 h-8" src="/favicon.png" alt="logo" />
							<strong class="text-xl">e-Bakuna</strong>
						</div>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="trail">
					{#if !isLogin}
						<Avatar src={image} {initials} width="w-8" />
					{/if}
					<LightSwitch />
				</svelte:fragment>
			</AppBar>
		</div>
		<main class="flex-1">
			<slot />
		</main>
	</div>
</div>
