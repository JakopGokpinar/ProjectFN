import { useState } from "react";
import Header from "./CategoryHeader";
import Slider from '@material-ui/core/Slider';


function Price(params) {
    const [isVisible, setVisible] = useState(true);
    const [priceValue, setPriceValue] = useState([0, 100]); 

    const handlePriceSliderChange = (event, newValue) => {
        setPriceValue(newValue);
    };

    const handlePriceInputChange = (event, target) => {      
        if(target === "min"){
            setPriceValue([event.target.value,priceValue[1]]);
        } else{
            setPriceValue([priceValue[0],event.target.value]);
        }
    
}

    return(
        <div className="category border rounded">
            <div onClick={() => setVisible(!isVisible)}>
                <Header title="Pris"/>
            </div>            
            {isVisible &&
                <div id="category-content">
                    <div className="price-slider w-100">
                        <div id="priceOverSlider">
                            <label className="text-muted"><small>{priceValue[0]} kr</small></label>
                            <label className="text-muted"><small>{priceValue[1]} kr</small></label>
                        </div>
                        <Slider
                            value={priceValue}
                            onChange={handlePriceSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            max="100"
                        />
                    </div>
                    <div className="price-inputs form-group">
                        <input type="number" className="form-control" id="min-price-input" placeholder="min. pris" value={priceValue[0]} onChange={e => handlePriceInputChange(e,"min")}></input>
                        <input type="number" className="form-control" id="max-price-input" placeholder="max. pris" value={priceValue[1]} onChange={e => handlePriceInputChange(e,"max")}></input>
                    </div>
                    <button className="btn btn-primary w-100 mt-3">Søk</button>
                </div>
            }
        </div>
    )
}

export default Price;