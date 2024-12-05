import pool from "../config/database";
import { IUser, IUserDTO } from "./user.type";
import bcrypt from "bcrypt";

export const findAll = async (): Promise<IUser[]> => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

export const findOne = async (id: number): Promise<IUser[]> => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

export const create = async (userDTO: IUserDTO): Promise<IUser> => {
  const hashPassword = await bcrypt.hash(userDTO.password.toString(), 10);

  const { rows } = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, password",
    [userDTO.username, hashPassword]
  );
  return rows[0] as IUser;
};

export const update = async (id: number, userDTO: IUserDTO): Promise<IUser> => {
  const hashPassword = await bcrypt.hash(userDTO.password.toString(), 10);

  const { rows } = await pool.query(
    "UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING id, username, password",
    [userDTO.username, hashPassword, id]
  );
  return rows[0] as IUser;
};

export const remove = async (id: number): Promise<void> => {
  const { rows } = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return rows[0];
};
