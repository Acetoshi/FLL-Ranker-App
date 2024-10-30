import { dataSource } from "./data-source";
import { Competition } from "../competition/competition.entity";
import competitions from "../seed_data/competitions.json";

(async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    competitions.map(async (el) => {
      const competition = new Competition();
      competition.name = el.name;
      competition.location = el.location;
      competition.date = el.date;

      return await competition.save();
    });

    await queryRunner.commitTransaction();
  } catch (error) {
    console.info(error);
    await queryRunner.rollbackTransaction();
  }
})();
