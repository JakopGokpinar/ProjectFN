import { useEffect,useState } from "react";
import { useParams } from "react-router";
import CarAnnonce from "./CarAnnonce";
import PropertyAnnonce from "./PropertyAnnonce";
import ContactInformation from "./FormComponents/ContactInformation";
import PhotoAndDescription from "./FormComponents/PhotoAndDescription";
function AnnonceRoute(props) {
    var {categoryName} = useParams();
    const [annonceComponent, setComponent] = useState(<></>);
    const [isLoading, setLoading] = useState(true);

    function findCategory(){
        if(isLoading){
            switch (categoryName) {
                case "bil":
                    setComponent(<CarAnnonce></CarAnnonce>)
                    setLoading(false);
                    break;
                case "enebolig":
                    setComponent(<PropertyAnnonce></PropertyAnnonce>)
                    setLoading(false);
                    break;
                default:
                    setLoading(false);
                    break;
            }
        }          
    }

    useEffect(() => {
        findCategory();
    })
    return(
        <div>
            {annonceComponent} 
            <PhotoAndDescription></PhotoAndDescription>
                    <ContactInformation></ContactInformation>     
        </div>
    )
}

export default AnnonceRoute;