import { dataSource } from "../db/data-source";
import { Role } from "../modules/role/role.entity";
import { User } from "../modules/user/user.entity";
import { Jury } from "../modules/jury/jury.entity";
import { Competition } from "../modules/competition/competition.entity";
import roles from "../seed_data/roles.json";
import users from "../seed_data/users.json";
import juries from "../seed_data/juries.json";
import competitions from "../seed_data/competitions.json";

import user_juries_jury from "../seed_data/user_juries_jury.json";

(async () => {
  // initializing data source
  await dataSource.initialize();

  console.info("Starting Seeding...");

  const queryRunner = dataSource.createQueryRunner();

  // big cleanup
  try {
    await queryRunner.startTransaction();

    await queryRunner.query("DELETE FROM user_juries_jury");
    await queryRunner.query("DELETE FROM user");
    await queryRunner.query("DELETE FROM jury");
    await queryRunner.query("DELETE FROM role");
    await queryRunner.query("DELETE FROM competition");

    // init sequences
    await queryRunner.query("DELETE FROM sqlite_sequence WHERE name='role'");
    await queryRunner.query(
      "DELETE FROM sqlite_sequence WHERE name='competition'"
    );

    // competitions
    const seedCompetitions = await Promise.all(
      competitions.map(async (el) => {
        const competition = new Competition();
        competition.name = el.name;
        competition.location = el.location;
        competition.date = el.date;

        return await competition.save();
      })
    );
    console.info(seedCompetitions);

    // roles
    const seedRoles = await Promise.all(
      roles.map(async (el) => {
        const role = new Role();
        role.label = el.label;
        return await role.save();
      })
    );
    console.info(seedRoles);

    // juries
    const seedJuries = await Promise.all(
      juries.map(async (el) => {
        const jury = new Jury();
        const competition = seedCompetitions.find(
          (comp) => comp.id === el.competition
        ) as Competition;
        jury.name = el.name;
        jury.competition = competition;
        return await jury.save();
      })
    );
    console.info(seedJuries);

    // users
    const seedUsers = await Promise.all(
      users.map(async (el) => {
        const user = new User();
        user.id = el.id;
        user.firstname = el.firstname;
        user.lastname = el.lastname;
        user.email = el.email;
        user.password = el.password;

        // role
        const role = seedRoles.find((rl) => rl.id === el.role) as Role;
        user.role = role;

        // add juries
        const repoJuries = seedJuries.filter((ju) => {
          const repUsJu = user_juries_jury.filter(
            (usju) => usju.userId === el.id
          );
          const juryName = juries.filter((j) =>
            repUsJu.some((ruj) => ruj.juryId === j.id)
          );
          return juryName.some((juna) => juna.name === ju.name);
        });
        user.juries = repoJuries;

        return await user.save();
      })
    );
    console.info(seedUsers);

    await queryRunner.commitTransaction();

    console.info("Seeding Done.");
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  }
})();
