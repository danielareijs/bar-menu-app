import React, {useState, useEffect, useRef} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {getCategories} from '../services/categories';

// react icons
import {GoLocation} from 'react-icons/go';

function Menu() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const activeCategory = useRef('Classic Cocktails')

  useEffect(() => {
    fetchCategories();
  }, [])

  async function fetchCategories (){
    const categories = await getCategories();
    setCategories(categories);
    setLoading(false);
  }

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
        {loading ? <div>Loading menu...</div> :
          <div className="category-links">
            <h3>Menu</h3>
              {displayCategories()}
              <Routes>
                {categories.map(category => {
                  const categoryPath = category.name.replace(/\s+/g, '');

                  return (
                  <Route 
                  key={category.id} 
                  path={`/${categoryPath}`} 
                  element={
                    <h1>{category.name}</h1>
                  }/>
                  )
                })}
              </Routes>
            </div>
          }
      </div>
    </>
  )
}

export default Menu