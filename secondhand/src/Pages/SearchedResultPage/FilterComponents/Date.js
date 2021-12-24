import { useState } from 'react';
import Header from './Header';

function Date() {
    const [isVisible, setVisible] = useState(true);

    return(
        <div className="category border rounded">
            <div  onClick={() => setVisible(!isVisible)}>
                <Header title="Dato"/> 
            </div>
                {isVisible &&        
                <div id="category-content">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label" for="flexRadioDefault1">
                            I dag
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                        <label className="form-check-label" for="flexRadioDefault2">
                            I uka
                        </label>
                    </div>            
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                        <label className="form-check-label" for="flexRadioDefault2">
                            I måned
                        </label>
                    </div>            
                </div>
                }
        </div>
    )
}

export default Date;