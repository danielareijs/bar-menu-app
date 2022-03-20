import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//React Icons
import {IoMdAddCircleOutline} from 'react-icons/io';
import {BiDrink} from 'react-icons/bi';
import {FiLogOut} from 'react-icons/fi';

function Footer() {
  return (
    <Row className="footer">
        <Col><Link to="/add-item/select-category"><IoMdAddCircleOutline className="icon"/></Link></Col>
        <Col><Link to="/ClassicCocktails"><BiDrink className="icon"/></Link></Col>
        <Col><Link to="/logout"><FiLogOut className="icon"/></Link></Col>
    </Row>
  )
}

export default Footer