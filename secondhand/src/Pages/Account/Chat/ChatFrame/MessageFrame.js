import './MessageFrame.css';
import '../../../../Css/Main.css';


function MessageFrame() {
    return(
        <div className="messageFrame__con">
            <div className="messageFrame__warning">
                <p>FINN.no forbeholder seg retten til å kontrollere og stoppe meldinger.</p>
            </div>
            <hr/>
            <div className="messageFrame__messages pageSlider">
                <ul>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
                    <li>jşfdasjşfasj</li>
               
                </ul>
            </div>
            <div className="messageFrame__textField bg-secondary">
                <div><i className="fas fa-paperclip fa-lg"></i></div>
                <input type="" placeholder="Skriv en melding" className="textField__textField form-control"></input>
                <div><i className="fas fa-paper-plane fa-lg"></i></div>
            </div>
        </div>
    )
}

export default MessageFrame;