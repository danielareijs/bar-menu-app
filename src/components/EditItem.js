import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import {Form} from 'react-bootstrap';

//Services
import {notify} from '../services/toastify';
import {getDrinkById, updateDrink, deleteDrink} from '../services/drinks';
import {removeDrinkFromAllCategories} from '../services/categories';

function EditItem(props) {
    const [drink, setDrink] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDrinkById(id)
        .then(data => {
            console.log(data)
            setDrink(data);
            setIsLoading(false);
        })
    }, []);

    function handleChange(e, field){
        let value = e.target.value;
        if(e.target.value === 'Available') value = true;
        if(e.target.value === 'Unavailable') value = false;

        setDrink(drink => {
            return {...drink, [field]: value}
          })
    }

    function updateItem(e){
        e.preventDefault();

        updateDrink(drink)
        .then(data => {
            navigate(`/ClassicCocktails`);
            notify('Item updated successfully');
        })
        .catch(err => console.log(err))
    }

    async function deleteItem(e){
        e.preventDefault();

        deleteDrink(drink.id)
        .then(data => {
            navigate(`/ClassicCocktails`)
            notify('success', 'Item successfully deleted.');
        })
        .catch(err => console.log(err))
    }

    return (

        <div>
            <h2>EditItem</h2>
            {isLoading ? <p>Loading...</p> : 
                <Form className="edit-form">
                    <Form.Group>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                    name="name" 
                    type="text" 
                    value={drink.name}
                    onChange={(e) => handleChange(e, 'name')}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Price: </Form.Label>
                    <Form.Control 
                    name="price" 
                    type="number" 
                    value={drink.price}
                    onChange={(e) => handleChange(e, 'price')}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Ingredients: </Form.Label>
                    <Form.Control 
                    name="ingredients" 
                    type="text" 
                    value={drink.ingredients}
                    onChange={(e) => handleChange(e, 'ingredients')}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Volume: </Form.Label>
                    <Form.Control 
                    name="volume" 
                    type="text" 
                    value={drink.volume}
                    onChange={(e) => handleChange(e, 'volume')}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Availability: </Form.Label>
                    <Form.Select onChange={(e) => handleChange(e, 'available')}>
                        <option>Available</option>
                        <option>Unavailable</option>
                    </Form.Select>
                    </Form.Group>
                    <button className="update-btn" onClick={(e) => updateItem(e)}>Update item</button>
                    <button className="delete-btn" onClick={(e) => deleteItem(e)}>Delete item</button>
                </Form>
            }
        </div>
    )
}

export default EditItem