import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//PAGES
import Login from './components/Login';
import Menu from './components/Menu';
import Logout from './components/Logout';
import AddItem from './components/AddItem';
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
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout updateToken={updateToken}/>}/>
          <Route path="/add-item/select-category" element={<AddItem />}/>
        </Routes>
      </div>
      {token && <Footer/>}
    </Router>
  );
}

export default App;
