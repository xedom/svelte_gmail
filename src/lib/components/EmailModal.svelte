<script>
	import Close from 'svelte-material-icons/Close.svelte';
	import { addDraftEmail, addSentEmail } from '$lib/store/emails';
	import { createEventDispatcher } from 'svelte';

	export let show = false;

	$: attachements = [];

	let emailTo = '';
	let emailObject = '';
	let emailMessage = '';

	function saveDraft() {
		if (emailObject.trim() == '' || emailMessage.trim() == '') return;
		addDraftEmail(emailObject, emailMessage, attachements);
		onClear();
	}
	function onSave() {
		if (emailObject.trim() == '' || emailMessage.trim() == '') return;
		addSentEmail(emailObject, emailMessage, attachements);
		onClear();
		dispatch('message', { type: 'close-draft' });
	}

	function onClear() {
		emailTo = '';
		emailObject = '';
		emailMessage = '';
		attachements = [];
	}

	function onDrop(ev) {
		ev.preventDefault();
		const item = ev.dataTransfer.items || ev.dataTransfer.files;
		[...item].forEach((item, i) => {
			if (item.kind === 'file') {
				let fileName = item.name;
				fileName = item.name || item.getAsFile().name;
				attachements = [...attachements, fileName];
				// console.log('file', fileName);
			}
		});
	}

	const dispatch = createEventDispatcher();
	function onModalClose() {
		saveDraft();
		dispatch('message', { type: 'close-draft' });
	}
</script>

{#if show}
	<div class="absolute bottom-0 right-40 z-50 w-[30rem] overflow-hidden rounded-lg bg-white drop-shadow-xl">
		<div class="flex bg-slate-300 px-3 py-1">
			<div class="flex-1">New Email</div>
			<button on:click={onModalClose} class="cursor-pointer p-1 hover:bg-slate-200"><Close /></button>
		</div>
		<div class="flex flex-col gap-1 py-1">
			<input
				bind:value={emailTo}
				class="flex-1 border-b-2 border-slate-300 px-3 py-2 outline-none"
				type="text"
				placeholder="To"
			/>
			<input
				bind:value={emailObject}
				class="flex-1 border-b-2 border-slate-300 px-3 py-2 outline-none"
				type="text"
				placeholder="Object"
			/>
			<!-- <label for="">message</label> -->
			<textarea
				on:dragover={(e) => {
					e.preventDefault();
				}}
				on:drop={onDrop}
				bind:value={emailMessage}
				class="resize-none px-3 py-2 outline-none"
				name=""
				id=""
				cols="30"
				rows="10"
			></textarea>
			{#each attachements as attachment}
				<div class="mx-2 inline-block rounded-lg border-2 border-dashed border-stone-600 px-1 text-sm">
					{attachment}
				</div>
			{/each}
		</div>
		<div class="flex justify-end gap-2 px-3 py-2">
			<button on:click={onSave} class="rounded-full bg-blue-500 px-5 py-1 text-white">Send</button>
			<button on:click={onClear} class="rounded-full bg-blue-500 px-5 py-1 text-white">Delete</button>
		</div>
	</div>
{/if}
