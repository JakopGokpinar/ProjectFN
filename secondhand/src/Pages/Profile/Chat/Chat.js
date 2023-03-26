import './Chat.css';
import React from 'react';

const  Chat = () => {

        return(
            <div className="chatContainer">
                <div className='people'>
                </div>
                <div className='chatDiv'>
                    <div className='chatDiv__navbar'>
                    </div>
                    <div className='chatDiv__messages'>

                    </div>
                    <div className='chatDiv__input'>
                        <input type='text'></input>
                        <button>Send</button>
                    </div>
                </div>
            </div>
        )
    
}

export default Chat;