import React, { useEffect, useState, useRef } from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./NewAnnonce.css";
import { getCroppedImage } from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURltoFile";
import { instanceAxs } from "../../config/api";
import Carousel from 'react-bootstrap/Carousel';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFindCommuneByPostnumber } from "../../features/appDataSliceActions";

const NewAnnonce = () => {
  const communeFinder = useFindCommuneByPostnumber();
  
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [imageArray, setImageArray] = useState([]);
  const [postAddress, setPostAddress] = useState('Ugyldig postnummer');
  const [changedImage, setChangedImage] = useState({index: '', name: '', data: '', description: ''})
  const [imageLocations, setImageLocations] = useState([])
  const [annoncePropertyObject, setAnnoncePropertyObject] = useState({})

  const dragStart = (e, position) => {
    dragItem.current = position;
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const drop = (e) => {
    const copyListItems = [...imageArray];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setImageArray(copyListItems);
  };

const handlePropertyChange = (e) => {
  let itemKey = e.target.id;
  let value = e.target.value;
  setAnnoncePropertyObject(prevState => ({
    ...prevState, [itemKey]: value
  }))
}

const handleImageDelete = (e,imagename) => {
  e.preventDefault()
  let imgArr = imageArray;
  imgArr = imgArr.filter(img => img.name !== imagename);
  console.log(imgArr);
  setImageArray(imgArr)
}   

const handleImageDescription = (e, index, imagename, data) => {
  e.preventDefault();
  console.log(index)
  setChangedImage(prevState => ({index: index, name: imagename, data: data, description: e.target.value}))
/*   var value = e.target.value;
  var imgArr = imageArray;
  var matchedImage = imageArray[index];

  var description = matchedImage.description + value;
  console.log(imgArr)

  imgArr.splice(index, 1,{name: imagename, data: data, description: description})
  console.log(imgArr)

  setImageArray(imgArr) */


}

const submitAnnonce = async (event) => {
  event.preventDefault();
  var annonceObject = {};

  for (let i = 0; i < event.target.length; i++) {
    let element = event.target[i];
    let propTitle = element.name;

    if (propTitle === 'image' || propTitle === 'button') continue;

    annonceObject[propTitle] = element.value;
    this.setState({ annonceProperties: annonceObject})
  }

   const formData = await this.convertImagesToFormData();
   this.uploadImagesToServer(formData, this.uploadAnnonceToServer);
}

 const onImageChange = async (event) => {
  if(!event.target.files) return;   //target.files seçilen dosyaları döner

  // Array.from() target.files'ı iterable bir array'e dönüştürür
   Array.from(event.target.files).forEach(file => { 

      var reader = new FileReader();  //Yüklenen resmin datasını oku.
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => { 
      setImageArray(prevState => [...prevState, {name: file.name, data: reader.result, description: '' }])
      })
    })
};

 const convertImagesToFormData =  async () => {
  var formData = new FormData();
  const imageArray = this.state.imageArray;

  for (const image of imageArray) {   //await kullanımı için for...of döngüsü
    const canvas = await getCroppedImage(image.data);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrltoFile = dataURLtoFile(canvasDataUrl, image.name);

    formData.append("annonceImages", convertedUrltoFile);
  }
  return formData;
 }


 const uploadImagesToServer =  (formData, cb) => {
  instanceAxs.post('/newannonce/imageupload', formData).then(result => {
    console.log(result)
      if (result.data.message === 'images uploaded') {
        var imageLocations = result.data.files.map(e => e.location)
        this.setState({ imageLocations, annonceId: result.data.annonceId })
        cb(); // run uploadAnnoncesToDb after uploading images
      }
    })
    .catch( err => console.log(err) );
 }


 const uploadAnnonceToServer =  () => {
  let annonce = {
    annonceproperties: this.state.annonceProperties, 
    imagelocations: this.state.imageLocations,
    annonceid: this.state.annonceId
  }

  instanceAxs.post('/newannonce/create', annonce).then(result => {
    console.log(result)
  })
  .catch( err => console.log(err) );
 }

 useEffect(() => {
  const newValue = changedImage;
  if(newValue.name === '') return;
  console.log("new val", newValue)
  const images = imageArray;
  images.splice(newValue.index, 1, newValue)

  setImageArray(images)
 }, [changedImage])

 useEffect(async () => { 
  var postnum = annoncePropertyObject["postnumber"];
  postnum = (postnum !== '' && postnum !== undefined) ? postnum : 0;  

  fetch(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${postnum}&country=no&username=goksoft`, 
  {method: 'GET'})
  .then(response => response.json())
  .then(data => {
    const placeName = data.postalcodes[0];
    const postalcode = placeName ? placeName.adminCode2 : 0;
    const placeProperties = communeFinder(postalcode)
    setPostAddress(placeName ? placeName.placeName : 'Ugyldig postnummber')
  })
}, [annoncePropertyObject["postnumber"]])

    return (
      <div className="newannonce-container">
          <Row style={{margin: 0}}>
              <Col className="newannonce-col input-col" lg={4}md={6}>
                    <Form onSubmit={submitAnnonce}>
                        <Form.Group className="newannonce-form-group">
                            <Form.Label>Tittel</Form.Label>
                            <Form.Control type="text" id='title' onChange={handlePropertyChange} required></Form.Control>
                        </Form.Group>
                        <Form.Group className="newannonce-form-group">
                            <Form.Label>Price</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control type="number" id="price" className="me-3" onChange={handlePropertyChange} required></Form.Control>
                                <p className="me-3">kr</p>
                                <Form.Select className="w-50" id="price-period" onChange={handlePropertyChange}>
                                    <option value="totalt">Totalt</option>
                                    <option value="per-day">Per dag</option>
                                    <option value="per-week">Per uke</option>
                                    <option value="per-month">Per måned</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <Form.Group id="category" className="newannonce-form-group" onChange={handlePropertyChange}>
                            <Form.Label>Hoved Kategori</Form.Label>
                            <Form.Select>
                              <option value="torget">Torget</option>
                              <option value="car">Bil</option>
                              <option value="property">Eindom</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="newannonce-form-group">
                            <Form.Label>Sub Kategori</Form.Label>
                            <Form.Select>
                              <option>Elbil</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="newannonce-form-group">
                            <Form.Label>Images</Form.Label>
                            <Form.Control type="file" accept="image/*" multiple required onChange={onImageChange}></Form.Control>
                        </Form.Group>
                        <div className="review-product-images-small-div newannonce-form-group">
                          <ul className="images-small-ul" style={{listStyleType: 'none', margin: 0, padding: 0}}>
                          
                          {imageArray.map((item,index) => {
                            // console.log(item)
                            return(
                              <li style={{margin: 0}} className="images-small-li mb-3"
                                key={index}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)} 
                                onDragEnd={drop} 
                                draggable>
                                  <div className="images-li-div-small">
                                      <p>{index+1}.</p>
                                      <div className="images-li-image-control border border-dark rounded">
                                          <span className="image-control-drag-item"><i className="fa-solid fa-grip-vertical fa-xl"/></span>
                                          <img key={item.name} className="image-span-img me-3 ms-3 border" src={item.data} alt='product-item'/>
                                          <Form.Control type='text'value={item.description} placeholder={item.name} onChange={(e) => handleImageDescription(e, index, item.name, item.data)}></Form.Control>
                                          <DeleteIcon color="inherit" className="ms-3 image-control-delete-item" onClick={(e) => handleImageDelete(e,item.name)}/>
                                      </div>
                                  </div>
                              </li>
                            )
                          })}
                          </ul>
                        </div>
                        <Form.Group className="newannonce-form-group">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="newannonce-form-group">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" id='description' onChange={handlePropertyChange} required></Form.Control>
                        </Form.Group>
                        <Form.Group className="newannonce-form-group" onChange={handlePropertyChange}>
                            <Form.Label>Addresse</Form.Label>
                            <Form.Control type="text" id="address" required></Form.Control>
                        </Form.Group>
                        <Form.Group className="newannonce-form-group">
                          <Row className="d-flex align-items-end">
                              <Col>
                                <Form.Label>Postnummer</Form.Label>
                                <Form.Control type="text" id="postnumber" onChange={handlePropertyChange} required></Form.Control>
                              </Col>
                              <Col className="d-flex justify-content-center">
                                <p>{postAddress}</p>
                              </Col>
                          </Row>
                        </Form.Group>
                        <Button type="submit">Publish</Button>
                    </Form>
              </Col>
              <Col lg={8} md={6} className="newannonce-col preview-column">
                        <div className="preview-column-content">
                            <Carousel className="preview-carousel mb-3">
                                    {imageArray.map((item, index) => {
                                      return(
                                        <Carousel.Item key={index}>
                                              <img src={item.data} alt="product-image" className="preview-carousel-image"/>
                                              <Carousel.Caption>
                                                  <p>{item.description}</p>
                                              </Carousel.Caption>
                                        </Carousel.Item>
                                      )
                                    })}
                              </Carousel>
                              <div className="d-flex align-items-center">
                                  <p className="preview-content-heading me-2">{annoncePropertyObject["price"]} kr</p>
                                  <p>{annoncePropertyObject["price-period"]}</p>
                              </div>
                              <p className="preview-product-title mb-4">{annoncePropertyObject["title"] || "Your title here"}</p>
                              <p className="preview-content-heading">Beskrivelse</p>
                              <p style={{textAlign: 'justify'}}>{annoncePropertyObject["description"] || "Your description here"}</p>
                              <p className="preview-content-heading"> Nokkelinfo</p>
                              <p>Model year: 2019</p>
                              <p>Color: Blue</p>
                              <p className="preview-content-heading">Addresse</p>
                              <p>Nygata 6</p>
                        </div>
              </Col>
          </Row>

      </div>
    );
  }


export default NewAnnonce;
