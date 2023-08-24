import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import dayjs from 'dayjs';
import { parseDate } from '$lib/utils';
// if (!browser) return store;

const getLocalStorage = (key) => {
	if (!browser) return;
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : [];
};

export const emailStore = writable({
	emails: [],
	filtered: [],
	drafts: [],
	starred: [],
	sent: [],
	search: "",
});

export const createDraft = (object, body) => {
	const email = {
		id: Math.random().toString(36).substr(2, 9),
    object, body,
    tag: ["draft"],
    date: parseDate(dayjs()),
  };

	emailStore.update((store) => ({...store, drafts: [...store.drafts, email]}));
	return email;
}

export const bulkDelete = (ids) => {
	emailStore.update((store) => {
		store.emails = store.emails.filter((email) => !ids.includes(email.id))
		return store;
	});
}

export const starEmail = (id) => {
	console.log(id);
	const starredEmail = get(emailStore).emails.find((email) => email.id === id);
	if (starredEmail) {
		starredEmail.tag = [...starredEmail.tag, "starred"];
		emailStore.update((store) => ({...store, starred: [...store.starred, starredEmail]}));
	}
}

export const sendEmail = (object, body) => {
	const email = {
		id: Math.random().toString(36).substr(2, 9),
    object, body,
    tag: ["draft"],
    date: parseDate(dayjs()),
  };

	emailStore.update((store) => ({...store, sent: [...store.sent, email]}));
	return email;
}

export const addEmails = (emails) => {
	emailStore.update((store) => { 
		store.emails = [...store.emails, ...emails]
		return store
	});
	// handleSearch(get(emailStore));
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
	data.filtered = filtered;
}
