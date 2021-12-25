import { useState } from "react";
import Header from "./Header";
import "./Status.css";
import "./FilterComponents.css";

function Status() {
  const [isVisible, setVisible] = useState(true);
  const [statusNew, setStatusNew] = useState(false);
  const [statusUsed, setStatusUsed] = useState(false);

  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  return (
    <div className="category border rounded priceStatusContainer filterContainer">
      <Header title="Status" toggleVisible={toggleVisibality} />

      {isVisible && (
        <div className="priceFilterComponents filterBody">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={statusNew}
              onChange={() => setStatusNew(!statusNew)}
            />
            <label
              className="form-check-label"
              style={{ cursor: "pointer" }}
              onClick={() => setStatusNew(!statusNew)}
            >
              Nytt (15/234)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={statusUsed}
              onChange={() => setStatusUsed(!statusUsed)}
            />
            <label
              className="form-check-label"
              style={{ cursor: "pointer" }}
              onClick={() => setStatusUsed(!statusUsed)}
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
