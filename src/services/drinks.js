const API_URL = process.env.REACT_APP_API_URL;

export function getDrinksByCategory(category) {
  return fetch(`${API_URL}/drinks/${category}`)
  .then((res) => res.json());
}

export function createDrink(drink){
  return fetch(`${API_URL}/drinks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({drink})
  })
  .then((res) => res.json());
}