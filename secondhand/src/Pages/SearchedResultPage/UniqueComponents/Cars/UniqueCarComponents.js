import React, { useState } from "react";
import Biler from "./Biler/Biler";
import Bobiler from "./Bobiler/Bobiler";

const carTypes = {
    'biler': Biler,
    'bobiler':Bobiler
}

function UniqueCarComponents(props) {

    const [SubCategory, setSubCategory] = useState(undefined);

    React.useEffect(() => {
        if(props.subcategory) {
        let subcat = props.subcategory.queryValue;
            console.log(props.subcategory)
            setSubCategory(() => carTypes[subcat])
        }
    }, [props])

    return(
        <div>
            {SubCategory && 
                <SubCategory></SubCategory>
            }
        </div>
    )
}

export default UniqueCarComponents;