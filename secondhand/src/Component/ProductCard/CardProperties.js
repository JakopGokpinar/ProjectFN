import "./CardProperties.css";
import { instanceAxs } from "../../config/api";

function addToFavorites(e,id) {
  e.preventDefault();
  console.log('sa')
  instanceAxs.post('/favorites/add', {id: id}).then(response => {
    console.log(response)
  })
}

function CardProperties(props) {
  var [id,title, price, location] = props.properties;

  return (
    <div className="cardProperties">
      <p className="__title">{title}</p>
      <p className="__location">{location}</p>
      <p className="__price">{price} kr</p>
      <p className="__description">Some text about the nature right here. </p>
      <div className="__groupButtons">
      <button
        className="btn btn-outline-primary _messageButton"
        data-toggle="tooltip"
        title="Send Message"
        onClick={(e) => e.preventDefault()}
      >
        <i className="fas fa-envelope"></i> Melding
      </button>
      <button
        type="button"
        className="btn btn-outline-danger _favoritesButton"
        data-toggle="tooltip"
        title="Add to Favorites"
        onClick={(e) => addToFavorites(e,id)}
      >
        <i className="fas fa-heart"></i> Favoritt
      </button>
      <button className="btn btn-outline-primary">
        <i className="fas fa-link"></i> Del
      </button>
      </div>
    </div>
  );
}

export default CardProperties;
