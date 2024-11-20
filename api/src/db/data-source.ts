import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Team } from "../modules/team/team.entity";
import { Competition } from "../modules/competition/competition.entity";
import { Jury } from "../modules/jury/jury.entity";
import { User } from "../modules/user/user.entity";
import { Role } from "../modules/role/role.entity";
import { Session } from "../modules/session/session.entity";

dotenv.config();
const { DB_FILE } = process.env;

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${DB_FILE}`,
  entities: [Team, Jury, User, Role, Competition, Session],
  synchronize: true,
});
