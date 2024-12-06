import { Link } from "react-router-dom";
import { TravelType } from "../types/travel.type";
import Button from "./ui/Button";
import Typography from "./ui/Typography";
import Modal from "./ui/Modal";
import TravelFormEdit from "./TravelFormEdit";

type TravelCardItemProps = {
  travel: TravelType;
  travelList: TravelType[];
  setTravelList: (travelList: TravelType[]) => void;
};

const TravelCardItem = ({
  travel,
  travelList,
  setTravelList,
}: TravelCardItemProps) => {
  const handleDelete = async () => {
    const index = travelList.indexOf(travel);

    const response = await fetch(`http://localhost:8000/travels/${travel.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      travelList.splice(index, 1);
      setTravelList([...travelList]);
    }
  };

  return (
    <div className="shadow-md rounded-md flex flex-col">
      <Link to={`/travels/${travel.id}`}>
        <img
          src={travel.image}
          alt={travel.name}
          className="w-full object-cover h-60"
        />
      </Link>

      <div className="px-4 py-4 flex-grow">
        <Link to={`/travels/${travel.id}`}>
          <Typography level={3}>{travel.name}</Typography>
        </Link>
        <p>{travel?.description?.substring(0,200)}...</p>
      </div>

      <div className="flex flex-col justify-end gap-2 flex-wrap px-4 pb-4">
        {" "}
        <Modal buttonContent="Supprimer">
          <div className="flex flex-col gap-4">
            <p className="text-slate-500">
              Êtes-vous sûr de vouloir supprimer ce voyage ?
            </p>
            <Button
              text="Confirm to delete"
              variant="danger"
              onClick={handleDelete}
            />
          </div>
        </Modal>
        <Modal buttonContent="Modifier">
          <div className="flex flex-col gap-4">
            <p className="text-slate-500">
              Modification du voyage à {travel.name}
            </p>
            <TravelFormEdit
              travel={travel}
              travelList={travelList}
              setTravelList={setTravelList}
            ></TravelFormEdit>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TravelCardItem;
