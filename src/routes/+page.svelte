<script>
	console.log('hey');
	import Reload from 'svelte-material-icons/Reload.svelte';
	import MenuDown from 'svelte-material-icons/MenuDown.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import DotsVertical from 'svelte-material-icons/DotsVertical.svelte';
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import PackageDown from 'svelte-material-icons/PackageDown.svelte';
	import TrashCan from 'svelte-material-icons/TrashCanOutline.svelte';
	import AlertOctagram from 'svelte-material-icons/AlertOctagramOutline.svelte';
	import Email from 'svelte-material-icons/EmailOutline.svelte';
	import Clock from 'svelte-material-icons/ClockOutline.svelte';

	let selected = true;
</script>

<div class="flex items-stretch py-1">
	<div class="flex items-center">
		<input type="checkbox" bind:checked={selected} />
		<MenuDown />
	</div>
	<div class="flex flex-1 items-center">
		{#if selected}
			<IconButton><PackageDown /></IconButton>
			<IconButton><AlertOctagram /></IconButton>
			<IconButton><TrashCan /></IconButton>
			|
			<IconButton><Email /></IconButton>
			<IconButton><Clock /></IconButton>
		{:else}
			<IconButton><Reload /></IconButton>
		{/if}
		<IconButton><DotsVertical /></IconButton>
	</div>
	<div class="flex">
		<button class="rounded-md px-5 text-xs hover:bg-gray-300">1-6 di 6</button>
		<IconButton><ChevronLeft /></IconButton>
		<IconButton><ChevronRight /></IconButton>
	</div>
</div>

<h1>Welcome to SvelteKit 2</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
