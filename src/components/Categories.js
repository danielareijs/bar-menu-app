import React, { useState, useEffect } from 'react';
import {Accordion} from 'react-bootstrap';

//Services
import { removeDrinkFromCategory, removeCategory } from '../services/categories';
import { notify } from '../services/toastify';
import {deleteDrink, getDrinks} from '../services/drinks';

//react icon
import {IoMdClose} from 'react-icons/io';

function Categories(props) {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        let isMounted = true;
            getDrinks()
            .then(data => {
                if(isMounted){
                    setDrinks(data);
                }
            })
        return () => {
            isMounted = false;
            };
    }, [drinks])

    async function handleClick(drink){
        // const drink_ids = drinks.map(drink => drink.id).filter(id => id === drink.id);
        // if(drink_ids.length < 2){
        //     deleteDrink(drink.id)
        // }
            await removeDrinkFromCategory(drink.id, drink.category);
            notify('success', 'Drink successfully removed from category.')
        
    }

    async function handleRemoveCategory(category){
        try {
            const res = await removeCategory(category);
            console.log(res);
            if(res.ok){
                notify('success', 'Category successfully deleted.')
                props.updateCategories();
            } else {
               notify('error', 'Category is not empty');
            }
        } catch(error) {
            console.log(error)
        } 
    }
    
    function displayCategories(categories){
        return categories.map(category => {
            return (
            <Accordion key={category.id}>
                <Accordion.Item eventKey="0" style={{borderTop: 'none'}}>
                <Accordion.Header>{category.name}</Accordion.Header>
                <Accordion.Body>
                    {drinks
                    .filter(drink => drink.category === category.id)
                    .map(drink => {
                        return (
                            <div key={category.id+drink.id} className="d-flex justify-content-between py-3" style={{borderBottom: '1px solid rgb(230,230,230)'}}>
                                <p>{drink.name}</p>
                                <IoMdClose onClick={() => handleClick(drink)}/>
                            </div>
                        )
                    })}
                    <button onClick={() => handleRemoveCategory(category.id)}>Remove Category</button>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            )
        })
    }

    return (

        <div>
            {displayCategories(props.categories)}
        </div>
    )
}

export default Categories