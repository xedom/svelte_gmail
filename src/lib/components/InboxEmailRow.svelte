<script>
	import Drag from 'svelte-material-icons/Drag.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let email;
	let isHoverning = false;

	const dispatch = createEventDispatcher();
	function onSelect(event, id) {
		dispatch('message', { type: event.target.checked ? 'selected' : 'deselected', id });
	}
	function onStarred(event) {
		dispatch('message', { type: 'starred', id: email.id });
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="
		grid
		grid-cols-1
		items-center
		border-b-2
		border-gray-200
		bg-slate-100
		px-1
		transition
		duration-200
		ease-in-out
		hover:cursor-pointer
		hover:bg-blue-200
		lg:grid-cols-[1.25rem_1.25rem_3rem_20rem_minmax(18.75rem,_2fr)_8rem]
	"
	on:mouseenter={() => (isHoverning = true)}
	on:mouseleave={() => (isHoverning = false)}
>
	<div>
		{#if isHoverning}
			<Drag />
		{/if}
	</div>
	<input
		on:change={(event) => {
			onSelect(event, email.id);
		}}
		type="checkbox"
	/>
	<IconButton on:click={onStarred}><StarOutline class="h-6 w-6" /></IconButton>
	<div class="overflow-hidden">
		<span class="whitespace-nowrap">{email.object}</span>
	</div>
	<div class="flex overflow-hidden">
		<span class="whitespace-nowrap">{email.body.slice(0, 50)}...</span>
	</div>
	<div class="flex justify-end overflow-hidden">
		<span class="text-sm text-gray-600">{email.date}</span>
	</div>
</div>
