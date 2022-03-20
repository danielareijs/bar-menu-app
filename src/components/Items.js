import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {getDrinksByCategory} from '../services/drinks';

import {BiEdit} from 'react-icons/bi';

function Items(props) {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useRef();

    useEffect(() => {
        token.current = localStorage.getItem('f6-menu-token');
        fetchDrinks(props.category);
    }, [props.category])

    async function fetchDrinks(category){
        const drinks = await getDrinksByCategory(category);
        setDrinks(drinks);
        setLoading(false);
    }

    function displayItems(){
        return drinks.map(drink => {
        let ingredients = '';
        if(drink.ingredients){
            ingredients = [...drink.ingredients].join(', ') ;
        }

        return (
            <div key={drink.id} className={drink.available ? `menu-card` : `menu-card unavailable`}>
            <div className="left">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h4>{drink.name}</h4> {drink.volume && <p className="mx-2">{drink.volume} </p>}
                </div>
                {ingredients && <p>{ingredients}</p>}
                
            </div>
            <div className="right" style={{alignSelf: 'end'}}> 
                {token.current && <Link to={`/${drink.id}/edit`} className="edit-item"><BiEdit /></Link>}
                <p>kr {drink.price}</p>
            </div>
            </div>
        )
        })
    }

    return (
        <div className="menu">
            {loading ? <div>Loading drinks...</div> :
             displayItems()
            }
            
        </div>
    )
}

export default Items