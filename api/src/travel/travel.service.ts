import pool from "../config/database";
import { ITravel, ITravelDTO } from "./travel.type";

export const findAll = async (): Promise<ITravel[]> => {
  const { rows } = await pool.query("SELECT * FROM travels ORDER BY id");
  return rows;
};

export const findOne = async (id: number): Promise<ITravel[]> => {
  const { rows } = await pool.query("SELECT * FROM travels WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const create = async (travelDTO: ITravelDTO): Promise<ITravel> => {
  const { rows } = await pool.query(
    "INSERT INTO travels (name, city, country, image, description) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, city, country, image, description",
    [
      travelDTO.name,
      travelDTO.city,
      travelDTO.country,
      travelDTO.image,
      travelDTO.description,
    ]
  );
  return rows[0] as ITravel;
};

export const update = async (
  id: number,
  travelDTO: ITravelDTO
): Promise<ITravel> => {
  const { rows } = await pool.query(
    "UPDATE travels SET name = $1, city = $2, country = $3, image = $4, description = $5 WHERE id = $6 RETURNING id, name, city, country, image, description",
    [
      travelDTO.name,
      travelDTO.city,
      travelDTO.country,
      travelDTO.image,
      travelDTO.description,
      id,
    ]
  );
  return rows[0] as ITravel;
};

export const remove = async (id: number): Promise<void> => {
  const { rows } = await pool.query("DELETE FROM travels WHERE id = $1", [id]);
  return rows[0];
};
