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
  console.log(categories, main)
  const notMain = categories.filter(category => category.id !== main.id);
  console.log(main, notMain);
  // return fetch(`${API_URL}/categories/${main.id}`, {
  //   method: 'PUT', 
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(main)
  // })
}
