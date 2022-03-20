const API_URL = process.env.REACT_APP_API_URL;

export async function getLoginToken({ username, password }) {
  console.log('in sessions')
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }),
  })
  .then((res) => res.json());
}