import './Chat.css';

import ProductCard from './ProductCard';
import ChatFrame from './ChatFrame/ChatFrame';

function Chat() {
    return(
        <div className="chat__container">
            <div className="chat__navbar">
                <div className="navbar__search">
                    <input type="text" className="form-control searchField" placeholder="Søk produkt,selger,status,etc..."></input>
                    <div className="navbar__tags">
                        <span className="border rounded-pill">Aktiv</span>
                        <span className="border rounded-pill">Solgt</span>
                    </div>
                </div>
                <div className="navbar__tools"> 
                    <i className="fas fa-trash deleteIcon deleteMessages"></i>
                    <button className="btn btn-dark chooseConversationBtn">Velg samtale</button>
                    <select className="form-select sortConversations" aria-label="Default select example">
                        <option selected>Siste samtale</option>
                        <option value="1">Siste endring</option>
                        <option value="1">Første samtale</option>
                    </select>
                </div>
            </div>
            <div className="usersAndConversation">
                <div className="__users pageSlider">
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                    <ProductCard></ProductCard>
                </div>
                <div className="__conversation">
                    <ChatFrame/>
                </div>
            </div>
        </div>
    )
}

export default Chat;