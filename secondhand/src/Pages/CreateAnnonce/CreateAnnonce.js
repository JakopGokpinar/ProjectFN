import React, { useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import "./CreateAnnonce.css";

import AnnonceRoute from "./AnnonceRoute";
import { car } from "./components/CarAnnonce";
import { property } from "./components/PropertyAnnonce";

function CreateAnnonce() {
  let { path } = useRouteMatch();
  let history = useHistory();

  const categories = [property, car];

  const [category, setCategory] = useState();
  const [alert, setAlert] = useState("");

  const changeCategory = (category) => {
    setCategory(category);
  };

  const checkForm = () => {
    if (category) {
      history.push(path + `/ny/${category ? category.name : ""}`);
    } else {
      setAlert("Please select a category");
    }
  };

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <div className="createAnnonceMainDiv">
            <div className="chooseMainCategoryDiv">
              {categories.map((cat) => (
                <button
                  type="button"
                  className="btn border border-secondary"
                  name={cat.name}
                  value={cat}
                  onClick={() => changeCategory(cat)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <button className="btn btn-primary" onClick={checkForm}>
              Lagre & Gå Videre
            </button>
            <p>{alert}</p>
          </div>
        </Route>
        <Route path={`${path}/ny/:categoryName`}>
          <AnnonceRoute></AnnonceRoute>
        </Route>
      </Switch>
    </div>
  );
}

export default CreateAnnonce;
