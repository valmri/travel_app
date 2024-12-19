import { useState, useEffect } from "react";
import { TravelType } from "../types/travel.type";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Alert from "./ui/Alert";

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

  const [isAddedTravel, setIsAddedTravel] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [typeAlert, setTypeAlert] = useState<string>("");

  useEffect(() => {
    setTravelEditData({ ...travel });
  }, [travel]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/travels/${travel.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(travelEditData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur HTTP lors de l'édition.");
      }

      const travelIndex = travelList.findIndex((item) => item.id === travel.id);

      const updatedTravel = {
        ...travelList[travelIndex],
        ...travelEditData,
      };

      const newTravelList = [...travelList];
      newTravelList[travelIndex] = updatedTravel;

      setTravelList(newTravelList);
      setTypeAlert("success");
      setMessageAlert("Ce voyage a été édité.");
      setIsAddedTravel(true);
    } catch (error) {
      setTypeAlert("danger");
      setMessageAlert("Erreur lors de l'édition de ce voyage.");
    }

    setIsAddedTravel(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setTravelEditData({
      ...travelEditData,
      [name]: value,
    });
  };

  return (
    <>
      <Alert
        type={typeAlert}
        message={messageAlert}
        isOpen={isAddedTravel}
      ></Alert>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
    </>
  );
};

export default TravelForm;
