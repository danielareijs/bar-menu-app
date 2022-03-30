import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//React Icons
import {BiDrink} from 'react-icons/bi';
import {FiLogOut} from 'react-icons/fi';
import {FaRegEdit} from 'react-icons/fa';

function Footer() {
  return (
    <Row className="footer">
        <Col><Link to="/edit/drinks"><FaRegEdit className="icon"/></Link></Col>
        <Col><Link to="/"><BiDrink className="icon"/></Link></Col>
        <Col><Link to="/logout"><FiLogOut className="icon"/></Link></Col>
    </Row>
  )
}

export default Footer