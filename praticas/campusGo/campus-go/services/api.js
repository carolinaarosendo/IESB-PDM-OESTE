const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}

export async function getNotices(limit = 10) {
  return request(`/posts?_limit=${limit}`);
}

export async function create(resource, data) {
  return request(`/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export default { getNotices, create };