import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form} from 'react-bootstrap';

//services
import {createDrink} from '../services/drinks';
import {getCategories, addDrinkToCategory} from '../services/categories';
import {notify} from '../services/toastify';

function ItemDetails(props) {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([]);
  const [drink, setDrink] = useState({
    name: '',
    categories: [],
    price: '',
    ingredients: [],
    volume: '',
    available: true
  })
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
    .then(data => {
      setCategories(data);
      setLoading(false);
    })
  }, [])


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
    if(drink.categories.length < 1){
      notify('error', 'Pick at least one category')
      return
    }
    const newDrink = {
      name: drink.name, 
      price: parseInt(drink.price),
      ingredients: drink.ingredients.length > 0 ? drink.ingredients.split(', ') : null,
      volume: drink.volume || null,
      available: drink.available
    }

    createDrink(newDrink)
    .then(data => {
      
      drink.categories.forEach(category => {
        console.log('category: ', data.id, category)
        addDrinkToCategory(data.id, category)
      })

      navigate('/ClassicCocktails');
      notify('Item added successfully.')
    })
    .catch(err => console.log(err));
  }

  function handleCategories(category){
    drink.categories.push(category);
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
          <Form.Label>Category: </Form.Label>
          {loading ? <p>Loading...</p> 
            : categories.map(category => {
            return <Form.Check key={category.id} label={category.name} onClick={(e) => handleCategories(category.id)}/>
            })}
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
          <Form.Select onChange={(e) => handleChange(e.target.value, 'available')}>
            <option>Available</option>
            <option>Unavailable</option>
          </Form.Select>
         </Form.Group>
         <button>Add Item</button>
      </Form>

    </div>
  )
}

export default ItemDetails