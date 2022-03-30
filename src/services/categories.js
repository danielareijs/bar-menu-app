const API_URL = process.env.REACT_APP_API_URL;

export function getCategories() {
  return fetch(`${API_URL}/categories`)
  .then((res) => res.json());
}

export function createCategory(category){
  return fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  })
  .then(res => res.json())
}

export async function removeCategory(category){
  return fetch(`${API_URL}/categories/${category}`, {
    method: 'DELETE'
  })
}

export async function setMainCategory(categories, main){
  categories
  .filter(category => category.value !== main.value)
  .forEach(category => {
    console.log(category);
    fetch(`${API_URL}/categories/${category.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({main: false})
    })
  })
  console.log(main)
  return fetch(`${API_URL}/categories/${main.value}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({main: true})
  })
}
