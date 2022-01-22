import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Slider from "@material-ui/core/Slider";
import "./Price.css";
import './FilterComponents.css';
import { setMinPriceAction, setMaxPriceAction } from "../../../actions/SearchActions";

function Price(props) {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(true);
  const [priceValue, setPriceValue] = useState([0, 100]);

  const handlePriceSliderChange = (event, newValue) => {
    setPriceValue(newValue);
    props.setfilter("price_min",priceValue[0])
    props.setfilter("price_max",priceValue[1])
  };

  function applyPrice(){
    dispatch(setMinPriceAction(priceValue[0]))
    dispatch(setMaxPriceAction(priceValue[1]))
  }

  function decreasePrice(e) {
    let min_value = parseInt(e.target.value);
    setPriceValue([min_value, priceValue[1]]);
    props.setfilter("price_min",min_value)

  }

  function increasePrice(e) {
    let max_value = parseInt(e.target.value);
    setPriceValue([priceValue[0], max_value]);
    props.setfilter("price_max",max_value)
  }

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
              onChange={decreasePrice}
              style={{marginRight: 15}}
            ></input>
            <input
              type="number"
              className="form-control"
              id="max-price-input"
              placeholder="max. pris"
              value={priceValue[1]}
              onChange={increasePrice}
            ></input>
          </div>
          <button className="btn btn-primary w-100 mt-3" onClick={applyPrice}>Søk</button>
        </div>
      )}
    </div>
  );
}

export default Price;
