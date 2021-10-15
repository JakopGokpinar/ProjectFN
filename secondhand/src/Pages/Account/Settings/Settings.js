import "./Settings.css";
import "../../../Css/Main.css";

import Checkbox from "./Checkbox";

function Settings() {
    return(
        <div className="settings__container">
            <h1>Varsler</h1>
            <hr></hr>
            <h5>Varsle meg på</h5>
            <Checkbox id="finnNotif" title="Finn.no" isChecked={true}></Checkbox>
            <Checkbox id="emailNotif" title="E-mail"></Checkbox>
            <Checkbox id="appNotif" title="App" isDisabled={true}></Checkbox>
            <h5>Varsle meg når</h5>
            <Checkbox id="appNotif" title="en merkerer min annonse som favoritt"></Checkbox>
            <Checkbox id="appNotif" title="pris blir satt ned på favorittet produkt"></Checkbox>
            <Checkbox id="appNotif" title="en favoritt markert som solgt"></Checkbox>
            <Checkbox id="appNotif" title="Nye treff på lagrede søk"></Checkbox>
            <Checkbox id="appNotif" title="pris blir satt ned på lagre søkt produkt"></Checkbox>
            <Checkbox id="appNotif" title="en sender melding til meg"></Checkbox>
            <h1>Tema</h1>
            <hr/>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="darkModeSwitch" disabled/>
                <label class="form-check-label" for="darkModeSwitch">Mørk modus</label>
            </div>
            <div className="settings__saveButtons saveButtons__con">
                <button tyep="button" className="btn btn-danger saveButtons">Avbryt</button>
                <button tyep="button" className="btn btn-primary saveButtons">Lagre</button>
            </div>
        </div>
    )
}

export default Settings;