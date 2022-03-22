import React, {useState, useEffect} from 'react';
import {getCategories} from '../services/categories';

//pages
import CreateCategory from './CreateCategory';
import Categories from './Categories';

function EditCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      updateCategories()
  }, [])

  function updateCategories(){
    getCategories()
      .then(data => {
        setCategories(data);
      })
  }

  return (
    <div>
      <h2>Edit Categories</h2>
      <hr />
      <CreateCategory updateCategories={updateCategories}/>
      <br></br>
      <Categories updateCategories={updateCategories} categories={categories}/>
    </div>
  )
}

export default EditCategories