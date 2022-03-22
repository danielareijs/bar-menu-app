import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {getCategories} from '../services/categories';

function SelectCategory(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
    .then(data => {
      setCategories(data);
      setLoading(false);
    })
  }, [])

  function handleClick(){
    navigate(`/add-item/add-category`);
  }

  function handleChange(e){
    e.preventDefault();
    const category = categories.find(category => {
      return category.name === e.target.value;
    })
    console.log('In select category: ', category)
    props.updateData('category', category);
  }

  return (
    <div>
      <Form>
        <Form.Label>Pick a category or <span 
          style={{textDecoration: 'underline', 
          cursor: 'pointer'}} 
          onClick={() => handleClick()}>add a new category</span>
        </Form.Label>
        <Form.Select 
          name="category" 
          onChange={(e) => handleChange(e)}
          required>
            {loading ? <option>Loading...</option> 
            : categories.map(category => {
            return <option key={category.id}>{category.name}</option>
            })}
        </Form.Select>
        <Form.Control type="submit" value="Next" onClick={() => navigate(`/add-item/details`)} />
      </Form>
    </div>
  )
}

export default SelectCategory;