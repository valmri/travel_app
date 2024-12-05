import { Router, Request, Response } from "express";
import { create, findAll, findOne, update, remove } from "./travel.service";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const travels = await findAll();
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
