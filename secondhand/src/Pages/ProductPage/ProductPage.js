import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { instanceAxs } from "../../api/Api";
import { userApi } from "../../config";

function ProductPage() {
    let {annonceId} = useParams();

    const [annonce, setAnnonce] = useState();
    const [isLoading, setLoading] = useState(true)

    const findAnnonce = async () => {
        await instanceAxs.post(`${userApi}/getproduct`, { annonceId: annonceId})
            .then(respond => {
                console.log(respond);
                if(respond.data.message === "annonce found"){
                    setAnnonce(respond.data.annonce);
                    setLoading(false)
                } else {
                    console.log("something went wrong while getting the annonce")
                }
            })   
            .catch(err => {
                console.log(err);
            })   
    }

    useEffect(() => {
        findAnnonce();
        //eslint-disable-next-line
    }, [isLoading])

    return(
        <div>
            { !isLoading ?
                <div>
                    <p>product details</p>
                    <h1>{annonce.title}</h1>
                    <p>id: {annonceId}</p>
                    <p>category: {annonce.category}</p>
                    <p>price: {annonce.price}</p>
                    <p>description: {annonce.description}</p>
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    )
}

export default ProductPage;