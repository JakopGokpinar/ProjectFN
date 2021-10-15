import { Link } from "react-router-dom";

import './Profile.css';
import "../../../Css/Main.css"

function Profile() {
    return(
        <div className="profile">
            <div className="photoAndDescription">
                <div className="photoAndDescription__frame border rounded">
                    <div className="photoAndDescription__content">
                        <img src="https://i.ytimg.com/vi/Ue1eHtvWRTU/maxresdefault.jpg" className="profile__photo" alt=""></img>
                        <div className="profile__photoButtons">
                            <button type="button" className="btn btn-primary w-75">Velg ny bilde</button>
                            <button type="button" className="btn btn-danger">Reset</button>
                        </div>    
                        <label for="description" className="mb-1">Her kan du skrive litt om deg selv</label>
                        <textarea type="text" className="form-control profile__description" id="description"></textarea>
                    </div>
                </div>
                <div>
                    <p>Du er på fin siden 04.11.2021</p>
                    <Link to="">Sjå korleis andre ser din profil</Link>
                </div>
            </div>
            <div className="profile__personalInfos">
                <div className="personalInfos__table">
                    <table>
                        <tr>
                            <td><label for="name" className="col-form profile__label">Fornavn:</label></td>
                            <td><input type="text" readOnly className="form-control readOnlyInput profile__input" id="name" value="Sigbjorn Roar Eikedaz"/></td>
                            <td><i className="fas fa-tools profile__edit"></i></td>
                        </tr>
                        <tr>
                            <td><label for="surname" className="col-form profile__label">Etternavn:</label></td>
                            <td><input type="text" readOnly className="form-control readOnlyInput profile__input" id="surname" value="Tosvik"/></td>
                            <td><i className="fas fa-edit profile__edit"></i></td>
                        </tr>
                        <tr>
                            <td><label for="email" className="col-form profile__label">E-mail:</label></td>
                            <td><input type="text" readOnly className="form-control readOnlyInput profile__input" id="email" value="ahmettabar2003@gmail.com"/></td>
                            <td><i className="fas fa-highlighter profile__edit"></i></td>
                        </tr>
                        <tr>
                            <td><label for="phoneNumber" className="col-form profile__label">Mobilnummer:</label></td>
                            <td><input type="text" readOnly className="form-control readOnlyInput profile__input" id="phoneNumber" value="+49 456 89 434"/></td>
                            <td><i className="fas fa-pen-alt profile__edit"></i></td>
                        </tr>
                        <tr>
                            <td><label for="password" className="col-form profile__label">Passord:</label></td>
                            <td><input type="password" readOnly className="form-control readOnlyInput profile__input" id="password" value="Sigbjorn"/></td>
                            <td><i className="fas fa-pen-fancy profile__edit"></i></td>
                        </tr>
                    </table>
                </div>  
                <div className="profile__saveButtons saveButtons__con">      
                    <button type="button" className="btn btn-danger saveButtons">Avbryt</button>
                    <button type="button" className="btn btn-primary saveButtons">Lagre</button>
                </div>
            </div>
        </div>          
    )
}

export default Profile;