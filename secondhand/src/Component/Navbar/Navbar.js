import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../features/userSliceActions";
import Avatar from '@mui/material/Avatar';
import Searchbar from "./Searchbar";

const Navigation = () => {
  const [currentY, setCurrentY] = useState(0);
  const [isRender, setIsRender] = useState(true);
  // const [searchInput, setSearchInput] = useState('a');

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const userObject = useSelector(state => state.user.user);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  //########## FUNCTIONS ##########

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

  useEffect(() => {
    setUser(userObject)
  }, [userObject])

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
                            <DropdownButton id="dropdown-basic-button" title={user.username || user.email || ''} variant="light">
                                <Dropdown.Item href="min-konto">Min Konto</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item href="/nyannonse">Ny Annonse</Dropdown.Item>
                                <Dropdown.Item href="/profil">Min Profil</Dropdown.Item>
                                <Dropdown.Item href="#">Meldinger</Dropdown.Item>
                                <Dropdown.Item href="/mine-annonser">Mine Annonser</Dropdown.Item>
                                <Dropdown.Item href="/favoritter">Favoritter</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={logout}>Logg Ut</Dropdown.Item>
                            </DropdownButton>
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
