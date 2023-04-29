import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NewAnnonce.css";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import TextareaAutosize from 'react-textarea-autosize';

import { getCroppedImage } from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURltoFile";
import { instanceAxs } from "../../config/api";
import { useFindCommuneByPostnumber } from "../../features/appDataSliceActions";
import data from  '../../categories.json';
import { fetchUser } from "../../features/userSliceActions";
import { uiSliceActions } from "../../features/uiSlice";
import { useLocation, useNavigate } from "react-router-dom";

const NewAnnonce = () => {
  const loggedIn = useSelector(state => state.user.isLoggedIn);
  const communeFinder = useFindCommuneByPostnumber();
  
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const [rerender, setRerender] = useState(false) //dummy state to use force update on imageArray when image description added
  const [isPublishing, setIsPublishing] = useState(false);
  const [isModifyAnnonce, setIsModifyAnnonce] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [specPropTitle, setSpecPropTitle] = useState('');
  const [specPropVal, setSpecPropVal] = useState('');
  const [specPropArray, setSpecPropArray] = useState([]); 
  const [postAddress, setPostAddress] = useState('Ugyldig postnummer');
  const [postNumber, setPostNumber] = useState('')
  const [selectedMainCat, setSelectedMainCat] = useState('')
  const [annoncePropertyObject, setAnnoncePropertyObject] = useState({
    title: '', price: '', pricePeriod: '', category: '', subCategory: '', description: '', status: '', postnumber: '', location: ''
  })

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
  if(itemKey === "category") {
    value = JSON.parse(value)
    setSelectedMainCat(value);
    value = value.maincategory;
  } else if(itemKey === 'status') {
    var specArray = specPropArray;
    var matchedObj = specArray.find(item => item.title === "Status") || {}
    let index = specArray.indexOf(matchedObj);
    matchedObj= {title: "Status", value}
    specArray.splice(index, 1, matchedObj);
    setSpecPropArray(specArray)
  } else if(itemKey === 'postnumber'){
    setPostNumber(value)
  }
  setAnnoncePropertyObject(prevState => ({
    ...prevState, [itemKey]: value
  }))
}

const handleImageDelete = (e,imagename) => {
  e.preventDefault()
  let imgArr = imageArray;
  imgArr = imgArr.filter(img => img.name !== imagename);
  setImageArray(imgArr)
}   

const handleImageDescription = (e,item) => {
  var copyImageArray = imageArray;
  var copyItem = item;

  let index = copyImageArray.indexOf(item);

  if(index !== -1) {
    copyItem.description = e.target.value;
    copyImageArray[index] = copyItem;
    setImageArray(!rerender);
    setRerender(!rerender)
    setImageArray(copyImageArray);  
  }
}

const insertSpecialProp = () => {
  let title = specPropTitle;
  let value = specPropVal;
  if(title === '' || value === '') return;

  title = title.charAt(0).toUpperCase() + title.slice(1);
  var specArray = specPropArray;
  let matchedObj= specArray.find((item, index) => {
    if(item.title === title) {
      specArray[index] = {title, value};
      return true;
    }
    return null;
  });

  if(matchedObj) {
    setSpecPropArray(specArray)
  } else {
    let specObj = {title, value};
    setSpecPropArray(prevState => [...prevState, specObj])
  }
  setShowBackdrop(false)
}
const removeSpecialProp = (title) => {
  var copyItems = specPropArray;
  copyItems = copyItems.filter(item => item.title !== title);
  setSpecPropArray(copyItems)
}

