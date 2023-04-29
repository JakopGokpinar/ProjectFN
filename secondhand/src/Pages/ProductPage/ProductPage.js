import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import TextareaAutosize from 'react-textarea-autosize';

import { instanceAxs } from "../../config/api.js";
import './ProductPage.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Avatar from '@mui/material/Avatar';
import Spinner from "react-bootstrap/Spinner";

import { useDispatch } from "react-redux";
import { uiSliceActions } from "../../features/uiSlice.js";
import { addToFavorites, removeFromFavorites } from "../../features/userSliceActions.js";

function ProductPage() {

    let { annonceId } = useParams();

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [annonce, setAnnonce] = useState('');
    const [seller, setSeller] = useState({username: '', userDate: '', profilepicture: ''})
    const [isLoading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const findProduct = useCallback( async () => {
        console.log(annonceId)
        await instanceAxs.get(`/product?id=${annonceId}`)
            .then(respond => {
                console.log(respond)
                if (respond.status !== 200) {
                    setLoading(false)
                    return;
                }
                let owner = respond.data.seller;
                let date = new Date(owner.userDate);

                setAnnonce(respond.data.product);
                setSeller({username: owner.username, userDate: date.getFullYear(), profilepicture: owner.userProfilePicture})
                setLoading(false)
            })   
            .catch(err => {
                console.log(err);
            })   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleAddToFavorites = () => {
        setShowSpinner(true)
        setTimeout(() => {
          dispatch(addToFavorites(annonceId))
          setShowSpinner(false)
        }, 1000)
      }
    
      const handleRemoveFromFavorites = () => {
        setShowSpinner(true)
        setTimeout(() => {
          dispatch(removeFromFavorites(annonceId))
          setShowSpinner(false)
        }, 1000)
      }

    const showTheModal = () => {
        setShowShareModal(true)
      }
      const closeShareModal = () => {
        setShowShareModal(false)
      }
    
      const copyAnnonceLink = (event) => {
        event.preventDefault();
        let text = `http://localhost:3000/produkt/${annonceId}`;
        navigator.clipboard.writeText(text)
        dispatch(uiSliceActions.setFeedbackBanner({severity: 'success', msg: 'Annons lenken ble kopiert'}));
        setShowShareModal(false)
      }

    useEffect(() => {
        findProduct();
        //eslint-disable-next-line
    }, [isLoading])

    useEffect(() => {
        findProduct();
    }, [findProduct])

    return(
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            { annonce !== '' ?
                <Container className="productPage">
                    <Row className="product-page-row">
                        <Col className="product-content-col">
                            <div className="content-col-div">

                            <Breadcrumb className="mt-2">
                                  <Breadcrumb.Item active>Kategori</Breadcrumb.Item>
                                  <Breadcrumb.Item href={`/search?category=${annonce.category}`}>{annonce.category}</Breadcrumb.Item>
                                  <Breadcrumb.Item>{annonce.subCategory}</Breadcrumb.Item>
                              </Breadcrumb>
                                    <Carousel variant="dark" className="annonce-carousel bg-light mb-4" slide="false">
                                        {annonce.annonceImages.map((item, index) => {
                                            return(
                                                <Carousel.Item key={index}>
                                                <img src={item.location} alt="item img" className="annonce-image"/>            
                                                <Carousel.Caption className="annonce-image-caption">
                                                    <p className="annonce-image-caption__text mb-4">{item.description}</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                            )
                                        })}
                                    </Carousel>

                                    <div className="price-and-controlbuttons mb-3">
                                        <div className="d-flex align-items-center me-3">
                                            <p className="me-2" style={{fontSize: '20px'}}>{annonce.price} kr</p>
                                            <p> - {annonce.pricePeriod}</p>  
                                        </div>
                                        {annonce.isFavorite ? 
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove from Favorites</Tooltip>}>
                                                <Button variant="danger" onClick={handleRemoveFromFavorites}>
                                                {showSpinner ? <Spinner size='sm'/> : <><i className="fa-solid fa-heart me-2"/> Fjern fra Favoritter </>}
                                                </Button>
                                            </OverlayTrigger>
                                        :
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Add to Favorites</Tooltip>}>
                                                <Button variant="outline-danger" onClick={handleAddToFavorites} size='sm'>
                                                {showSpinner ? <Spinner size='sm'/> : <><i className="fa-solid fa-heart me-2"/> Legg til Favoritter</>}
                                                </Button>
                                        </OverlayTrigger>
                                        }

                                        <Button variant="outline-secondary" className="ms-3" onClick={showTheModal} size="sm">
                                            <i className="fa-solid fa-arrow-up-from-bracket me-2"/> Del
                                        </Button>

                                        <Modal show={showShareModal} onHide={closeShareModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Del annonsen</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>Vil du dele denne annonsen?</p>
                                                <Form.Control type="text" className="mb-3" value={`http://localhost:3000/produkt/${annonceId}`} disabled/>
                                                <Button type='button' variant="outline-primary" className="mb-2" onClick={copyAnnonceLink}>
                                                    Kopier Lenken
                                                </Button>
                                            </Modal.Body>
                                        </Modal>
                                    </div>

                                    <p className="annonce-product-title mb-5">BMW X5</p>

                                    <div className="annonce-content-box">
                                        <p className="annonce-content-heading">Description</p>
                                        <TextareaAutosize className="annonce-product-desc" value={annonce.description} disabled/>
                                    </div>

                                    <div className="annonce-content-box">
                                            <p className="annonce-content-heading mb-2">Nokkelinfo</p>
                                            <div className="annonce-special-props-div">
                                                <div className="special-props-box border">
                                                    <p className="special-prop-title">Status</p>
                                                    <p>{annonce.status && annonce.status}</p>
                                                </div>
                                                {annonce.specialProperties.map((item, index) => {
                                                    return(
                                                        <div key={index} className="special-props-box border">
                                                            <p className="special-prop-title">{item.title}</p>
                                                            <p>{item.value}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                    </div>

                                    <div className="annonce-content-box">
                                            <p className="annonce-content-heading mb-2">Addresse</p>
                                            <p>{annonce.postnumber}</p>
                                            <p>{annonce.location}</p>
                                    </div>

                            </div>
                        </Col>
                        <Col lg={4} className='productPage-seller-col'>
                                <div className="seller-panel">
                                        <Avatar className="seller-avatar" src={seller.profilepicture} alt='avatar'sx={{width: '128px', height: '128px'}}/>
                                        <div className="seller-information">
                                            <p className="seller-username">{seller.username}</p>
                                            <p className="seller-subinfo mb-5">Bruker siden {seller.userDate}</p>
                                            <p className="seller-lastactive mt-4 mb-2">Last active 23 min ago</p>
                                            <Button variant="primary"><i className="fa-solid fa-envelope me-2"/> Send Melding</Button>
                                        </div>
                                </div>
                        </Col>
                    </Row>
                </Container>
                :
                <h4 className="m-5">Beklager, annonsen kunne ikke finnes</h4>
            }
        </div>
    )
}

export default ProductPage;