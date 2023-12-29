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

<div class="base-container">
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

	.main-body {
		@apply flex-1 scroll-smooth overflow-auto;
	}

	.app-bar-container {
		@apply sticky top-0;
	}
</style>
