<script>
	export let email;
	let attachments = [
		{
			type: 'pdf',
			title: 'CV-2023',
			source: 'https://xed.im/random/AdmirableFreeAfricanjacana-mobile.mp4',
		},
		{
			type: 'mp4',
			title: 'interview',
			source: 'https://xed.im/random/rick_roll.mp4',
		},
	];

	console.log('email', email);
</script>

<div class="px-4">
	<div class="pl-14 font-semibold">{email.object}</div>

	<div class="flex items-start py-2">
		<img src="/profile.gif" alt="profile pic" class="mr-4 h-10 w-10 rounded-full" />
		<div class="text-sm">Pingu Corp</div>
		<div class="pl-2 text-xs font-thin">pingu-corp@noot.com</div>
	</div>

	<div class="pl-14 pt-4">{email.body}</div>
	<div class="pl-14 pt-4">
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed assumenda voluptatem, facilis voluptatum similique
		quidem officia nesciunt illo porro maxime laudantium totam aut, odit quisquam cumque rerum eius earum alias?
	</div>
	<div class="pl-14 pt-4">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptate odio maxime nesciunt, eius non
		cumque iusto culpa inventore natus, vel amet veniam neque laudantium accusamus alias expedita, commodi harum.
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum doloribus iure, dolorem ab, cupiditate
		repellendus repudiandae vero aliquid magnam, laudantium tenetur necessitatibus officia quidem eos exercitationem
		officiis qui dicta dignissimos.
	</div>
	<div class="pl-14 pt-4">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis obcaecati alias debitis assumenda accusamus
		blanditiis iure! Reiciendis nesciunt quo voluptate, assumenda ullam quibusdam, dolores quod vel, molestiae at
		possimus.
	</div>
	{#if attachments.length !== 0}
		<hr class="my-6 ml-14" />
		<div class="ml-14 font-semibold">Attachments</div>
		<div class="ml-14 mt-2 flex gap-2">
			{#each attachments as attachment}
				<a
					target="_blank"
					href={attachment.source}
					class="flex h-32 w-32 items-end rounded-md bg-blue-200 px-3 pb-2"
				>
					<div>{attachment.title}.{attachment.type}</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
