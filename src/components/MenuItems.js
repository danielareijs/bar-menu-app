import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {getDrinksByCategory} from '../services/category_drinks';


function Items(props) {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDrinks(props.category);
    }, [props.category])

    async function fetchDrinks(category){
        const drinks = await getDrinksByCategory(category);
        setDrinks(drinks);
        setLoading(false);
    }

    function displayItems(){
        if(drinks.length < 1){
            return <p>No drinks in this category..</p>
        }

        return drinks.map(drink => {
        let ingredients = '';
        if(drink.ingredients){
            ingredients = [...drink.ingredients].join(', ') ;
        }

        return (
            <div key={uuidv4()} className={drink.available ? `menu-card` : `menu-card unavailable`}>
            <div className="left">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h4>{drink.name}</h4>
                </div>
                {drink.volume && <p>{drink.volume}</p>}
                {ingredients && <p><small>{ingredients}</small></p>}
                
            </div>
            <div className="right" style={{alignSelf: 'end'}}> 
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