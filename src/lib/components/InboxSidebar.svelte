<script>
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import Email from 'svelte-material-icons/Email.svelte';
	import Send from 'svelte-material-icons/Send.svelte';
	import File from 'svelte-material-icons/File.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="flex flex-col gap-1">
	<Button label="Inbox" count="420"><StarOutline /></Button>
	<Button label="Starred" count="420"><Email /></Button>
	<Button label="Sent" count="420"><Send /></Button>
	<Button label="Drafts" count="420"><File /></Button>
</div>
