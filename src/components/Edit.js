import React from 'react';
import {Link, useParams, Outlet} from 'react-router-dom';


function Edit() {
  const params = useParams();
  return (
    <>
        <div className="d-flex justify-content-around links mb-4">
            <Link 
            to="drinks" 
            className={params['*'] === 'drinks' ? 'link active' : 'link'}>
              <h2>Drinks</h2>
            </Link>
            <Link 
            to="categories" 
            className={params['*'] === 'categories' ? 'link active' : 'link'}>
              <h2>Categories</h2>
            </Link>
        </div>
        <Outlet />
    </>
  )
}

export default Edit