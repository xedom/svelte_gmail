<script>
	import DotsGrid from 'svelte-material-icons/DotsGrid.svelte';
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import ChevronDown from 'svelte-material-icons/ChevronDown.svelte';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import HelpCircleOutline from 'svelte-material-icons/HelpCircleOutline.svelte';
	import Cog from 'svelte-material-icons/Cog.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import Tune from 'svelte-material-icons/Tune.svelte';

	import IconButton from '$lib/components/IconButton.svelte';
</script>

<header class="z-20 flex items-center p-2 font-semibold text-gray-700">
	<div class="mr-[148px] flex items-center pl-1">
		<IconButton><Menu class="h-6 w-6" /></IconButton>
		<div class="px-8 font-bold">Gmail</div>
	</div>

	<div class="flex flex-1 items-center">
		<div class="mr-8 flex flex-1 overflow-hidden rounded-full bg-slate-200">
			<IconButton><Magnify class="h-6 w-6" /></IconButton>
			<input class="h-[46px] flex-1 bg-transparent outline-none" type="text" placeholder="Cerca nella Posta" />
			<IconButton><Close class="h-6 w-6" /></IconButton>
			<IconButton><Tune class="h-6 w-6" /></IconButton>
		</div>
		<div class="flex">
			<button class="mr-3 flex h-[48px] items-center gap-2 rounded-full bg-slate-200 px-2 py-4">
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

		<button class="flex h-[46px] items-center gap-2 rounded-md border-2 border-solid border-gray-300 bg-white p-1">
			<span>Pingo Corp</span>
			<img class="square m-1 h-8 w-8 rounded-full object-cover" src="/profile.gif" alt="profile pic" />
		</button>
	</div>
</header>
