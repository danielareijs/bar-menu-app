const API_URL = process.env.REACT_APP_API_URL;

export function getDrinks() {
  return fetch(`${API_URL}/drinks`)
  .then((res) => res.json());
}