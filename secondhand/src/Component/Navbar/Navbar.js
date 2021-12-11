import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/logo.svg';
import './Navbar.css';
//import axios from 'axios';
import { connect } from 'react-redux';

class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentY: 0,
            isRender: true,
            isLoggedIn: false,
            username: ''
        }
        this.scroll = this.scroll.bind(this);
    }

    getLogin = () => {
        const isLoggedIn = this.props.isLoggedIn;
        this.setState({
            isLoggedIn: isLoggedIn
        })
        if(isLoggedIn){
            const username = this.props.username;
            this.setState({ 
                username
            })
        }
    }

    scroll(){
        if(window.scrollY > this.state.currentY){
            this.setState({ isRender: false});
        } else{
            this.setState({ isRender: true});
        }
        this.setState({ currentY: window.scrollY});
    }

    render(){
        window.addEventListener("scroll",this.scroll);
        return(
            <div>
                {this.state.isRender &&
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="/">Finn</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="form-group w-75 me-auto mx-auto ">
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search any product..." aria-label="Search"/>
                                        <button className="btn btn-outline-primary" type="submit">Search</button>
                                    </form>
                            </div>
                            <div className="dropdown" id="profileToggleDiv">
                                <Link className="nav-link dropdown-toggle" to="/profile" id="profileToggleButton" role="button"  aria-expanded="false">
                                    <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top"/>                                
                                    Profile
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {this.props.isLoggedIn && <li><a className="dropdown-item" href="/">{this.props.username}</a></li>}
                                    <li><Link to="/login" className="dropdown-item">Login</Link></li>
                                    <li><Link to="/register" className="dropdown-item">Register</Link></li>
                                    <li><Link to="/profil" className="dropdown-item">Favorites</Link></li>
                                    <li><Link to="/nyannonse" className="dropdown-item">Ny Annonse</Link></li>
                                </ul>           
                            </div>
                        </div>
                    </div>
                </nav>}
                {/*{this.state.isRender &&
                <nav class="navbar navbar-expand-lg navbar-light second-nav fixed-top">
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-lg-0 w-100 d-flex justify-content-evenly">
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                            <i class="fas fa-home"/> Eindom
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                        <i class="fas fa-car"/> Bil
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                        <i class="fas fa-ship"/> Båt
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                        <i class="fas fa-motorcycle"/> Motorsykkel
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                        <i class="fas fa-briefcase"/> Jobb
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                        <i class="fas fa-tshirt"/> Kle
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                        <i class="fas fa-couch"/> Møbler
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div class="dropdown navbar-item">
                                        <span class="mt-1 text-muted" type="button" id="dropdownMenu2" data-toggle="dropdown">
                                        <i class="fas fa-book"/> Bok
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button">Action</button></li>
                                            <li><button class="dropdown-item" type="button">Another action</button></li>
                                            <li><button class="dropdown-item" type="button">Something else here</button></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>            
                        </div>
                </nav>}*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLogged,
        username: state.user.email
    }
}
export default connect(mapStateToProps)(Navbar)