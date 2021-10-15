import './ProductStatusTag.css';

function ProductStatusTag({ status }) {
    
    function renderSwitch(status) {
        switch(status) {
          case 'active':
            return <span className="statusTag border border-primary bg-primary rounded-pill">
                    Aktiv
                </span>;
          case 'sold':
            return <span className="statusTag border border-danger bg-danger rounded-pill">
                    Solgt
                </span>
          default:
            break;
        }
    }
    
    return(   
        <div>
            {renderSwitch(status)}
        </div>
    )
}

export default ProductStatusTag;