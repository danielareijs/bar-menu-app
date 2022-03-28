import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import EditCategories from './EditCategories';
import EditDrinks from './EditDrinks';

function Edit() {
  return (
    <>
        <div className="d-flex justify-content-around">
            <Link to="drinks"><h2>Drinks</h2></Link>
            <Link to="categories"><h2>Categories</h2></Link>
        </div>
        <Routes>
            <Route path="drinks" element={<EditDrinks />} />
            <Route path="categories" element={<EditCategories />} />
        </Routes>
    </>
  )
}

export default Edit