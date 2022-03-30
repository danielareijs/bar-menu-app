import React from 'react';
import {Routes, Route, Link, useParams, Outlet} from 'react-router-dom';

import EditCategories from './EditCategories';
import EditDrinks from './EditDrinks';

function Edit(props) {
  const params = useParams();
  console.log(params);

  console.log(props);
  return (
    <>
        <div className="d-flex justify-content-around links mb-4">
            <Link 
            to="drinks" 
            className={params['*'] === 'drinks' ? 'link active' : 'link'}>
              <h2>Drinks</h2></Link>
            <Link 
            to="categories" 
            className={params['*'] === 'categories' ? 'link active' : 'link'}>
              <h2>Categories</h2></Link>
        </div>
        <Outlet />
        {/* <Routes>
            <Route path="drinks" element={<EditDrinks />} />
            <Route path="categories" element={<EditCategories />} />
        </Routes> */}
    </>
  )
}

export default Edit