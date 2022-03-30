import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { getDrinks } from '../services/drinks';

//Pages
import AddDrink from './AddDrink';
import Drinks from './Drinks';

function EditDrinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    displayDrinks()
}, [])


function displayDrinks(){
  getDrinks()
    .then(data => {
      setDrinks(data);
    })
}

  return (
    <div>
      <Accordion>
          <Accordion.Item eventKey="0">
          <Accordion.Header><p>Add new drink</p></Accordion.Header>
          <Accordion.Body>
            <AddDrink displayDrinks={displayDrinks}/>
          </Accordion.Body>
          </Accordion.Item>
      </Accordion>
      <Drinks drinks={drinks} displayDrinks={displayDrinks}/>
    </div>
  )
}

export default EditDrinks