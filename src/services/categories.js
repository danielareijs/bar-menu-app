const API_URL = process.env.REACT_APP_API_URL;

export function getCategories() {
  return fetch(`${API_URL}/categories`)
  .then((res) => res.json());
}