<script>
	import Drag from 'svelte-material-icons/Drag.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	export let emails;
</script>

<div class="flex flex-col">
	{#each emails as email}
		<!-- <div class="flex items-center gap-2 bg-slate-300 px-4 py-2"> -->
		<div
			class="
			grid
			grid-cols-1
			items-center
			border-b-2
			border-gray-200
			bg-slate-100
			p-1
			transition
			duration-200
			ease-in-out
			hover:cursor-pointer
			hover:bg-blue-200
			lg:grid-cols-[20px_20px_48px_320px_minmax(300px,_2fr)_50px]
			"
		>
			<Drag />
			<input type="checkbox" />
			<IconButton><StarOutline class="h-6 w-6" /></IconButton>
			<div class="overflow-hidden">
				<span class="whitespace-nowrap">{email.object}</span>
			</div>
			<div class="flex overflow-hidden">
				<span class="whitespace-nowrap">{email.body.slice(0, 50)}...</span>
			</div>
			<div class="flex justify-center overflow-hidden">
				<span class="text-sm text-gray-600">{email.timestamp}</span>
			</div>
		</div>
	{/each}
</div>
