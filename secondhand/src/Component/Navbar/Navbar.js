import React from "react";
import { Link , withRouter} from "react-router-dom";
import logo from "../../resources/logo.svg";
import "./Navbar.css";
import { connect } from "react-redux";
import { instanceAxs } from "../../api/Api";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentY: 0,
      isRender: true,
      isLoggedIn: false,
      showResults: false,
      username: "",
      searchInput: "",
    };
    this.scroll = this.scroll.bind(this);
  }

  handleSearchInputChange = (event) => {
    let input = event.target.value;
    let showResVal = false;

    if(input === "") {
      this.setState({
        searchInput: ''
      })
      return;
    }

    instanceAxs
      .get(`file/getmenuitems?q=${input}`)
      .then(response => {
        console.log("response",response.data);
        var responseData = response.data.items;
        var categoryArray = [];
        var subCatArray = [];
        var subItems = [];

        for(let i = 0; i < responseData.length; i++) {
          let dbItem = responseData[i];
          for(let k = 0; k < dbItem.length; k++) {
            let subCatItem = dbItem[i];
            if(categoryName === 0) {
              var categoryName = subCatItem.dbName;
              categoryArray.push(categoryName);
            } else {
              for(let j = subCatItem.length - 1; j >= 0; j--) {
                var lastItem = subCatItem[j];
                if(j === subCatItem.length - 1) {
                  var subcatName = lastItem.collectionName;
                  subCatArray.push(subcatName);
                } else {
                  subItems.push(subcatName.title)
                }
              }
            }
          }
        }
      showResVal = true;
        this.setState({
          searchInput: event.target.value,
          showResults: showResVal,
          categoryArray,
          subCatArray,
          subItems
        })
      })

  };

  checkCharacters = async () => {
      let input = this.state.searchInput.trim();
      let searchInput = input.replace(/\s/g, "+");
      this.setState({
          searchInput
      })
  }

  makeSearch = async () => {
      await this.checkCharacters();
      let query = `/search?q=${this.state.searchInput}`;
      this.props.history.push( query);    
      window.location.reload(false)        
  }

  getLogin = () => {
    const isLoggedIn = this.props.isLoggedIn;
    this.setState({
      isLoggedIn: isLoggedIn,
    });
    if (isLoggedIn) {
      const username = this.props.username;
      this.setState({
        username,
      });
    }
  };

  scroll() {
    if (window.scrollY > this.state.currentY) {
      this.setState({ isRender: false });
    } else {
      this.setState({ isRender: true });
    }
    this.setState({ currentY: window.scrollY });
  }

  render() {
    window.addEventListener("scroll", this.scroll);
    return (
      <div>
        {this.state.isRender &&
          <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
            <div className="container">
              <a className="navbar-brand" href="/">
                Finn
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="form-group w-75 me-auto mx-auto ">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search any product..."
                      aria-label="Search"
                      onChange={this.handleSearchInputChange}
                    />
                    <button className="btn btn-outline-primary" type="button" onClick={this.makeSearch}>
                      Search
                    </button>                    
                  </form>
                  {this.state.showResults && 
                      <span className="border rounded searchResultBox">
                        {this.state.categoryArray.map(category => {
                          <h4>{category}</h4>
                        })}
                      </span>
                    }
                </div>
                <div className="dropdown" id="profileToggleDiv">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/profil"
                    id="profileToggleButton"
                    role="button"
                    aria-expanded="false"
                  >
                    <img
                      src={logo}
                      alt=""
                      width="30"
                      height="24"
                      className="d-inline-block align-text-top"
                    />
                    Profile
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {this.props.isLoggedIn && (
                      <li>
                        <a className="dropdown-item" href="/">
                          {this.props.username}
                        </a>
                      </li>
                    )}
                    <li>
                      <Link to="/login" className="dropdown-item">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link to="/profil" className="dropdown-item">
                        Favorites
                      </Link>
                    </li>
                    <li>
                      <Link to="/nyannonse" className="dropdown-item">
                        Ny Annonse
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          </div>
        }
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLogged,
    username: state.user.email,
  };
};
export default connect(mapStateToProps)(withRouter(Navbar));
