import { setEmails, addEmails, getLocalStorage, setLocalStorage } from '$lib/store/emails';
import { randomDate, parseDate } from '$lib/utils';
import { browser } from '$app/environment';
import dayjs from 'dayjs';

const getRandomTag = () => (["inbox", "starred", "sent", "drafts"][Math.floor(Math.random() * 4)]);

export const load = async ({ paramsm, fetch }) => {
	if (!browser) return;

  let emails = getLocalStorage('emails');

  if (!emails || emails.length === 0) {
    const res = await fetch('https://dummyjson.com/products?limit=80&skip=0');
    const data = await res.json();
    emails = data.products.map(product => {
      const timestamp = randomDate();
      return {
        id: Math.random().toString(36).substr(2, 9),
        object: product.title,
        body: product.description,
        tags: [getRandomTag()],
        timestamp: dayjs(timestamp).valueOf(),
        date: parseDate(timestamp),
      }
    });
    setLocalStorage('emails', emails);
    addEmails(emails);
  } else {
    setEmails(emails);
  }

  return { emails }
}