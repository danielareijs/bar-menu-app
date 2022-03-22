import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {createCategory} from '../services/categories';
import {notify} from '../services/toastify'; 

function CreateCategory(props) {

    function handleClick(e){
        e.preventDefault();
        const category = {name: e.target.category.value}
        createCategory(category)
        .then(data => {
            if(data.error) {
                notify('error', data.error)
            } else {
                notify('success', 'Category successfully created.')
                props.updateCategories();
            }
        })
        .catch(err => console.log('in catch: ', err))
    }

    return (
        <div>
            <Form onSubmit={(e) => handleClick(e)}>
                <Form.Group>
                    <Form.Label>Add new category: </Form.Label>
                    <Form.Control 
                    name="category"
                    placeholder="Category Name"
                    type="text" 
                    required/>
                </Form.Group>
                <Form.Control type="submit" value="Add Category"/>
            </Form>
        </div>
    )
}

export default CreateCategory