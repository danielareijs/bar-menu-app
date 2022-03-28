import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { getDrinks } from '../services/drinks';

//Pages
import AddItem from './AddItem';
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
      <hr />
      <Accordion>
          <Accordion.Item eventKey="0">
          <Accordion.Header><h3>Add new drink</h3></Accordion.Header>
          <Accordion.Body>
            <AddItem displayDrinks={displayDrinks}/>
          </Accordion.Body>
          </Accordion.Item>
      </Accordion>
      <Drinks drinks={drinks} displayDrinks={displayDrinks}/>
    </div>
  )
}

export default EditDrinks