import { dataSource } from "./data-source";
import { Competition } from "../competition/competition.entity";

const dataSeed = [
  { name: "competitionA", location: "Paris", date: "2017-05-24" },
  { name: "competitionB", location: "Montpellier", date: "2021-06-02" },
  { name: "competitionC", location: "Lyon", date: "2024-09-23" },
];

(async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    dataSeed.map(async (el) => {
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
