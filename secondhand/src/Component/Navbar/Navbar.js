import React, { useState } from "react";
import "./Navbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../features/userSliceActions";
import Avatar from '@mui/material/Avatar';
import Searchbar from "./Searchbar";

const Navigation = () => {
  const [currentY, setCurrentY] = useState(0);
  const [isRender, setIsRender] = useState(true);
  // const [searchInput, setSearchInput] = useState('a');
  const [show, setShow] = useState(false);

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const user = useSelector(state => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //########## FUNCTIONS ##########

  const showDropdown = (e)=>{
      setShow(!show);
  }

  const hideDropdown = e => {
      setShow(false);
  }

/*   const checkCharacters = async () => {
      let input = searchInput.trim().replace(/\s/g, "+");
      setSearchInput(input) 
  } */

  const scroll = () => {
    if (window.scrollY > currentY) {
      setIsRender(false)
    } else {
      setIsRender(true)
    }
    setCurrentY( window.scrollY );
  }

  const logout = () => {
    dispatch(logoutRequest())
  }

  const navigateToProfile = () => {
    navigate('/profil')
  }

    window.addEventListener("scroll", scroll);
    return (
      <div>
        {isRender &&
          <Navbar bg="light" expand="lg" fixed="top" className="navigation">
            <Container>
                <Navbar.Brand href="/" className="">Finn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />   
                <Navbar.Collapse id="basic-navbar-nav" style={{margin: 10}}>       

                    <Searchbar></Searchbar>
                    
                    {isLoggedIn ? 
                        <Nav className="d-flex align-items-center flex-grow-1 justify-content-end navbar-username">
                            <Avatar className="navbar-avatar" alt='pp' src={user.profilePicture} sx={{width: 32, height: 32, marginRight: 1}}></Avatar>
                            <NavDropdown title={user.email} menuVariant='success' onClick={navigateToProfile} show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                                <NavDropdown.Item href='/profile'>Profil</NavDropdown.Item>
                                <NavDropdown.Item href='/nyannonse'>Ny Annonse</NavDropdown.Item>
                                <NavDropdown.Item href='/meldinger'>Meldinger</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                          </Nav>
                          :
                          <Nav className="flex-grow-1 justify-content-end">
                              <Nav.Link href='/login'>Logg Inn</Nav.Link>
                              <Nav.Link href='/register'>Register</Nav.Link>
                          </Nav>
                      }
              </Navbar.Collapse>
            </Container>
        </Navbar>
        }
      </div>
    );
  
}

export default Navigation; 
