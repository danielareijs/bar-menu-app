import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {createCategory} from '../services/categories';
import {notify} from '../services/toastify'; 

function CreateCategory(props) {
    console.log(props);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    function handleClick(e){
        e.preventDefault();
        const category = {name: e.target.category.value}
        createCategory(category)
        .then(data => {
            console.log(data);
            if(data.error) {
                notify('error', data.error)
            } else {
                props.updateData('category', data);
                navigate(`/add-item/details`);
            }
        })
        .catch(err => console.log('in catch: ', err))
    }

    return (
        <div>
            <Form.Label>Category name: </Form.Label>
            {error && <div>{error}</div>}
            <Form onSubmit={(e) => handleClick(e)}>
                <Form.Control 
                name="category"
                type="text" 
                required/>
                <Form.Control type="submit" value="Next"/>
            </Form>
        </div>
    )
}

export default CreateCategory