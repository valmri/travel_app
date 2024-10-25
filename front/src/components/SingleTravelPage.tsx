import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TravelType } from "../types/travel.type";
import Typography from "./ui/Typography";
import TravelList from "./TravelList";

const SingleTravelPage = () => {
    const { id } = useParams()
    const [travel, setTravel] = useState<TravelType>({})
    const [travelList, setTravelList] = useState<TravelType[]>([])

    useEffect(() => {
        console.log("params id : ", id)
        console.log("params id : ", typeof id)
        fetchTravelList()
        fetchTravel()
    }, [id])

    const fetchTravelList = async () => {
        const response = await fetch("/travels.json")
        const data = await response.json()

        const filterTravelList = data.filter((travel: TravelType) => travel.id !== Number(id))
        const limitTravelList = filterTravelList.slice(0, 3)

        setTravelList(limitTravelList)
    }

    const fetchTravel = async () => {
        const response = await fetch("/travels.json")
        const travelList = await response.json()
        const findTravel = travelList.find((travel: TravelType) => travel.id === Number(id))
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

            <div className="mt-20">
                <TravelList 
                    travelList={travelList}
                    setTravelList={setTravelList}
                />
            </div>
        </div>
     );
}
 
export default SingleTravelPage;