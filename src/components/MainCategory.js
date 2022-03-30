import React, {useState, useEffect} from 'react'
import Select from 'react-select';

//services
import {notify} from '../services/toastify';
import {getCategories, setMainCategory} from '../services/categories';

function MainCategory(props) {
    const [optionCategories, setOptionCategories] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => {
        getCategories()
        .then(data => {
            setOptionCategories(data.map(item => {
                return {value: item.id, label: item.name}
            }))
        })
    }, [])
    
    function handleMainCategory(){
        setMainCategory(optionCategories, selected)
        props.updateMainCategory(selected.label)
        notify('success', 'Main category updated')
    }

    return (
        <div>
            <p>Main Category</p>
            <Select 
            placeholder={'Select category'}
            options={optionCategories}
            onChange={setSelected}/>
        <button 
        className="button"
        onClick={handleMainCategory}>Update Main Category</button>
        </div>
    )
}

export default MainCategory