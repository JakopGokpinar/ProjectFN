import { useState } from "react";

function Checkbox(params) {
    
    const {id,title,isDisabled, isChecked} = params;

    const [checked, setChecked] = useState(isChecked);

    return(
        <div className="form-check">
            <input className="form-check-input" 
                    type="checkbox" 
                    id={id} 
                    checked={checked} 
                    disabled={isDisabled}
                    onChange={() => setChecked(!checked)}></input>
            <label  className="form-check-label" for={id}>
                {title}
            </label>
        </div>
    )
}

export default Checkbox;