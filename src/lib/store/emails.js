import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import dayjs from 'dayjs';
import { parseDate } from '$lib/utils';
// if (!browser) return store;

export const getLocalStorage = (key) => {
	if (!browser) return;
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : [];
};

export const setLocalStorage = (key, data) => {
	if (!browser) return;

	localStorage.setItem(key, JSON.stringify(data));
};


export const emailStore = writable({
	emails: [],
	filtered: [],
	starred: [],
	sent: [],
	drafts: [],
	search: '',
});

emailStore.subscribe((value) => {
	if (value.emails.length !== 0) setLocalStorage("emails", value.emails);
});


export const moveOnTop = (id_to_move, id_where_to_move) => {
	const currentEmails = get(emailStore).emails;
	const indexOfEmailToMove = currentEmails.findIndex((email) => email.id === id_to_move);
	const indexOfEmailWhereToMove = currentEmails.findIndex((email) => email.id === id_where_to_move);
	const emailToMove = currentEmails.splice(indexOfEmailToMove, 1)[0];
	currentEmails.splice(indexOfEmailWhereToMove, 0, emailToMove);

	setEmails(currentEmails);
}

export const addStarredEmail = (id) => {
	const newMails = get(emailStore).emails.map((email) => {
		if (email.id !== id) return email;
		if (email.tags.includes("starred")) return email;
		email.tags = [...email.tags, "starred"];
		return email;
	})

	emailStore.update((store) => ({
		...store,
		emails: [...newMails],
		starred: get(emailStore).emails.filter(e => e.tags.includes('starred'))
	}));
}

export const removeStarredEmail = (id) => {
	const newMails = get(emailStore).emails.map((email) => {
		if (email.id !== id) return email;
		if (!email.tags.includes("starred")) return email;
		email.tags = email.tags.filter((tag) => tag !== "starred");
		return email;
	})

	emailStore.update((store) => ({
		...store,
		emails: [...newMails],
		starred: get(emailStore).emails.filter(e => e.tags.includes('starred'))
	}));
}

export const addSentEmail = (object, body, attachments = []) => {
	const email = {
		id: Math.random().toString(36).substr(2, 9),
    object, body,
    tags: ["sent"],
		timestamp: dayjs().valueOf(),
		attachments,
    date: parseDate(dayjs()),
  };
	addEmails([email]);
	return email;
}

export const addDraftEmail = (object, body, attachments = []) => {
	const email = {
		id: Math.random().toString(36).substr(2, 9),
    object, body,
    tags: ["draft"],
    timestamp: dayjs().valueOf(),
		attachments,
    date: parseDate(dayjs()),
  };
	addEmails([email]);
	return email;
}

export const setEmails = (emails) => {
	emailStore.update((store) => {
		return {
			...store, emails,
			filtered: emails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred')),
			starred: emails.filter(e => e.tags.includes('starred')),
			sent: emails.filter(e => e.tags.includes('sent')),
			drafts: emails.filter(e => e.tags.includes('draft')),
		}
	});
}

export const addEmails = (newEmails) => {
	emailStore.update((store) => {
		const emails = [...store.emails, ...newEmails];
		return {
			...store, emails,
			filtered: emails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred')),
			starred: emails.filter(e => e.tags.includes('starred')),
			sent: emails.filter(e => e.tags.includes('sent')),
			drafts: emails.filter(e => e.tags.includes('draft')),
		}
	});
}

export const deleteEmails = (ids) => {
	emailStore.update((store) => {
		const emails = store.emails.filter((e) => !ids.includes(e.id));
		return {
			...store, emails,
			filtered: emails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred')),
			starred: emails.filter(e => e.tags.includes('starred')),
			sent: emails.filter(e => e.tags.includes('sent')),
			drafts: emails.filter(e => e.tags.includes('draft')),
		}
	});
}

export const handleSearch = (data) => {
	const filtered = data.emails.filter(e => 
		e.object.toLowerCase().includes(data.search.toLowerCase())
	);
	data.filtered = filtered.filter(e => e.tags.includes('inbox')||e.tags.includes('starred'));
}
