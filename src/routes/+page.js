import { addEmails, emailStore } from '$lib/store/emails';
import { get } from 'svelte/store';
import dayjs from 'dayjs';

const randomDate = () => {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const parseDate = (dayjs_date) => {
  dayjs_date = dayjs(dayjs_date);

  if (!dayjs_date.isBefore(dayjs(), 'day')) return dayjs_date.format('HH:mm')
  if (!dayjs_date.isBefore(dayjs(), 'year')) return dayjs_date.format('DD MMMM')
  return dayjs_date.format('DD/MM/YYYY');
}

export const load = async ({ paramsm, fetch }) => {
  const res = await fetch('https://dummyjson.com/products?limit=25&skip=0');
  const data = await res.json();
  const emails = data.products.map(product => ({
    object: product.title,
    body: product.description,
    tag: ["starred","sent"],
    date: parseDate(randomDate()),
  }));

  addEmails(emails);

  return { emails }
}