import { Dispatch, SetStateAction, useRef, useState } from "react";
import Input from "./ui/Input";
import { TravelType } from "../types/travel.type";

type TravelSearchProps = {
  setTravelList: (travelList: TravelType[]) => void;
};

function TravelSearch({ setTravelList }: TravelSearchProps) {
  const [searchArguments, setSearchArguments] = useState<string>("");
  const timeOutRef = useRef<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setSearchArguments(value);

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/travels?search=${value}`
        );

        const travels = await response.json();
        setTravelList(travels);
        if (!response.ok) {
          throw new Error("Erreur HTTP lors de l'édition.");
        }
      } catch (error) {
        console.info(error);
      }
    }, 500);
  }

  return (
    <>
      <div className="my-5">
        <Input
          onChange={handleChange}
          name="search"
          placeholder="Search travel"
          type="text"
          required={false}
          value={searchArguments}
        ></Input>
      </div>
    </>
  );
}

export default TravelSearch;
