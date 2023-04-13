import React, { useEffect, useState } from 'react'
import './Footer.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { matchRoutes, useLocation } from "react-router-dom"

const Footer = () => {

  const [isRender, setIsRender] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if(location.pathname === '/nyannonse') {
      setIsRender(false)
    }
  }, [])

  return (
    <div>
      {isRender && 
              <div className='footer-container bg-light'>
              <Row className='footer-row'>
                  <Col className='footer-col footer-brand-and-logo'lg={4} md={4} sm={12}>
                      <p className='footer-heading'>Project Fn</p>
                  </Col>
                  <Col  className='footer-col footer-quicklinks'lg={4} md={4} sm={12}>
                      <p className='footer-heading'> Quick Links</p>
                      <div className='footer-content'>
                      <a href='#'>Privacy Policy</a>
                      <a href='#'>About Us</a>
                      </div>
                  </Col>
                  <Col className='footer-col footer-useractions'lg={4} md={4} sm={12}>
                      <p className='footer-heading'>User Actions</p>
                      <div className='footer-content'>
                        <a href='/profil'>Min Profil</a>
                          <a href='/nyannonse'>Ny Annonse</a>
                          <a href='#'>Meldinger</a>
                          <a href='/mine-annonser'>Mine Annonser</a>
                          <a href='/favoritter'>Favoritter</a>
                      </div>
                  </Col>
              </Row>
              <Row className='footer-row bg-dark'>
                  <div className='footer-lower'>
                  <p style={{margin: 0}}>© 2023 GokSoft Technologies - All Rights Reserved</p>
        
                  </div>
              </Row>
            </div>
      }
    </div>
  )
}

export default Footer;
