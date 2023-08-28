<script>
	import { emailStore, handleSearch } from '$lib/store/emails';
	import { onDestroy } from 'svelte';

	import DotsGrid from 'svelte-material-icons/DotsGrid.svelte';
	import ChevronDown from 'svelte-material-icons/ChevronDown.svelte';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import HelpCircleOutline from 'svelte-material-icons/HelpCircleOutline.svelte';
	import Cog from 'svelte-material-icons/Cog.svelte';

	import IconButton from '$lib/components/IconButton.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function onCollapse() {
		dispatch('message', { type: 'collapse' });
	}

	const unsubcriveEmailStore = emailStore.subscribe(handleSearch);
	onDestroy(() => {
		unsubcriveEmailStore();
	});
</script>

<header class="z-20 flex items-center p-2 font-semibold text-gray-700">
	<div class="mr-[9.25rem] flex items-center pl-1">
		<IconButton on:click={onCollapse}><Menu class="h-6 w-6" /></IconButton>
		<div class="px-8 font-bold">Gmail</div>
	</div>

	<Searchbar bind:input={$emailStore.search} />

	<div class="flex flex-1 items-center justify-end">
		<div class="flex">
			<button class="mr-3 flex h-[3rem] items-center gap-2 rounded-full bg-slate-200 px-2 py-4">
				<span class="block h-3 w-3 rounded-full bg-green-600" />
				<span class="text-sm">Online</span>
				<ChevronDown class="h-4 w-4" />
			</button>
			<div class="flex items-center">
				<IconButton><HelpCircleOutline class="h-6 w-6" /></IconButton>
				<IconButton><Cog class="h-6 w-6" /></IconButton>
			</div>
		</div>
	</div>

	<div class="flex items-center justify-self-end">
		<button class="m-1 rounded-full p-2 hover:bg-gray-300"><DotsGrid class="h-6 w-6" /></button>
		<button
			class="flex h-[2.875rem] items-center gap-2 rounded-md border-2 border-solid border-gray-300 bg-white p-1"
		>
			<span>Pingu Corp</span>
			<img class="square m-1 h-8 w-8 rounded-full object-cover" src="/profile.gif" alt="profile pic" />
		</button>
	</div>
</header>
