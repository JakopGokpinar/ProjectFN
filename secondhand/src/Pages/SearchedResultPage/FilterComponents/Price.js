import { useState } from "react";
import Header from "./Header";
import Slider from "@material-ui/core/Slider";
import "./Price.css";
import './FilterComponents.css';

function Price(params) {
  const [isVisible, setVisible] = useState(true);
  const [priceValue, setPriceValue] = useState([0, 100]);

  const handlePriceSliderChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  const handlePriceInputChange = (event, target) => {
    if (target === "min") {
      setPriceValue([event.target.value, priceValue[1]]);
    } else {
      setPriceValue([priceValue[0], event.target.value]);
    }
  };

  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  return (
    <div className="category border rounded priceFilterContainer filterContainer">
      <Header title="Pris" toggleVisible={toggleVisibality} />
      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="priceSliderDiv">
            <div id="showNumbersUponSlider w-100">
              <label className="text-muted">
                <small>{priceValue[0]} kr</small>
              </label>
              <label className="text-muted">
                <small>{priceValue[1]} kr</small>
              </label>
            </div>
            <Slider
              value={priceValue}
              onChange={handlePriceSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max={100}
            />
          </div>
          <div className="priceInputDiv form-group">
            <input
              type="number"
              className="form-control"
              id="min-price-input"
              placeholder="min. pris"
              value={priceValue[0]}
              onChange={(e) => handlePriceInputChange(e, "min")}
              style={{marginRight: 15}}
            ></input>
            <input
              type="number"
              className="form-control"
              id="max-price-input"
              placeholder="max. pris"
              value={priceValue[1]}
              onChange={(e) => handlePriceInputChange(e, "max")}
            ></input>
          </div>
          <button className="btn btn-primary w-100 mt-3">Søk</button>
        </div>
      )}
    </div>
  );
}

export default Price;
