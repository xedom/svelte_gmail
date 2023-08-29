<script>
	export let attachment;

	let previewImage = undefined;
	let acceptedTypesForPreview = ['image/png', 'image/jpeg', 'image/gif'];
	if (acceptedTypesForPreview.includes(attachment.type)) {
		previewImage = attachment.data;
	}

	function download(dataurl, filename) {
		const link = document.createElement('a');
		link.href = dataurl;
		link.download = filename;
		link.click();
	}
</script>

<a
	href={attachment.data}
	download={attachment.name}
	title={attachment.name}
	class="relative flex h-32 w-32 flex-col justify-end overflow-hidden rounded-md bg-blue-200 drop-shadow-md"
>
	{#if previewImage}
		<img src={previewImage} alt="attachment preview" class="h-full w-full object-cover" />
	{:else}
		<div class="flex h-full w-full items-center justify-center text-4xl text-blue-500">
			<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
				><path
					d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
				/></svg
			>
		</div>
	{/if}

	<div class="z-10 whitespace-nowrap bg-slate-700 px-2 pt-1 text-sm font-semibold text-white drop-shadow-lg">
		{attachment.name.length > 12 ? attachment.name.slice(0, 12) + '...' : attachment.name}
	</div>
	<div class="z-10 whitespace-nowrap bg-slate-700 px-2 pb-1 text-xs text-white">{attachment.type}</div>
</a>
