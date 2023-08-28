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
	search: "",
});

emailStore.subscribe((value) => {
	setLocalStorage("emails", value.emails);
});

export const moveOnTop = (id_to_move, id_where_to_move) => {
	const currentEmails = get(emailStore).emails;
	console.log('moveOnTop|currentEmails:', currentEmails);
	const indexOfEmailToMove = currentEmails.findIndex((email) => email.id === id_to_move);
	const indexOfEmailWhereToMove = currentEmails.findIndex((email) => email.id === id_where_to_move);
	const emailToMove = currentEmails.splice(indexOfEmailToMove, 1)[0];
	console.log('moveOnTop|emailToMove:', emailToMove);
	console.log('moveOnTop:', indexOfEmailToMove, 'on', indexOfEmailWhereToMove);
	currentEmails.splice(indexOfEmailWhereToMove, 0, emailToMove);
	console.log('moveOnTop|currentEmails:', currentEmails);

	emailStore.update((store) => ({
		...store,
		emails: currentEmails,
		filtered: currentEmails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred')),
		starred: currentEmails.filter(e => e.tags.includes('starred')),
		sent: currentEmails.filter(e => e.tags.includes('sent')),
		drafts: currentEmails.filter(e => e.tags.includes('draft')),
	}));
}

export const addDraftEmail = (object, body) => {
	const email = {
		id: Math.random().toString(36).substr(2, 9),
    object, body,
    tags: ["draft"],
    timestamp: dayjs().valueOf(),
    date: parseDate(dayjs()),
  };

	emailStore.update((store) => ({...store, drafts: [...store.drafts, email]}));
	return email;
}

export const bulkDelete = (ids) => {
	emailStore.update((store) => {
		const newEmails = store.emails.filter((email) => !ids.includes(email.id));
		store.emails = newEmails;
		store.filtered = newEmails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred'));
		store.starred = newEmails.filter(e => e.tags.includes('starred'));
		store.sent = newEmails.filter(e => e.tags.includes('sent'));
		store.drafts = newEmails.filter(e => e.tags.includes('draft'));
		return store;
	});
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

export const addSentEmail = (object, body) => {
	const email = {
		id: Math.random().toString(36).substr(2, 9),
    object, body,
    tags: ["sent"],
		timestamp: dayjs().valueOf(),
    date: parseDate(dayjs()),
  };

	emailStore.update((store) => ({...store, sent: [...store.sent, email]}));
	return email;
}

export const setEmails = (emails) => {
	emailStore.update((store) => { 
		const newEmails = [...emails];
		store.emails = newEmails
		store.filtered = newEmails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred'));
		store.starred = emails.filter(e => e.tags.includes('starred'));
		store.sent = emails.filter(e => e.tags.includes('sent'));
		store.drafts = emails.filter(e => e.tags.includes('draft'));
		return store
	});
}

export const addEmails = (emails) => {
	emailStore.update((store) => {
		const newEmails = [...store.emails, ...emails];
		store.emails = newEmails;
		store.filtered = newEmails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred'));
		store.starred = emails.filter(e => e.tags.includes('starred'));
		store.sent = emails.filter(e => e.tags.includes('sent'));
		store.drafts = emails.filter(e => e.tags.includes('draft'));
		return store
	});
}

export const deleteEmail = (id) => {
	emailStore.update((store) => {
		store.emails = store.emails.filter((email) => email.id !== id)
	});
}

export const handleSearch = (data) => {
	const filtered = data.emails.filter(email => 
		email.object.toLowerCase().includes(data.search.toLowerCase())
	);
	data.filtered = filtered.filter(e => e.tags.includes('inbox')||e.tags.includes('starred'));
}

export const getInboxEmails = () => {
	return get(emailStore).emails.filter(e => e.tags.includes('inbox')||e.tags.includes('starred'));
}

export const getStarredEmails = () => {
	return get(emailStore).emails.filter(e => e.tags.includes('starred'));
}

export const getSentEmails = () => {
	return get(emailStore).emails.filter(e => e.tags.includes('sent'));
}

export const getDraftsEmails = () => {
	return get(emailStore).emails.filter(e => e.tags.includes('draft'));
}
