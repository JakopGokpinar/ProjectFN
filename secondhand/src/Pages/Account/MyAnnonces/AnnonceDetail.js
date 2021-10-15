import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "../../../Component/Spinner/Spinner";

function AnnonceDetail(props) {
    
    var { annonceId } = useParams();
    const [annonces] = useState(props.annonces);
    const [annonce, setAnnonce] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line
        setAnnonce(annonces.filter(aSpace => aSpace.annonceId == annonceId)[0])
        setLoading(false);
    }, [annonces, annonceId])


    return(
        <div>
            {
                !isLoading ? 
                    <div>
                        <li>{annonce.title}</li>
                        <li>{annonceId}</li>
                    </div>
                    : 
                    <Spinner/>
            }   
        </div>
    )
}

export default AnnonceDetail;