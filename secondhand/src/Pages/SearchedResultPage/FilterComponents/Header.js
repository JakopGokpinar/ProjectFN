import './Header.css';

function Header(params) {
    const title = params.title;

    return(
        <div className='header-container' onClick={params.toggleVisible}>
            <span>{title}</span>
            <i className="fas fa-chevron-down"></i>
        </div>
    )
}

export default Header;