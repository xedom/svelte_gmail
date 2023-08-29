<script>
	import Close from 'svelte-material-icons/Close.svelte';
	import TrashCan from 'svelte-material-icons/TrashCan.svelte';
	import { addDraftEmail, addSentEmail } from '$lib/store/emails';
	import { createEventDispatcher } from 'svelte';

	export let show = false;
	$: attachments = [];

	let emailTo = '';
	let emailObject = '';
	let emailMessage = '';

	function saveDraft() {
		if (emailObject.trim() == '' || emailMessage.trim() == '') return;
		addDraftEmail(emailObject, emailMessage, attachments);
		onClear();
	}
	function onSave() {
		if (emailObject.trim() == '' || emailMessage.trim() == '') return;
		addSentEmail(emailObject, emailMessage, attachments);
		onClear();
		dispatch('message', { type: 'close-draft' });
	}

	function onClear() {
		emailTo = '';
		emailObject = '';
		emailMessage = '';
		attachments = [];
	}

	function onDrop(ev) {
		ev.preventDefault();
		const items = ev.dataTransfer.items || ev.dataTransfer.files;
		attachments = items;
		[...items].forEach((item, i) => {
			if (item.kind === 'file') {
				let file = item.name ? item : item.getAsFile();
				const reader = new FileReader();
				reader.addEventListener('load', () => {
					attachments = [
						...attachments,
						{
							id: Math.random().toString(36).substr(2, 9),
							name: file.name,
							type: file.type,
							data: reader.result,
						},
					];
				});
				reader.readAsDataURL(file);
				// attachments = [...attachments, file.name];
			}
		});
	}

	function onRemoveAttachment(id) {
		attachments = attachments.filter((a) => a.id != id);
	}

	const dispatch = createEventDispatcher();
	function onModalClose() {
		saveDraft();
		onClear();
		dispatch('message', { type: 'close-draft' });
	}
</script>

{#if show}
	<div class="absolute bottom-0 right-40 z-50 w-[30rem] overflow-hidden rounded-lg bg-white drop-shadow-xl">
		<div class="flex bg-slate-300 px-3 py-1">
			<div class="flex-1">New Email</div>
			<button on:click={onModalClose} class="cursor-pointer p-1 hover:bg-slate-200"><Close /></button>
		</div>
		<div class="flex flex-col py-1">
			<input
				bind:value={emailTo}
				class="flex-1 border-b-[1px] border-slate-300 px-2 py-1 outline-none"
				type="text"
				placeholder="To"
			/>
			<input
				bind:value={emailObject}
				class="flex-1 border-b-[1px] border-slate-300 px-2 py-1 outline-none"
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
			{#each attachments as attachment}
				<div class="mx-1 mt-1 flex justify-between rounded-sm bg-stone-200 text-sm">
					<div class="overflow-hidden whitespace-nowrap px-1">
						{attachment.name}
					</div>
					<button
						on:click={onRemoveAttachment(attachment.id)}
						class="ml-1 rounded-lg px-1 hover:bg-red-700 hover:text-white"
					>
						<TrashCan />
					</button>
				</div>
			{/each}
		</div>
		<div class="flex justify-end gap-2 px-3 py-2">
			<button on:click={onSave} class="rounded-full bg-blue-500 px-4 py-1 text-white">Send</button>
			<button on:click={onClear} class="rounded-full bg-blue-500 px-4 py-1 text-white">Delete</button>
		</div>
	</div>
{/if}
