import { useParams } from "react-router";

export default function CompetitionsManagement() {

  const {competitionId} =useParams();

  return(<h1>{competitionId}</h1>)
}