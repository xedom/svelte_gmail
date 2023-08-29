<script>
	import { page } from '$app/stores';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import Email from 'svelte-material-icons/Email.svelte';
	import Send from 'svelte-material-icons/Send.svelte';
	import File from 'svelte-material-icons/File.svelte';
	import Pen from 'svelte-material-icons/Pen.svelte';
	import Tag from 'svelte-material-icons/Tag.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { emailStore } from '$lib/store/emails';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onCollapse() {
		dispatch('message', { type: 'close-draft' });
	}
</script>

<div class="flex flex-col gap-3 p-2">
	<button
		on:click={onCollapse}
		class="flex cursor-pointer items-center gap-2 self-auto rounded-lg bg-blue-200 p-4 transition-all hover:bg-blue-300"
	>
		<Pen />
		<span>Compose</span>
	</button>

	<!-- class:bg-blue-300={true || $page.route.id === '/compose'} -->
	<div class="flex flex-col gap-1">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="flex flex-col gap-1 rounded-full"
			class:bg-blue-200={$page.route.id === '/'}
			class:font-semibold={$page.route.id === '/'}
			class:text-blue-800={$page.route.id === '/'}
		>
			<Button
				on:click={() => {
					goto('/');
				}}
				label="Inbox"
				count={$emailStore.filtered.length}><StarOutline /></Button
			>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="flex flex-col gap-1 rounded-full"
			class:bg-blue-200={$page.route.id === '/starred'}
			class:font-semibold={$page.route.id === '/starred'}
			class:text-blue-800={$page.route.id === '/starred'}
		>
			<Button
				on:click={() => {
					goto('/starred');
				}}
				label="Starred"
				count={$emailStore.starred.length}><Email /></Button
			>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="flex flex-col gap-1 rounded-full"
			class:bg-blue-200={$page.route.id === '/sent'}
			class:font-semibold={$page.route.id === '/sent'}
			class:text-blue-800={$page.route.id === '/sent'}
		>
			<Button
				on:click={() => {
					goto('/sent');
				}}
				label="Sent"
				count={$emailStore.sent.length}><Send /></Button
			>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="flex flex-col gap-1 rounded-full"
			class:bg-blue-200={$page.route.id === '/drafts'}
			class:font-semibold={$page.route.id === '/drafts'}
			class:text-blue-800={$page.route.id === '/drafts'}
		>
			<Button
				on:click={() => {
					goto('/drafts');
				}}
				label="Drafts"
				count={$emailStore.drafts.length}><File /></Button
			>
		</div>
	</div>

	<!-- <div>
		<div>Labels</div>
	</div>

	<div class="flex flex-col gap-1">
		<Button label="Work" count="420"><Tag /></Button>
		<Button label="Starred" count="420"><Tag /></Button>
		<Button label="Sent" count="420"><Tag /></Button>
		<Button label="Drafts" count="420"><Tag /></Button>
	</div> -->
</div>
