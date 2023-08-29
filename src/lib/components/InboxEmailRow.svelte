<script>
	import Drag from 'svelte-material-icons/Drag.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import Star from 'svelte-material-icons/Star.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import { moveOnTop } from '$lib/store/emails';

	export let email;
	let isHoverning = false;

	const dispatch = createEventDispatcher();
	function onSelect(event, id) {
		dispatch('message', { type: event.target.checked ? 'selected' : 'deselected', id });
	}
	function onStarred(event) {
		if (email.tags.includes('starred')) return dispatch('message', { type: 'unstar', id: email.id });
		else return dispatch('message', { type: 'starred', id: email.id });
	}

	function onDrag(event) {
		event.dataTransfer.setData('text/plain', email.id);
	}
	function onDrop(event) {
		event.preventDefault();
		const id = event.dataTransfer.getData('text/plain');
		moveOnTop(id, email.id);
	}
	function onDragover(event) {
		event.preventDefault();
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:drop={onDrop}
	on:dragover={onDragover}
	on:dragstart={onDrag}
	draggable="true"
	class="
		flex
		flex-row
		items-baseline
		border-b-[1px]
		border-gray-300
		bg-slate-100
		px-1
		transition
		duration-200
		ease-in-out
		hover:cursor-pointer
		hover:bg-blue-100
	"
	on:mouseenter={() => (isHoverning = true)}
	on:mouseleave={() => (isHoverning = false)}
>
	<div class="flex h-5 w-5 items-end justify-center self-center">
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
	<IconButton on:click={onStarred}>
		{#if email.tags.includes('starred')}
			<Star />
		{:else}
			<StarOutline />
		{/if}
	</IconButton>
	<a href={'/email/' + email.id} class="flex flex-1 flex-col flex-wrap lg:flex-row">
		<div class="w-64 overflow-hidden">
			<span class="whitespace-nowrap font-medium">{email.object}</span>
		</div>
		<div class="flex-1 overflow-hidden">
			<span class="whitespace-nowrap font-light lg:pl-2">{email.body.slice(0, 50)}...</span>
		</div>
	</a>
	<div class="flex justify-end overflow-hidden">
		<span class="text-sm text-gray-600">{email.date}</span>
	</div>
</div>
