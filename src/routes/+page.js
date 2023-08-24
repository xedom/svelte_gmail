
export const load = async ({ paramsm, fetch }) => {
  const res = await fetch('https://dummyjson.com/products?limit=10&skip=0');
  const data = await res.json();
  const emails = data.products.map(product =>
    ({ object: product.title, body: product.description, timestamp: '09:12'})
  );

  return { emails }
}