import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

//PAGES
import Login from './components/Login';
import Menu from './components/Menu';
import ProtectedRoutes from './components/ProtectedRoutes';
import Logout from './components/Logout';
import ItemDetails from './components/ItemDetails';
import Edit from './components/Edit';
import EditItem from './components/EditItem';
import EditCategories from './components/EditCategories';
import Footer from './components/Footer';

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [token, setToken] = useState(false);

  useEffect( () => {
    if(localStorage.getItem('f6-menu-token')){
      setToken(true)
    }
  }, [])

  function updateToken(state){
    setToken(state);
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/*" element={<Menu />}/>
          <Route path="/" element={<Navigate replace to="/classicCocktails" />} />
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/edit/*" element={<Edit />}/>
            <Route path="/logout" element={<Logout updateToken={updateToken}/>}/>
            <Route path="/add-item/" element={<ItemDetails />}/>
            <Route path="/categories" element={<EditCategories />} />
            <Route path="/edit/drinks/:id" element={<EditItem />} />
          </Route>
        </Routes>
      </div>
      {token && <Footer/>}
    </Router>
  );
}

export default App;
