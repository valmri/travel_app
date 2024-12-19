import { Router, Request, Response } from "express";
import {
  create,
  findAll,
  findOne,
  update,
  remove,
  findBySearch,
} from "./travel.service";
import { ITravel } from "./travel.type";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const searchArguments: string | undefined = req.query?.search as
    | string
    | undefined;

  let travels: ITravel[];
  if (searchArguments) {
    travels = await findBySearch(searchArguments);
  } else {
    travels = await findAll();
  }
  res.json(travels);
});

router.get("/:id", async (req: Request, res: Response) => {
  const travel = await findOne(Number(req.params.id));
  res.json(travel);
});

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const travel = await create(body);
  res.json(travel);
});

router.put("/:id", async (req: Request, res: Response) => {
  const idTravel = Number(req.params.id);
  const body = req.body;
  const travel = await update(idTravel, body);
  res.json(travel);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const idTravel = Number(req.params.id);
  const result = await remove(idTravel);
  res.json(result);
});

export default router;
