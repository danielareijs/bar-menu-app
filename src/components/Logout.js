import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

function Logout(props) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('f6-menu-token');
        props.updateToken(false);
        navigate('/ClassicCocktails');
    }, [])

    return (
      <div>
          <div>Logging out..</div>
      </div>
    )
}

export default Logout