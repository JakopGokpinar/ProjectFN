import { useState } from "react"
import Header from "./CategoryHeader";

function Status(){
    const [isVisible, setVisible] = useState(true);
    const [nyttChecked, setNyttChecked] = useState(false);
    const [bruktChecked, setBruktChecked] = useState(false);

    return(
        <div className="category border rounded">
            <div onClick={() => setVisible(!isVisible)}>
                <Header title="Status"/>
            </div>
            {isVisible &&
                <div id="category-content">
                    <div className="form-check mb-2" >
                        <input className="form-check-input" type="checkbox" checked={nyttChecked} onClick={() => setNyttChecked(!nyttChecked)}/>
                        <label className="form-check-label" style={{cursor: "pointer"}} onClick={() => setNyttChecked(!nyttChecked)}>
                            Nytt (15/234)
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={bruktChecked} onClick={() => setBruktChecked(!bruktChecked)}/>
                        <label className="form-check-label"style={{cursor: "pointer"}} onClick={() => setBruktChecked(!bruktChecked)}>
                            Brukt (34)
                        </label>
                    </div>            
                </div>
            }
        </div>
    )
}

export default Status