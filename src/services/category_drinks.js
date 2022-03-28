const API_URL = process.env.REACT_APP_API_URL;

export function getDrinksByCategory(category) {
  return fetch(`${API_URL}/${category}/drinks`)
  .then((res) => res.json());
}

export function removeDrinkFromCategory(drink, category){
  console.log(drink, category)
    return fetch(`${API_URL}/${category}/drinks/${drink}`, {
      method: 'DELETE'
    })
  }
  
  export function addDrinkToCategory(drink, category) {
    console.log('in categories services: ', drink, category)
    fetch(`${API_URL}/${category}/drinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({drink})
    })
  }