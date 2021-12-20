
function Header(params) {
    const title = params.title;

    return(
        <div id="category-header">
            <span>{title}</span>
            <i className="fas fa-chevron-down"></i>
        </div>
    )
}

export default Header;