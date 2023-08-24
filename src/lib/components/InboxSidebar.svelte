<script>
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import Email from 'svelte-material-icons/Email.svelte';
	import Send from 'svelte-material-icons/Send.svelte';
	import File from 'svelte-material-icons/File.svelte';
	import Pen from 'svelte-material-icons/Pen.svelte';
	import Tag from 'svelte-material-icons/Tag.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col gap-3 p-2">
	<div
		class="flex cursor-pointer items-center gap-2 self-auto rounded-lg bg-blue-200 p-4 transition-all hover:bg-blue-300"
	>
		<Pen />
		<span>Compose</span>
	</div>

	<div class="flex flex-col gap-1">
		<Button
			on:click={() => {
				goto('/');
			}}
			label="Inbox"
			count="420"><StarOutline /></Button
		>
		<Button
			on:click={() => {
				goto('/starred');
			}}
			label="Starred"
			count="420"><Email /></Button
		>
		<Button
			on:click={() => {
				goto('/sent');
			}}
			label="Sent"
			count="420"><Send /></Button
		>
		<Button
			on:click={() => {
				goto('/drafts');
			}}
			label="Drafts"
			count="420"><File /></Button
		>
	</div>

	<div>
		<div>Labels</div>
	</div>

	<div class="flex flex-col gap-1">
		<Button label="Work" count="420"><Tag /></Button>
		<Button label="Starred" count="420"><Tag /></Button>
		<Button label="Sent" count="420"><Tag /></Button>
		<Button label="Drafts" count="420"><Tag /></Button>
	</div>
</div>
