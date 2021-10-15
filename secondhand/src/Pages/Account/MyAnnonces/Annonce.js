import './Annonce.css';

function Annonce(props) {
    const annonce = props.annonce;

    return(
        <div className="annonceMainDiv d-flex justify-content-between align-items-center">
            <p>{annonce.title}</p>
            <p>{annonce.annonceId}</p>
        </div>
    )
}

export default Annonce;