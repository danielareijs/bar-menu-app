const API_URL = process.env.REACT_APP_API_URL;

export function getDrinks(){
  return fetch(`${API_URL}/drinks`)
  .then(res => res.json())
}

export function getDrinkById(id){
  return fetch(`${API_URL}/drinks/${id}`)
  .then(res => res.json())
}

export function createDrink(drink){
  console.log(drink);
  return fetch(`${API_URL}/drinks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({drink})
  })
  .then((res) => res.json());
}

export function updateDrink(drink){
  return fetch(`${API_URL}/drinks/${drink.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(drink)
  })
  .then(res => res.json())
}

export function deleteDrink(id){
  console.log(id)
  return fetch(`${API_URL}/drinks/${id}`, {
    method: 'DELETE',
  }).then(res => res.json());
}