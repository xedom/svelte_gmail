<script>
	import IconButton from '$lib/components/IconButton.svelte';
	import Email from 'svelte-material-icons/Email.svelte';
	import AccountGroup from 'svelte-material-icons/AccountGroup.svelte';
	import Message from 'svelte-material-icons/Message.svelte';
	import Video from 'svelte-material-icons/Video.svelte';
</script>

<div class="absolute top-0 flex h-full w-[68px] flex-col items-center gap-1 bg-slate-200 pt-16">
	<IconButton><Email class="h-7 w-7" /></IconButton>
	<span>Mails</span>
	<IconButton><AccountGroup class="h-7 w-7" /></IconButton>
	<span>Chat</span>
	<IconButton><Message class="h-7 w-7" /></IconButton>
	<span>Spaces</span>
	<IconButton><Video class="h-7 w-7" /></IconButton>
	<span>Meet</span>
</div>
