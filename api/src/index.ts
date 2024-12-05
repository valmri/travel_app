import express from "express";
import cors from "cors";
import TravelController from "./travel/travel.controller"

const travelList: any[] = [];

interface ITravel {
  id: number;
  name: string;
  city: string;
  country: string;
  image: string;
  description: string;
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use("/travels", TravelController);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const generateNextTravelId = () => {
  const lastTravel = travelList[travelList.length - 1]?.id;
  return lastTravel ? lastTravel + 1 : 1;
};
