import React, {useEffect, useState, useRef} from 'react'
import {Accordion} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

//Services
import { removeCategory } from '../services/categories';
import { getDrinksByCategory, removeDrinkFromCategory, addDrinkToCategory } from '../services/category_drinks';
import { getDrinks } from '../services/drinks';
import { notify } from '../services/toastify';

//react icon
import {IoMdClose} from 'react-icons/io';

function Category(props) {
    const [drinks, setDrinks] = useState([]);
    const [optionDrinks, setOptionDrinks] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const selectRef = useRef();
    const category = props.category;

    useEffect(() => {
        getCategoryDrinks();
        getOptionDrinks();
    }, [])

    function getCategoryDrinks(){
        getDrinksByCategory(category.id)
        .then(data => {
            setDrinks(data)   
        })
        .catch(err => console.log(err))
    }

    function getOptionDrinks(){
        getDrinks()
        .then(data => {
            setOptionDrinks(data.map(drink => ({value: drink.id, label: `${drink.name} ${drink.volume ? drink.volume : ''}`}))    
            )
        })      
    }

    async function handleClick(drink){
        await removeDrinkFromCategory(drink.id, drink.category);
        getCategoryDrinks();
    }

    async function addSelectedDrinks(){
        const drinkRequests = selectedDrinks.map(async (drink) => {
            return addDrinkToCategory(drink.value, category.id)
        })
        await Promise.all(drinkRequests);
        getCategoryDrinks();
        selectRef.current.clearValue();
        notify('success', 'Drink(s) added')
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


  return (
    <Accordion key={category.id}>
        <Accordion.Item eventKey="0" className="mt-1">
        <Accordion.Header>{category.name}</Accordion.Header>
        <Accordion.Body>
            {drinks.length > 0 ? drinks
            .filter(drink => drink.category === category.id)
            .map(drink => {
                return (
                    <div key={uuidv4()} className="d-flex justify-content-between py-3" style={{borderBottom: '1px solid rgb(230,230,230)'}}>
                        <p>{drink.name} {drink.volume}</p>
                        <IoMdClose 
                        style={{cursor: 'pointer'}}
                        onClick={() => handleClick(drink)}
                        />
                    </div>
                )
            }) 
            : <div>No drinks in this category</div>}

            <Select 
            ref={selectRef}
            onChange={setSelectedDrinks}
            options={optionDrinks} 
            placeholder="Select drink"
            isSearchable
            isMulti
            className="my-2"/>
            <button className="btn large-btn" onClick={addSelectedDrinks}>Add drink(s)</button>
            <button className="btn large-btn" onClick={() => handleRemoveCategory(category.id)}>Remove Category</button>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  )
}

export default Category