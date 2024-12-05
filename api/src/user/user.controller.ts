import { Router, Request, Response } from "express";
import { findAll, findOne, create, update, remove } from "./user.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await findAll();
  res.json(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await findOne(Number(req.params.id));
  res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await create(body);
  res.json(user);
});

router.put("/:id", async (req: Request, res: Response) => {
  const idUser = Number(req.params.id);
  const body = req.body;
  const user = await update(idUser, body);
  res.json(user);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const idTravel = Number(req.params.id);
  const result = await remove(idTravel);
  res.json(result);
});

export default router;
