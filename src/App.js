import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

//PAGES
import Login from './components/Login';
import Menu from './components/Menu';
import ProtectedRoutes from './components/ProtectedRoutes';
import Logout from './components/Logout';
import Edit from './components/Edit';
import EditDrink from './components/EditDrink';
import EditCategories from './components/EditCategories';
import EditDrinks from './components/EditDrinks';
import Footer from './components/Footer';

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCategories } from './services/categories';


function App() {
  const [token, setToken] = useState(false);
  const [mainCategory, setMainCategory] = useState([]);

  useEffect(() => {
    if(localStorage.getItem('f6-menu-token')){
      setToken(true);
    }
    getCategories()
    .then(categories => {
      let main = categories.find(category => {
        return category.main === true;
      })
      if(!main) {
        main = categories[0].name.replace(/\s+/g, '')
      }
      setMainCategory(main);
    })
  }, [])

  function updateMainCategory(category){
    setMainCategory(category.replace(/\s+/g, ''))
  }


  function updateToken(state){
    setToken(state);
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/*" element={<Menu />}/>
          <Route path="/" element={<Navigate replace to={`/${mainCategory}`} />} />
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/edit/*" element={<Edit />}>
              <Route path="drinks" element={<EditDrinks />} />
              <Route path="categories" element={<EditCategories updateMainCategory={updateMainCategory}/>} />
            </Route>
            <Route path="/logout" element={<Logout updateToken={updateToken}/>}/>
            <Route path="/edit/drinks/:id" element={<EditDrink />} />
          </Route>
        </Routes>
      </div>
      {token && <Footer/>}
    </Router>
  );
}

export default App;
