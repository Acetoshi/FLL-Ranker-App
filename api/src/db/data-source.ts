import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Team } from "../team/team.entity";
import { Competition } from "../competition/competition.entity";

dotenv.config();
const { DB_FILE } = process.env;

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${DB_FILE}`,
  entities: [Team, Competition],
  synchronize: true,
});
