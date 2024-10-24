import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleTravelPage = () => {
    const { id } = useParams()

    useEffect(() => {
        console.log("params id : ", id)
        fetchTravel()
    }, [])

    const fetchTravel = () => {
        // Fetch travels.json
        // find travel with id
        // set travel into state
    }

    return ( 
        <div>
            <h1>Single page</h1>
        </div>
     );
}
 
export default SingleTravelPage;