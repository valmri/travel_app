import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TravelType } from "../types/travel.type";
import Typography from "./ui/Typography";

const SingleTravelPage = () => {
    const { id } = useParams()
    const [travel, setTravel] = useState<TravelType>({})

    useEffect(() => {
        console.log("params id : ", id)
        console.log("params id : ", typeof id)
        fetchTravel()
    }, [])

    const fetchTravel = async () => {
        // Fetch travels.json
        const response = await fetch("/travels.json")
        const travelList = await response.json()
        // find travel with id
        const findTravel = travelList.find((travel: TravelType) => travel.id === Number(id))
        // set travel into state
        console.log("findTravel : ", findTravel)
        setTravel(findTravel)
    }

    return ( 
        <div  className="container mx-auto">
            <Typography
                level={1}
            >
                {travel.name}
            </Typography>

            <img src={travel.image} alt="" />

            <p>
                {travel.description}
            </p>
        </div>
     );
}
 
export default SingleTravelPage;