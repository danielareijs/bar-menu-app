import React, {useState, useEffect} from 'react';

//services
import {getCategories} from '../services/categories';

//pages
import CreateCategory from './CreateCategory';
import Categories from './Categories';
import MainCategory from './MainCategory';

function EditCategories(props) {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
      populateCategories()
  }, [])

  function populateCategories(){
    return getCategories()
      .then(data => {
        setCategories(data);
      })
  }


  return (
    <div>
      <CreateCategory updateCategories={populateCategories}/>
      <hr className="my-5"/>
      <Categories updateCategories={populateCategories} categories={categories}/>
      <hr className="my-5"/>
      <MainCategory updateMainCategory={props.updateMainCategory}/>
    </div>
  )
}

export default EditCategories