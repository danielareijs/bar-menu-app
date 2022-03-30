import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import Select from 'react-select';
import {Form} from 'react-bootstrap';

//icons
import {RiArrowGoBackLine} from 'react-icons/ri';

//Services
import {notify} from '../services/toastify';
import {getDrinkById, updateDrink, deleteDrink} from '../services/drinks';

function EditItem(props) {
    const [drink, setDrink] = useState({
        name: '',
        price: 0,
        ingredients: '',
        volume: '',
        available: true
    });
    const [availability, setAvailability] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
            getDrinkById(params.id)
            .then(data => {
                if(isMounted){
                    setDrink(data);
                    setIsLoading(false);
                }
            })
        return () => {
            isMounted = false;
            };
    }, [params.id]);

    function handleChange(e, field){
        let value = e.target.value

        setDrink(drink => {
            return {...drink, [field]: value}
          })
    }

    function updateItem(e){
        e.preventDefault();

        let updatedDrink = drink
        if(availability.value !== undefined){
            updatedDrink = {...drink, available: availability.value}
        }

        updateDrink(updatedDrink)
        .then(data => {
            notify('success', 'Item updated successfully');
            navigate('/edit/drinks')
        })
        .catch(err => console.log(err))
    }


    function deleteItem(e, drink_id){
        e.preventDefault();
        deleteDrink(drink_id)
        .then(data => {
            notify('success', 'Item successfully deleted.');
            navigate('/edit/drinks');
        })
        .catch(err => console.log(err))
    }

    return (

        <div>
            {isLoading ? <p>Loading...</p> :
                <Form className="edit-form">
                    <div className="d-flex justify-content-between">
                        <h3>Edit drink</h3> 
                        <button className="btn d-flex align-items-center" onClick={() => navigate('/edit/drinks')}><RiArrowGoBackLine /></button>
                    </div>
                       
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
                    value={drink.price || ''}
                    onChange={(e) => handleChange(e, 'price')}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Ingredients: </Form.Label>
                    <Form.Control 
                    name="ingredients" 
                    type="text" 
                    value={drink.ingredients || []}
                    onChange={(e) => handleChange(e, 'ingredients')}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Volume: </Form.Label>
                    <Form.Control 
                    name="volume" 
                    type="text" 
                    value={drink.volume || ''}
                    onChange={(e) => handleChange(e, 'volume')}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Availability: </Form.Label>
                    <Select 
                    options={[{value: true, label: 'Available'}, {value: false, label: 'Unavailable'}]} 
                    onChange={setAvailability}
                    required/>
                    </Form.Group>
                    <div>
                        <button className="btn large-btn" onClick={(e) => updateItem(e)}>Update item</button>
                        <button className="btn large-btn" onClick={(e) => deleteItem(e, drink.id)}>Delete item</button>
                    </div>
                </Form>

            }
        </div>
    )
}

export default EditItem