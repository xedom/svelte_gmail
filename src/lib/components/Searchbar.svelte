<script>
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import Tune from 'svelte-material-icons/Tune.svelte';

	import IconButton from '$lib/components/IconButton.svelte';

	let inputValue = '';
</script>

<div class="mr-8 flex flex-1 overflow-hidden rounded-full bg-slate-200">
	<IconButton><Magnify class="h-6 w-6" /></IconButton>
	<input
		bind:value={inputValue}
		class="h-[46px] min-w-min flex-1 bg-transparent outline-none"
		type="text"
		placeholder="Cerca nella Posta"
	/>
	{#if inputValue !== ''}
		<IconButton
			on:click={() => {
				inputValue = '';
			}}><Close class="h-6 w-6" /></IconButton
		>
	{/if}
	<IconButton><Tune class="h-6 w-6" /></IconButton>
</div>
