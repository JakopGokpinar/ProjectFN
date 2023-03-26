import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { instanceAxs } from "../../config/api.js";
import './ProductPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Avatar from '@mui/material/Avatar'

function ProductPage() {

    let { annonceId } = useParams();
    const [annonce, setAnnonce] = useState('');
    const [isLoading, setLoading] = useState(true)

    const findProduct = async () => {
        await instanceAxs.get(`/product?id=${annonceId}`)
            .then(respond => {
                if (respond.data.message === 'An error occured while finding the product') {
                    return console.log(respond.data.message);
                }
                
                setAnnonce(respond.data.product);
                setLoading(false)
            })   
            .catch(err => {
                console.log(err);
            })   
    }

    useEffect(() => {
        findProduct();
        //eslint-disable-next-line
    }, [isLoading])

    return(
        <div>
            { annonce !== '' &&
                <Container >
                    <Row className="productPage-row">
                        <Col className="productPage-content-col">
                            <div className="productPage-content-div">
                                    <Carousel className="image-carousel content-component mb-3" slide="false">
                                        <Carousel.Item>
                                            <img 
                                                src="https://images.finncdn.no/dynamic/1600w/2023/3/vertical-0/13/1/294/694/321_2796740.jpg"
                                                alt="first slide"
                                                className="annonce-image"/>
                                                
                                            <Carousel.Caption>
                                                <p>first slide</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img 
                                                src="https://images.finncdn.no/dynamic/1280w/2023/3/vertical-0/14/0/294/896/230_721791559.jpg"
                                                alt="first slide"
                                                className="annonce-image"/>
                                                
                                            <Carousel.Caption>
                                                <p>second slide</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                    <div className="price-and-controlbuttons content-component mb-3">
                                        <p className="tittel-component" style={{margin: 0}}>1000 kr</p>

                                        <Button variant="outline-danger"><i className="fa-solid fa-heart me-2"></i> Legg til Favoritt</Button>
                                        <Button variant="outline-secondary"><i className="fa-solid fa-arrow-up-from-bracket me-2"></i> Del</Button>
                                    </div>
                                    <h4 className="content-component mb-4">BMW X5</h4>
                                    <div className="content-description content-component">
                                        <p className="content-heading">Description</p>
                                        <p>Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise. No finished my an likewise cheerful packages we. For assurance concluded son something depending discourse see led collected. Packages oh no denoting my advanced humoured. Pressed be so thought natural.</p>
                                    </div>
                                    <div className="content-special-props content-component">
                                            <p className="content-heading">Nokkelinfo</p>
                                            <p>year : 2019</p>
                                    </div>
                                    <div className="content-special-props content-component">
                                            <p className="content-heading">Addresse</p>
                                            <p>Hardangervegen 16</p>
                                    </div>
                            </div>
                        </Col>
                        <Col lg={4} className='productPage-seller-col'>
                                <div className="seller-panel">
                                        <Avatar className="seller-avatar" src={""} alt='avatar'sx={{width: '128px', height: '128px'}}/>
                                        <div className="seller-information">
                                            <p className="seller-username">Paul Martinez</p>
                                            <p className="seller-subinfo mb-5">Bruker siden 2019</p>
                                            <p className="seller-lastactive mt-4 mb-2">Last active 23 min ago</p>
                                            <Button variant="primary"><i className="fa-solid fa-envelope me-2"/> Send Melding</Button>
                                        </div>
                                </div>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default ProductPage;