import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {createDrink} from '../services/drinks';
import {notify} from '../services/toastify';

function ItemInfo(props) {
  const [drink, setDrink] = useState({
    name: '',
    price: '',
    ingredients: [],
    volume: '',
    available: true
  })
  const category = props.category;
  const navigate = useNavigate();

  function handleChange(inputValue, field){
    let value = inputValue;
      if(inputValue === 'Available') value = true;
      if(inputValue === 'Unavailable') value = false;

      setDrink(drink => {
          return {...drink, [field]: value}
        })
  }

  function addItem(e){
    e.preventDefault();
    const newDrink = {
      category: category,
      name: drink.name, 
      price: parseInt(drink.price),
      ingredients: drink.ingredients.length > 0 ? drink.ingredients.split(', ') : null,
      volume: drink.volume || null,
      available: drink.available
    }
    
    createDrink(newDrink)
    .then(data => {
      navigate('/');
      notify('Item added successfully.')
    })
    .catch(err => console.log(err));
  
  }

  return (
    <div>
      <h3>ItemInfo</h3>
      <Form onSubmit={(e) => addItem(e)}>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control 
          name="name" 
          type="text" 
          value={drink.name}
          onChange={(e) => handleChange(e.target.value, 'name')}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Price: </Form.Label>
          <Form.Control 
          name="price" 
          type="number" 
          value={drink.price}
          onChange={(e) => handleChange(e.target.value, 'price')}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingredients: </Form.Label>
          <Form.Control 
          name="ingredients" 
          type="text" 
          value={drink.ingredients}
          onChange={(e) => handleChange(e.target.value, 'ingredients')}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Volume: </Form.Label>
          <Form.Control 
          name="volume" 
          type="text" 
          value={drink.volume}
          onChange={(e) => handleChange(e.target.value, 'volume')}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Availability: </Form.Label>
          <Form.Select>
            <option>Available</option>
            <option>Unavailable</option>
          </Form.Select>
         </Form.Group>
         <button>Add Item</button>
      </Form>

    </div>
  )
}

export default ItemInfo