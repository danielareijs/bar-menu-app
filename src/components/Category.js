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

//pages
// import AddDrinkToCategory from './AddDrinkToCategory';


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
    }


    function getOptionDrinks(){
        getDrinks()
        .then(data => {
            setOptionDrinks(data.map(drink => ({value: drink.id, label: drink.name}))    
            )
        })      
    }

    async function handleClick(drink){
        await removeDrinkFromCategory(drink.id, drink.category);
        getCategoryDrinks();
        // notify('success', 'Drink successfully removed from category.')
    
    }

    function addSelectedDrinks(){
        selectedDrinks.forEach(drink => {
            addDrinkToCategory(drink.value, category.id)
            getCategoryDrinks();
            // notify('success', 'Drink(s) added')
            selectRef.current.clearValue();
        })
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

    console.log(optionDrinks);


  return (
    <Accordion key={category.id}>
        <Accordion.Item eventKey="0" className="mt-1">
        <Accordion.Header>{category.name}</Accordion.Header>
        <Accordion.Body>
            <div className="d-flex justify-content-end">
                <button className="btn" onClick={() => handleRemoveCategory(category.id)}>Remove Category</button>
            </div>
            {drinks.length > 0 ? drinks
            .filter(drink => drink.category === category.id)
            .map(drink => {
                return (
                    <div key={uuidv4()} className="d-flex justify-content-between py-3" style={{borderBottom: '1px solid rgb(230,230,230)'}}>
                        <p>{drink.name}</p>
                        <IoMdClose onClick={() => handleClick(drink)}/>
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
            <button className="btn" onClick={addSelectedDrinks}>Add drink(s)</button>
            
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  )
}

export default Category