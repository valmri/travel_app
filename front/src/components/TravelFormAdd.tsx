import { useState } from "react";
import { TravelType } from "../types/travel.type";
import Button from "./ui/Button";
import Input from "./ui/Input";

type TravelFormAddProps = {
  travelList: TravelType[];
  setTravelList: (travelList: TravelType[]) => void;
};

const TravelFormAdd = ({ travelList, setTravelList }: TravelFormAddProps) => {
  const [travelAddData, setTravelAddData] = useState<TravelType>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/travels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(travelAddData),
    });

    if (response.ok) {
      const newTravel = await response.json();
      setTravelList([...travelList, newTravel]);
    } else {
      console.error(response.status);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    const newtravel = {
      ...travelAddData,
      [name]: value,
    };

    setTravelAddData(newtravel);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 shadow-md p-10 mb-10"
    >
      <Input
        type="text"
        placeholder="name"
        onChange={handleChange}
        name="name"
      />
      <Input
        type="text"
        placeholder="city"
        onChange={handleChange}
        name="city"
      />
      <Input
        type="text"
        placeholder="country"
        onChange={handleChange}
        name="country"
      />
      <Input
        type="text"
        placeholder="image"
        onChange={handleChange}
        name="image"
      />
      <Input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="description"
      />
      <Button text="Add travel" type="submit" />
    </form>
  );
};

export default TravelFormAdd;