const submitAnnonce = async (event) => {
  event.preventDefault();

  setIsPublishing(true)
  const specialProps = [];
  var annonceProperties = annoncePropertyObject;
  specPropArray.forEach(item => {
    if(item.title !== 'Status'){
      specialProps.push(item)
    }
  })
  annonceProperties["specialProperties"] = specialProps;

  if(isModifyAnnonce) {
    try {
      const formData = await convertImagesToFormData();
      const annonceId = annoncePropertyObject["_id"];
      const annonceproperties = annonceProperties;

      const res = await instanceAxs.post('/newannonce/update', {formData, annonceId, annonceproperties})
      console.log(res);

    } catch (error) {
        console.log(error)
    }
  } else {
    setTimeout(async () => {
      const formData = await convertImagesToFormData();
      await uploadImagesToServer(formData, annonceProperties, uploadAnnonceToServer);
    }, 2000);
  }
}

 const onImageChange = async (event) => {
  if(!event.target.files) return;   //target.files seçilen dosyaları döner

  // Array.from() target.files'ı iterable bir array'e dönüştürür
   Array.from(event.target.files).forEach(file => { 
      var reader = new FileReader();  //Yüklenen resmin datasını oku.
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => { 
      setImageArray(prevState => 
        [...prevState, 
          {name: file.name, data: reader.result, description: '' }
        ])
      })
    })
};

 const convertImagesToFormData =  async () => {
  var formData = new FormData();
  const imgArr = imageArray
  console.log(imgArr)
  for (const image of imgArr) {   //await kullanımı için for...of döngüsü
    const canvas = await getCroppedImage(image.data);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrltoFile = dataURLtoFile(canvasDataUrl, image.name);

    formData.append("annonceImages", convertedUrltoFile);
  }
  return formData;
 }

 const uploadImagesToServer =  async (formData, annonceProps, cb) => {
  await instanceAxs.post('/newannonce/imageupload', formData).then(result => {
      if (result.status === 200) {
        let annonceId = result.data.annonceId;
        let copyImages = imageArray;
        let returnedImages = result.data.files;
        let finalAnnonceImages = []

        for(let i = 0; i<copyImages.length; i++) {
          let item = copyImages[i];
          returnedImages.forEach(el => {
            if(el.originalname === item.name) {
              item.location = el.location;
              finalAnnonceImages.push(item)
            }
          })
        }
        cb(annonceProps, finalAnnonceImages, annonceId)
      }
    })
    .catch( err => console.log(err) );
 }

 const uploadAnnonceToServer =  async (anProp, imageLoc, anId) => {
  let annonce = {
    annonceproperties: anProp, 
    imagelocations: imageLoc,
    annonceid: anId
  } 
  console.log('annonce obj', annonce)
  await instanceAxs.post('/newannonce/create', annonce).then(result => {
    console.log(result)
    if(result.status === 200) {
      dispatch(uiSliceActions.setFeedbackBanner({severity: 'success', msg: 'Annonsen ble publisert'}));
      setIsPublishing(false);
      dispatch(fetchUser());
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      dispatch(uiSliceActions.setFeedbackBanner({severity: 'error', msg: 'Annonsen kunne ikke publiseres'}));
      setIsPublishing(false);
    }
  })
  .catch( err => console.log(err) );
 }

 useEffect(() => { 
  var postnum = annoncePropertyObject["postnumber"];
  postnum = (postnum !== '' && postnum !== undefined) ? postnum : 0;  

  fetch(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${postnum}&country=no&username=goksoft`, 
  {method: 'GET'})
  .then(response => response.json())
  .then(data => {
      var annonceObj = annoncePropertyObject;
      const placeName = data.postalcodes[0];
      const postalcode = placeName ? placeName.adminCode2 : 0;
      const placeProperties = communeFinder(postalcode);

      if(placeProperties) {
        annonceObj["fylke"] = placeProperties.fylkesNavn;
        annonceObj["kommune"] = placeProperties.kommuneNavn;
        annonceObj["location"] = placeName.placeName;
        setAnnoncePropertyObject(annonceObj)
      }
      setPostAddress(placeName ? placeName.placeName : 'Ugyldig postnummer');
  })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [postNumber])

  useEffect(() => {
    const routerState = routerLocation.state;
    console.log(routerState)
    if(routerState) {
      let stateAnnonce = routerState.annonce;
      let foundCategory = data.categories.find(item => item.maincategory === stateAnnonce.category)
      setIsModifyAnnonce(true);
      setAnnoncePropertyObject(routerLocation.state.annonce)
      setSpecPropArray(routerLocation.state.annonce.specialProperties);
      setImageArray(routerLocation.state.annonce.annonceImages);
      setSelectedMainCat(foundCategory)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    return (
      <div className="newannonce-container">
            {!loggedIn ? 
                <Modal show={true}>
                    <Modal.Header>
                        <Modal.Title>Du må logge inn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Du må logge inn for å lage ut annonse</p>
                        <a href="/login">
                            <Button variant="danger">Logg inn</Button>
                        </a>
                    </Modal.Body>
                </Modal>
              :
              <Row style={{margin: 0}}>
                <Col className="newannonce-col input-col border" lg={4}md={6}>
                      <Form onSubmit={submitAnnonce}>

                          <Form.Group className="newannonce-form-group">
                              <Form.Label>Tittel</Form.Label>
                              <Form.Control type="text" id='title' name="title" value={annoncePropertyObject["title"]} required 
                                  onChange={handlePropertyChange}  disabled={isPublishing}>
                              </Form.Control>
                          </Form.Group>

                          <Form.Group className="newannonce-form-group">
                              <Form.Label>Pris</Form.Label>
                              <div className="d-flex align-items-center">
                                  <Form.Control type="number" id="price" className="me-3" value={annoncePropertyObject["price"]} required 
                                      onChange={handlePropertyChange}  disabled={isPublishing}
                                  />
                                  <p className="me-3">kr</p>
                                  <Form.Select className="w-50" id="pricePeriod" value={annoncePropertyObject["pricePeriod"]} onChange={handlePropertyChange}required>
                                      <option value="">Pris period</option>
                                      <option value="totalt">Totalt</option>
                                      <option value="per dag">Per dag</option>
                                      <option value="per uke">Per uke</option>
                                      <option value="per måned">Per måned</option>
                                  </Form.Select>
                              </div>
                          </Form.Group>

                          <Form.Group className="newannonce-form-group" onChange={handlePropertyChange}>
                              <Form.Label>Hoved Kategori</Form.Label>
                              <Form.Select id="category" required value={JSON.stringify(selectedMainCat)}
                                  onChange={handlePropertyChange} disabled={isPublishing}>
                                    <option value={JSON.stringify('')}>Velg en hovedkategori</option>
                                      {
                                        data.categories.map((item,index) => {
                                          return(
                                            <option value={JSON.stringify(item)} key={index}>{item.maincategory}</option>
                                          )
                                        })
                                      }
                              </Form.Select>
                          </Form.Group>

                          {selectedMainCat !== '' && 
                              <Form.Group className="newannonce-form-group">
                                  <Form.Label>Under Kategori</Form.Label>
                                  <Form.Select id="subCategory" required value={annoncePropertyObject["subCategory"]}
                                      onChange={handlePropertyChange} disabled={isPublishing}>
                                        <option value={JSON.stringify('')}>Velg en under kategori</option>
                                        {selectedMainCat.subcategories.map(item => {
                                          return(
                                            <option value={item} key={item}>{item}</option>
                                          )
                                        })
                                        }
                                  </Form.Select>
                              </Form.Group>
                          }

                          <Form.Group className="newannonce-form-group">
                              <Form.Label>Bilder</Form.Label>
                              <Form.Control type="file" accept="image/*" multiple 
                                  onChange={onImageChange}disabled={isPublishing}
                              />
                          </Form.Group>

                          <div className="review-product-images-small-div newannonce-form-group">
                              <ul className="images-small-ul" style={{listStyleType: 'none', padding: 0}}>
                                  {typeof imageArray !== 'boolean' && imageArray.map((item,index) => {
                                      return(
                                          <li  className="images-small-li mb-3" key={index} draggable
                                            onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop} 
                                            >
                                                <div className="images-li-div-small">
                                                      <p>{index+1}.</p>
                                                      <div className="images-li-image-control border">
                                                              <span className="image-control-drag-item">
                                                                  <i className="fa-solid fa-grip-vertical "/>
                                                              </span>
                                                              <img key={item.name} className="image-span-img me-3 ms-3 border" 
                                                                  src={item.data} alt='product-item'
                                                              />
                                                              <Form.Control type='text' value={imageArray[index].description} 
                                                                  placeholder={item.name} onChange={e => handleImageDescription(e,item)}
                                                              />
                                                              <DeleteIcon color="error" className="ms-3 image-control-delete-item" 
                                                                  onClick={(e) => handleImageDelete(e,item.name)}
                                                              />
                                                      </div>
                                                </div>
                                          </li>
                                      )
                                  })}
                              </ul>
                          </div>

                          <Form.Group className="newannonce-form-group">
                              <Form.Label>Produkt Beskrivelse</Form.Label>
                              <Form.Control as="textarea" name="productDescription" 
                                    id='description' value={annoncePropertyObject["description"]} rows={6}
                                    onChange={handlePropertyChange} disabled={isPublishing} required
                              />
                          </Form.Group>

                          <Form.Group className="newannonce-form-group">
                              <Form.Label>Status</Form.Label>
                              <Form.Check 
                                  type="radio" value="nytt" name="status" checked={annoncePropertyObject["status"] === 'nytt'}
                                  id="status" label="Nytt" onChange={handlePropertyChange} disabled={isPublishing}
                                />
                                <Form.Check 
                                  type="radio" value="brukt" name="status" checked={annoncePropertyObject["status"] === 'brukt'}
                                  id="status" label="Brukt" onChange={handlePropertyChange} disabled={isPublishing}
                                />
                          </Form.Group>

                          <Form.Group className="newannonce-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                              <Form.Label>Nokkelinfo</Form.Label>
                              <Button variant="outline-success" type='button' onClick={() => setShowBackdrop(true)} disabled={isPublishing}><i className="fa-solid fa-plus mx-2"/> Legg til ny nokkelinfo</Button>
                              <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                  open={showBackdrop}
                                                  >
                                      <div className="backdrop-model-div">
                                              <FloatingLabel
                                                    label="Overskrift"
                                                    className="mb-3"
                                                    style={{color: 'black'}}
                                                  >
                                                    <Form.Control type="text" id="title" name='tit' placeholder="name@example.com" onChange={e => setSpecPropTitle(e.target.value)}/>
                                                </FloatingLabel>
                                                <FloatingLabel
                                                    label="Input"
                                                    className="mb-3"
                                                    style={{color: 'black'}}
                                                  >
                                                    <Form.Control type="text" id="value" name="val" placeholder="name@example.com" onChange={e => setSpecPropVal(e.target.value)}/>
                                                </FloatingLabel>
                                                <Button variant="outline-success" type='button' className="w-100 mt-5" onClick={insertSpecialProp}><i className="fa-solid fa-plus mx-2"/>Legg til nokkelinfo</Button>
                                                <Button variant="outline-primary" type='button' className="mt-2" onClick={() => setShowBackdrop(false)}>Lukk</Button>
                                      </div>
                              </Backdrop>
                          </Form.Group>

                          <Form.Group className="newannonce-form-group">
                            <Row className="d-flex align-items-end">
                                <Col>
                                    <Form.Label>Addresse</Form.Label>
                                    <Form.Control type="text" id="postnumber" placeholder="Postnummer" value={annoncePropertyObject["postnumber"]}
                                      required onChange={handlePropertyChange} disabled={isPublishing}
                                    />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                  <p>{annoncePropertyObject["location"] === '' ? postAddress : annoncePropertyObject["location"]}</p>
                                </Col>
                            </Row>
                          </Form.Group>

                          {
                            isModifyAnnonce ? 
                              <>
                                {!isPublishing ?
                                    <>
                                        <Button variant="primary" type="submit" className="me-3 create-annonce-control-button">
                                            Lagre
                                        </Button>
                                        <Button variant="outline-primary" type="button" className="create-annonce-control-button">
                                            Avbryt
                                          </Button>   
                                    </>                          
                                  :
                                  <>
                                      <Button variant="primary" type="button" className="me-3 create-annonce-control-button" disabled>
                                          <Spinner size="sm" className="me-2"/> Lagrer...
                                      </Button>
                                      <Button variant="outline-primary" type="button" className="create-annonce-control-button">
                                            Avbryt
                                      </Button>   
                                  </>
                              }

                              </>
                            :
                              <>
                                  {!isPublishing ? 
                                    <Button type="submit" className="mb-3" style={{width: '100px'}}>
                                        Publiser
                                    </Button>
                                    : 
                                    <Button type="button" className="mb-3" disabled>
                                       <Spinner size="sm" className="me-2"/> Publiserer...
                                    </Button>
                                  }
                              </>
                          }

                      </Form>
                </Col>

                <Col lg={8} md={6} className="newannonce-col preview-column">
                      <div className="preview-column-content">

                          {selectedMainCat !== '' && 
                              <Breadcrumb className="mt-3">
                                  <Breadcrumb.Item active>Kategori</Breadcrumb.Item>
                                  <Breadcrumb.Item href="#">{selectedMainCat.maincategory}</Breadcrumb.Item>
                                  <Breadcrumb.Item>{annoncePropertyObject["subCategory"]}</Breadcrumb.Item>
                              </Breadcrumb>
                            }

                            <Carousel className="preview-carousel mb-3" interval={null} variant="dark">
                                  {imageArray.map((item, index) => {
                                      return(
                                          <Carousel.Item key={index}>
                                                <img src={item.data || item.location} alt="pro-make" className="preview-carousel-image"/>
                                                <Carousel.Caption className="preview-carousel-caption">
                                                    <p className="carousel-image-text mb-4">{item.description}</p>
                                                </Carousel.Caption>
                                          </Carousel.Item>
                                      )
                                  })}
                            </Carousel>

                            <div className="preview-content-box d-flex align-items-center">
                                {annoncePropertyObject["price"] && 
                                      <>
                                        <p className="me-2" style={{fontSize: '20px'}}>{annoncePropertyObject["price"]} kr</p>
                                        <p> - {annoncePropertyObject["pricePeriod"]}</p>   
                                      </>                   
                                }
                            </div>

                            <p className="preview-product-title mb-5">{annoncePropertyObject["title"]}</p>

                            <div className="preview-content-box">
                                <p className="preview-content-heading">Beskrivelse</p>
                                <TextareaAutosize className="preview-product-desc" value={annoncePropertyObject["description"]} disabled/>
                            </div>

                            <div className="preview-content-box">
                                    <p className="preview-content-heading mb-3"> Nøkkelinfo</p>
                                    <div className="special-properties-container">
                                        {specPropArray.length > 0 && specPropArray.map((item, index) => {
                                              return(
                                                <div key={index} className="spec-prop-item border">

                                                  <div key={index}className="spec-prop-box">
                                                      <p className="special-props-title">{item.title}</p>
                                                      <p className="special-props-value">{item.value}</p>
                                                  </div>
                                                  <Button type='button' variant="danger" className="special-prop-remove-btn w-75" onClick={() => removeSpecialProp(item.title)}>Fjern</Button>

                                                  </div>
                                              )
                                        })}
                                    </div>
                            </div>

                            <div className="preview-content-box mb-3">
                                    <p className="preview-content-heading mb-2">Addresse</p>
                                    <p>{postNumber}</p>
                                    <p>{postAddress === 'Ugyldig postnummer' ? '' : postAddress}</p>
                            </div>

                      </div>
                </Col>

              </Row>
          }
      </div>
    );
  }


export default NewAnnonce;
