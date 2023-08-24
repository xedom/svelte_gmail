import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
// if (!browser) return store;

const getLocalStorage = (key) => {
	if (!browser) return;
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : [];
};

export const emailStore = writable({
	emails: [],
	filtered: [],
	search: "",
});

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
