import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CarAnnonce from "./components/CarAnnonce";
import PropertyAnnonce from "./components/PropertyAnnonce";
import ContactInformation from "./Seller";
import PhotoAndDescription from "./Media";
import Spinner from "../../Component/Spinner/Spinner";
import axios from "axios";
import { getCroppedImage } from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURltoFile";

function AnnonceRoute(props) {
  var { categoryName } = useParams();
  const [annonceComponent, setComponent] = useState(<></>);
  const [isLoading, setLoading] = useState(true);
  const [properties, setProperties] = useState({ uniqueProps: {} });
  const [seller, setSeller] = useState({});
  const [images, setImages] = useState();

  function findCategory() {
    if (isLoading) {
      switch (categoryName) {
        case "bil":
          setComponent(<CarAnnonce func={handleUniquePropChange}></CarAnnonce>);
          setLoading(false);
          break;
        case "enebolig":
          setComponent(<PropertyAnnonce></PropertyAnnonce>);
          setLoading(false);
          break;
        default:
          setComponent(<p>Annonce type couldn't found!</p>);
          setLoading(false);
          break;
      }
    }
  }

  const handlePropertiesChange = (e) => {
    var target = e.target.id;
    const value = e.target.value;
    const prop = properties;

    prop[target] = value;
    setProperties(prop);
    console.log(properties);
  };

  const handleUniquePropChange = (e) => {
    var target = e.target.id;
    const value = e.target.value;
    const prop = properties;

    prop.uniqueProps[target] = value;
    setProperties(prop);
    console.log(properties);
  };

  const handleSellerPropChange = (e) => {
    var target = e.target.id;
    const value = e.target.value;
    const prop = seller;

    prop[target] = value;
    setSeller(prop);
    console.log(seller);
  };

  const handleImageChange = (imgArray) => {
    setImages(imgArray);
    setTimeout(() => {
      console.log(imgArray);
    }, 2000);
  };

  const submitAnnonce = async () => {
    var formData = new FormData(); // create form to data to upload images properly
    let selectedFiles = images;

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        var img = selectedFiles[i];
        const canvas = await getCroppedImage(img);
        const canvasDataUrl = canvas.toDataURL("image/jpeg");
        const convertedUrltoFile = dataURLtoFile(
          canvasDataUrl,
          `${Date.now()}-myimage.jpg`
        );
        console.log(convertedUrltoFile);

        formData.append("galleryImage", convertedUrltoFile);
      }
    }
    // first make request for image uploading
    axios
      .post(
        "http://localhost:3080/file/uploadimages?location=ahmet/annonces/annonce1",
        formData
      )
      .then((response) => {
        console.log(response);
        var locations = [];
        response.data.files.map((elem) => {
          return locations.push(elem.location);
        });
        var annonce = { properties, locations, seller };
        console.log(annonce);
        // second, make request to create annonce with the locations of uploaded images
        axios
          .post("http://localhost:3080/file/createannonce", annonce)
          .then((respond) => {
            console.log(respond);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    findCategory();
  });

  return (
    <div>
      {!isLoading ? (
        <div>
          <h4>Properties</h4>
          <label className="form-label" htmlFor="title">
            Tittelen
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
              onChange={handlePropertiesChange}
            />
          </div>
          <label className="form-label" htmlFor="price">
            Price
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="price"
              aria-describedby="title"
              onChange={handlePropertiesChange}
            />
          </div>
          {annonceComponent}
          <PhotoAndDescription
            onchange={handleImageChange}
          ></PhotoAndDescription>
          <ContactInformation
            onchange={handleSellerPropChange}
          ></ContactInformation>
          <button
            className="btn btn-primary w-100 mb-5"
            type="button"
            onClick={submitAnnonce}
          >
            Publish
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default AnnonceRoute;
