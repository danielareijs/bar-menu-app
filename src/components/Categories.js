import React from 'react';
import { v4 as uuidv4 } from 'uuid';

//pages 
import Category from './Category';

function Categories(props) {
 
    
    function displayCategories(categories){
        return categories.map(category => {
            return (
                <Category key={uuidv4()} category={category} updateCategories={props.updateCategories}/>
            )
        })
    }

    return (

        <div>
            {displayCategories(props.categories)}
        </div>
    )
}

export default Categories