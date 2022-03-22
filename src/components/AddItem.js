import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom';

//pages
import SelectCategory from './SelectCategory';
import CreateCategory from './CreateCatgeory';
import ItemDetails from './ItemDetails';

function AddItem() {
  const [data, setData] = useState({
    category: 1,
    name: '',
    price: 0,
    ingredients: [],
    available: true
  })
  
  function updateData(field, value){
    console.log('In update: ', field, value.id);
    setData(data => {
        return {...data, [field]: value.id};
    })
}
  return (
    <div>
      <h2>AddItem</h2>
      <Routes>
        <Route path="select-category" element={<SelectCategory updateData={updateData}/>}/>
        <Route path="add-category" element={<CreateCategory updateData={updateData}/>} />
        <Route path="details" element={<ItemDetails udpateData={updateData} category={data.category}/>} />
      </Routes>
    </div>
  )
}

export default AddItem