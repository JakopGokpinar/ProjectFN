import { useState } from 'react';
import Header from './CategoryHeader';

function Date() {
    const [isVisible, setVisible] = useState(true);

    return(
        <div className="category border rounded">
            <div  onClick={() => setVisible(!isVisible)}>
                <Header title="Dato"/> 
            </div>
                {isVisible &&        
                <div id="category-content">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            I dag
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            I uka
                        </label>
                    </div>            
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            I måned
                        </label>
                    </div>            
                </div>
                }
        </div>
    )
}

export default Date;