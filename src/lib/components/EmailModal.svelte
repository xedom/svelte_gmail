<script>
	import Close from 'svelte-material-icons/Close.svelte';
	import { createDraft } from '$lib/store/emails';
	import { createEventDispatcher } from 'svelte';

	export let show = false;

	const dispatch = createEventDispatcher();
	function onCollapse() {
		dispatch('message', { type: 'close-draft' });
	}
</script>

{#if show}
	<div class="absolute bottom-0 right-40 z-50 w-96 overflow-hidden rounded-lg bg-white">
		<div class="flex bg-slate-300 px-3 py-1">
			<div class="flex-1">New Email</div>
			<button on:click={onCollapse} class="cursor-pointer p-1 hover:bg-slate-200"><Close /></button>
		</div>
		<div class="flex flex-col gap-1 py-1">
			<input class="flex-1 border-b-2 border-slate-300 px-3 py-2 outline-none" type="text" placeholder="To" />
			<input class="flex-1 border-b-2 border-slate-300 px-3 py-2 outline-none" type="text" placeholder="Object" />
			<!-- <label for="">message</label> -->
			<textarea class="resize-none px-3 py-2 outline-none" name="" id="" cols="30" rows="10"></textarea>
		</div>
		<div class="flex justify-end gap-2 px-3 py-2">
			<button class="rounded-full bg-blue-500 px-5 py-1 text-white">Send</button>
			<button class="rounded-full bg-blue-500 px-5 py-1 text-white">Delete</button>
		</div>
	</div>
{/if}
