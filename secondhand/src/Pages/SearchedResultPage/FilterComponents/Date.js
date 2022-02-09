import React from "react";
import { useState } from "react";
import Header from "./Header";
import "./FilterComponents.css";

function Date(props) {
  const [isVisible, setVisible] = useState(true);
  const [checkedDate, setCheckedDate] = useState('');

  function handleChange(e) {
    props.setfilter("published", e.target.value, "published", e.target.value);
    setCheckedDate(e.target.id);
  }

  React.useEffect(() => {
    var state = props.state;
    if (state === undefined) {
      setCheckedDate('')
    }
  }, [props.state]);

  return (
    <div className="category border rounded filterContainer">
      <div onClick={() => setVisible(!isVisible)}>
        <Header title="Dato" />
      </div>
      {isVisible && (
        <div
          id="category-content"
          className="filterBody"
          onChange={handleChange.bind(this)}         
        >
          <div className="form-check">
            <input
              className="form-check-input"
              value="today"
              type="radio"
              name="flexRadioDefault"
              id="radio-today"
              checked={checkedDate === "radio-today" && true}
            />
            <label className="form-check-label" for="radio-today">
              I dag
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              value="week"
              type="radio"
              name="flexRadioDefault"
              id="radio-week"
              checked={checkedDate === "radio-week" && true}
            />
            <label className="form-check-label" for="radio-week">
              I uka
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              value="month"
              type="radio"
              name="flexRadioDefault"
              id="radio-month"
              checked={checkedDate === "radio-month" && true}
            />
            <label className="form-check-label" for="radio-month">
              I måned
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Date;
