import React, { useState } from "react";
import UniqueCarComponents from "./Cars/UniqueCarComponents";
import UniquePropertyComponents from "./Properties/UniquePropertyComponents";

const components = {
    'cars': UniqueCarComponents,
    'property': UniquePropertyComponents,
}

function UniqueCategoryComponents(props) {

    const [category,setCategory] = useState(undefined);
    let [CategoryComponent, setCategoryComponent] = useState();


    React.useEffect(() => {
        if(props.categoryState !== undefined) {
            var state = props.categoryState.queryValue;
            setCategoryComponent(() =>  components[state])
            setCategory(props.categoryState)
        }
    }, [props.categoryState])

    return(
        <div>
            {category !== undefined &&         
                <CategoryComponent></CategoryComponent>
            }    
        </div>
    )
}



export default UniqueCategoryComponents;