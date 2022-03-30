import React, {useState, useEffect} from 'react';
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';
import {getCategories} from '../services/categories';

// react icons
import {GoLocation} from 'react-icons/go';

// pages
import MenuItems from './MenuItems';
import BackToTopButton from './BackToTopButton';

function Menu() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories()
    .then(data => {
      setCategories(data);
      setLoading(false);
    })
  }, [])


  function displayCategories(){
    return categories.map(category => {
      const categoryPath = category.name.replace(/\s+/g, '');
      const classes = categoryPath === params['*'] ? "category-btn active" : "category-btn link";

      return (
        <Link 
        key={category.id} 
        to={categoryPath}>
          <button className={classes}>
          {category.name}
          </button>
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
          <div className="links position-relative">
              <h3>Menu</h3>
              <div>
              {displayCategories()}
              </div>
              <Routes>
                {categories.map(category => {
                  const categoryPath = category.name.replace(/\s+/g, '');

                  return (
                  <Route 
                  key={category.id} 
                  path={`/${categoryPath}`} 
                  element={
                    <MenuItems 
                    category={category.id} 
                    />
                  }/>
                  )
                })}
              </Routes>
              <div className="d-flex justify-content-center">
                <BackToTopButton />
              </div>
            </div>
          }
    </>
  )
}

export default Menu