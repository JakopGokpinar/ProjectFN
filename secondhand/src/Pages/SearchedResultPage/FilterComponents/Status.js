import React, { useState } from "react";
import Header from "./Header";
import "./Status.css";
import "./FilterComponents.css";

function Status(props) {
  const [isVisible, setVisible] = useState(true);
  const [statNew, setStatNew] = useState(false);
  const [statUsed, setStatUsed] = useState(false);

  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  function changeStatus(e) {
    var target = e.target.id;
    if (target === "newCheckbox" || target === "newCheckboxLabel") {
      var snew = !statNew;
      if (snew === true) props.setfilter("status", "new", "statusNew", "Nytt");
      else props.setfilter("status", "", "statusNew", "");
    }

    if (target === "usedCheckbox" || target === "usedCheckboxLabel") {
      var sused = !statUsed;
      if (sused === true)
        props.setfilter("status", "used", "statusUsed", "Brukt");
      else props.setfilter("status", "", "statusUsed", "");
    }
  }

  React.useEffect(() => {
    if (props.statusNewState === undefined) {
      setStatNew(false);
    } else {
      setStatNew(true);
    }
  }, [props.statusNewState]);

  React.useEffect(() => {
    if (props.statusUsedState === undefined) {
      setStatUsed(false);
    } else {
      setStatUsed(true);
    }
  }, [props.statusUsedState]);

  return (
    <div className="category border rounded priceStatusContainer filterContainer">
      <Header title="Status" toggleVisible={toggleVisibality} />
      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="newCheckbox"
              checked={statNew}
              onChange={(e) => changeStatus(e)}
            />
            <label
              className="form-check-label"
              id="newCheckboxLabel"
              style={{ cursor: "pointer" }}
              onClick={(e) => changeStatus(e)}
            >
              Nytt (15/234)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="usedCheckbox"
              type="checkbox"
              checked={statUsed}
              onChange={(e) => changeStatus(e)}
            />
            <label
              className="form-check-label"
              id="usedCheckboxLabel"
              style={{ cursor: "pointer" }}
              onClick={(e) => changeStatus(e)}
            >
              Brukt (34)
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Status;
