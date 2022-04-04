import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./CategorySelector.css";

function CategorySelector(props) {
  const [isVisible, setVisible] = useState(true);
  const [categoryArray, setCategoryArray] = useState([
    props.categoryState
  ]);

  function toggleVisibality() {
    var visible = isVisible;
    setVisible(!visible);
  }

  function selectCategory() {
      
  }

  return (
    <div className="category border rounded categorySelectorContainer filterContainer">
      <Header title="Kategori" toggleVisible={toggleVisibality} />
      {isVisible && (
        <div>
          <ul className="categorySelector__ul">
            {categoryArray.map((category) => {
              return (
                <li>
                  <Link className="categorySelector__ul__li">
                    {category} <i class="fa-solid fa-angle-right"></i>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
