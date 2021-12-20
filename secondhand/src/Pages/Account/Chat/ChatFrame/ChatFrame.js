import './ChatFrame.css';

import Navbar from './Navbar';
import MessageFrame from './MessageFrame';

function ChatFrame() {
    return(
        <div className="chatFrame">
            <Navbar></Navbar>
            <MessageFrame></MessageFrame>
        </div>
    )
}

export default ChatFrame;