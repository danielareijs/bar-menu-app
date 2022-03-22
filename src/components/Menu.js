import React, {useState, useEffect, useRef} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {getCategories} from '../services/categories';

// react icons
import {GoLocation} from 'react-icons/go';

// pages
import Items from './Items';

function Menu() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const activeCategory= useRef('Classic Cocktails');

  useEffect(() => {
    getCategories()
    .then(data => {
      setCategories(data);
      setLoading(false);
    })
  }, [])

  // async function fetchCategories (){
  //   const categories = await getCategories();
  //   setCategories(categories);
  //   setLoading(false);
  // }

  function handleActive(category){
    activeCategory.current = category;
  }

  function displayCategories(){
    return categories.map(category => {
      const categoryPath = category.name.replace(/\s+/g, '');
      const classes = category.name == activeCategory.current ? "category-link active" : "category-link";

      return (
        <Link 
        key={category.id} 
        to={categoryPath}
        className={classes} 
        onClick={(e) => handleActive(category.name)}
        >
          {category.name}
        </Link>
      )
    })
  }

  return (
    <>
      <div className="info">
        <img src="https://images.squarespace-cdn.com/content/v1/570bb51db09f95abd7012776/1460406014302-U0OBCZIUHCL0HY2G6N9E/2-2.png?format=1500w" alt="logo" />
        <div>
          <h1>F6</h1>
          <p><GoLocation /> Frognerveien 6</p>
        </div>
      </div>
        {loading ? <div>Loading menu...</div> :
          <div className="category-links">
            <div className="d-flex justify-content-between">
              <h3>Menu</h3>
              <Link to="/categories">Edit Categories</Link>
            </div>
              {displayCategories()}
              {/* <Link path="/" className="btn">Add new category<IoIosArrowForward /></Link> */}
              <Routes>
                {categories.map(category => {
                  const categoryPath = category.name.replace(/\s+/g, '');

                  return (
                  <Route 
                  key={category.id} 
                  path={`/${categoryPath}`} 
                  element={
                    <Items 
                    category={category.id} 
                    />
                  }/>
                  )
                })}
              </Routes>
            </div>
          }
    </>
  )
}

export default Menu