<script lang="ts">
	import '../../app.postcss';
	import '$lib/models/user.extensions';
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

	import AppLogo from '$lib/components/AppLogo.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import { quadInOut } from 'svelte/easing';
	import { user, navOpen } from '$lib/store';
	import { page } from '$app/stores';
	import type { User } from '$lib/models/user';
	import { tooltip } from '$lib/utils/tooltip';

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

	let innerWidth = 0,
		currentUser: User | null = null;

	$: showLabel = innerWidth > 425;
	$: sideBarOpen = innerWidth > 768 && $navOpen;
	$: isLogin = $page.url.pathname === '/login';

	$: {
		const current = $user;

		if (current) {
			currentUser = current.toUser();
		}
	}
</script>

<svelte:window bind:innerWidth />
<Toast />
<Drawer>
	<div class="px-4 pt-4">
		<AppLogo />
	</div>
	<Navigation />
</Drawer>

<div class="base-container">
	{#if sideBarOpen && !isLogin}
		<aside transition:slide={{ duration: 200, axis: 'x', easing: quadInOut }}>
			<div transition:fly={{ x: -150 }} class="side-container">
				<div class="p-4">
					<AppLogo />
				</div>
				<Navigation />
			</div>
		</aside>
	{/if}
	<div class="main-body">
		<div class="app-bar-container">
			<AppBar>
				<svelte:fragment slot="lead">
					{#if !isLogin}
						<button class="md:hidden btn btn-sm mr-1" on:click={drawerOpen}>
							<Icon name="home" width="1.1rem" height="1.1rem" />
						</button>
						<button
							class="hidden md:block btn btn-sm mr-1"
							on:click={() => {
								sideBarOpen = !sideBarOpen;
								$navOpen = sideBarOpen;
								localStorage.setItem('navOpen', sideBarOpen.toString());
							}}
						>
							<Icon name="home" width="1.1rem" height="1.1rem" />
						</button>
					{/if}
					{#if !sideBarOpen || isLogin}
						<div in:fly={{ x: -150, duration: 300 }} out:fade={{ duration: 300 }}>
							<AppLogo {showLabel} />
						</div>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="trail">
					{#if !isLogin}
						<Avatar src={currentUser?.avatar} initials={currentUser?.initials} width="w-8" />
					{/if}
					<div use:tooltip={'Toggle theme'}>
						<LightSwitch title="" />
					</div>
				</svelte:fragment>
			</AppBar>
		</div>
		<main>
			<slot />
		</main>
	</div>
</div>

<style lang="postcss">
	.base-container {
		@apply flex h-full;
	}

	aside {
		@apply flex-none w-[250px] bg-surface-500/10;
	}

	.side-container {
		@apply scroll-smooth overflow-hidden overflow-y-auto h-full;
	}

	.main-body {
		@apply flex-1 scroll-smooth overflow-auto;
	}

	.app-bar-container {
		@apply sticky top-0;
	}

	:global(.tippy-box[data-theme='current']) {
		border-radius: var(--theme-rounded-base);
		@apply text-white bg-gray-900;
	}
</style>
