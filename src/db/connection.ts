import mysql from "mysql";
import { DBConfig } from "./credentials";

export const con = mysql.createConnection(DBConfig);
