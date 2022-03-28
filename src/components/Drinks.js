import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

//services
import {deleteDrink} from '../services/drinks';
import {notify} from '../services/toastify';

//icons
import {BsRecordFill} from 'react-icons/bs';

//pages 
import EditItem from './EditItem';

function Drinks(props) {
    const [inputValue, setInputValue] = useState('');
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setDrinks(props.drinks);
        setLoading(false);
    }, [props.drinks])
    
    function findMatches(word, drinks){
        return drinks.filter(drink => {
            const regex = new RegExp(word, 'gi')
            return drink.name.match(regex);
        })
    }

    async function handleChange(e){
        setInputValue(e.target.value);
    }

    function displayDrinks(input, drinks){
        const matches = findMatches(input, drinks)
        console.log(matches)
        return matches.map(drink => {
            let ingredients = '';
            if(drink.ingredients){
                ingredients = drink.ingredients.join(', '); 
            }
            return (
                <div key={uuidv4()} className="border-bottom p-3 d-flex justify-content-between align-items-center">
                    <div>
                        <p>{drink.name} {drink.available ? <BsRecordFill style={{color: 'green'}} /> : <BsRecordFill style={{color: 'red' }}/>}</p>
                        <p><small>{drink.price}kr {ingredients} {drink.volume}</small>
                        </p>
                    </div>
                    <button className="btn" onClick={() => navigate(`${drink.id}`)}>Edit</button>
                </div>
            )
        })
    }

    return (

        <div>
            <Form.Control 
            type="text"
            onChange={(e) => handleChange(e)}
            value={inputValue}
            placeholder="Search drink"/>
            <div>
                {loading ? <p>loading...</p> :
                displayDrinks(inputValue, drinks)
                }
            </div>
        </div>
    )
}

export default Drinks