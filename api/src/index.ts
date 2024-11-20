import express from "express";
import cors from "cors";

const travelList = [
  {
    id: 1,
    name: "Paris",
    city: "Paris",
    country: "France",
    image:
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
    description:
      "Paris is known for its iconic landmarks like the Eiffel Tower, art museums like the Louvre, and its romantic atmosphere.",
  },
  {
    id: 2,
    name: "New York City",
    city: "New York",
    country: "USA",
    image:
      "https://www.planetware.com/photos-large/USNY/new-york-city-empire-state-building.jpg",
    description:
      "New York City is famous for its skyline, Central Park, Times Square, and vibrant cultural life.",
  },
];

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

app.get("/", (req, res) => {
  res.send("Heath check");
});

app.get("/travels", (req, res) => {
  res.send(travelList);
});

app.post("/travels", (req, res) => {
  const body = req.body;

  let newTravel: ITravel = {
    id: generateNextTravelId(),
    name: body.name,
    city: body.city,
    country: body.country,
    image: body.image,
    description: body.description,
  };

  travelList.push(newTravel);
  res.status(200).send(newTravel);
});

app.delete("/travels/:id", (req, res) => {
  const idTravel = req.params.id;
  const index = travelList.findIndex((item) => item.id === parseInt(idTravel));

  if (index !== -1) {
    travelList.splice(index, 1);
  } else {
    res.status(404).send("Travel not found");
  }

  res.status(200).send(`Successful deletion of the travel number ${idTravel}`);
});

app.get("/travels/:id", (req, res) => {
  const idTravel = req.params.id;

  const travel = travelList.find((item) => item.id === parseInt(idTravel));

  if (travel === undefined) {
    res.status(404).send("Travel not found");
  }

  res.status(200).send(travel);
});

app.put("/travels/:id", (req, res) => {
  const idTravel = req.params.id;
  const body = req.body;

  const travelIndex = travelList.findIndex(
    (item) => item.id === parseInt(idTravel)
  );
  if (travelIndex === -1) {
    res.status(404).send("Travel not found");
  }

  const updatedTravel = {
    ...travelList[travelIndex],
    name: body.name,
    city: body.city,
    country: body.country,
    image: body.image,
    description: body.description,
  };

  travelList[travelIndex] = updatedTravel;

  res.status(200).send(updatedTravel);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const generateNextTravelId = () => {
  const lastTravel = travelList[travelList.length - 1]?.id;
  return lastTravel ? lastTravel + 1 : 1;
};