import { addEmails } from '$lib/store/emails';
import { randomDate, parseDate } from '$lib/utils';

export const load = async ({ paramsm, fetch }) => {
  const res = await fetch('https://dummyjson.com/products?limit=25&skip=0');
  const data = await res.json();
  const emails = data.products.map(product => ({
    id: product.id,
    object: product.title,
    body: product.description,
    tag: ["starred","sent"],
    date: parseDate(randomDate()),
  }));

  addEmails(emails);

  return { emails }
}