import { useState, useEffect } from "react";
import { TravelType } from "../types/travel.type";
import Button from "./ui/Button";
import Input from "./ui/Input";

type TravelFormEditProps = {
  travel: TravelType;
  travelList: TravelType[];
  setTravelList: (travelList: TravelType[]) => void;
};

const TravelForm = ({
  travel,
  travelList,
  setTravelList,
}: TravelFormEditProps) => {
  const [travelEditData, setTravelEditData] = useState<TravelType>({
    ...travel,
  });

  useEffect(() => {
    setTravelEditData({ ...travel });
  }, [travel]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/travels/${travel.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(travelEditData),
    });

    if (response.ok) {
      const travelIndex = travelList.findIndex((item) => item.id === travel.id);

      const updatedTravel = {
        ...travelList[travelIndex],
        ...travelEditData,
      };

      const newTravelList = [...travelList];
      newTravelList[travelIndex] = updatedTravel;

      setTravelList(newTravelList);
    } else {
      console.error(response.status);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setTravelEditData({
      ...travelEditData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <Input
        type="text"
        placeholder="name"
        onChange={handleChange}
        name="name"
        value={travelEditData.name || ""}
      />
      <Input
        type="text"
        placeholder="city"
        onChange={handleChange}
        name="city"
        value={travelEditData.city || ""}
      />
      <Input
        type="text"
        placeholder="country"
        onChange={handleChange}
        name="country"
        value={travelEditData.country || ""}
      />
      <Input
        type="text"
        placeholder="image"
        onChange={handleChange}
        name="image"
        value={travelEditData.image || ""}
      />
      <Input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="description"
        value={travelEditData.description || ""}
      />
      <Button text="Save travel" type="submit" />
    </form>
  );
};

export default TravelForm;
