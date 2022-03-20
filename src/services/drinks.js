const API_URL = process.env.REACT_APP_API_URL;

export function getDrinksByCategory(category) {
  return fetch(`${API_URL}/drinks/${category}`)
  .then((res) => res.json());
}