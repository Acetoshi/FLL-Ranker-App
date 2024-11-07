import { useRef, useState, RefObject } from "react";
import { TableRow, TableCell, Stack } from "@mui/material";
import {
  useCreateCompetitionMutation,
  useEditCompetitionMutation,
  useRemoveCompetitionMutation,
  RemoveCompetitionMutation,
} from "../types/graphql-types";
import { GET_COMPETITIONS } from "../schemas/queries";
import EditableTextCell from "./EditableTextCell";
import BtnCRUD from "./BtnCRUD";
import { DataHandlerResult } from "../types/types";
import { useDialog } from "../hooks/useDialog";
import { useNotification } from "../hooks/useNotification";
import BtnLink from "./BtnLink";

type CompetitionRowProps = {
  mode: "create" | "edit" | "consult";
  competition?: Competition;
};

type Competition = {
  id: number;
  name: string;
  location: string;
  date: string;
};

export default function CompetitionRow({
  mode,
  competition,
}: CompetitionRowProps) {
  const [displayMode, setDisplayMode] = useState(mode);
  const [createCompetition] = useCreateCompetitionMutation();
  const [editCompetition] = useEditCompetitionMutation();
  const [removeCompetition] = useRemoveCompetitionMutation();
  const { askUser } = useDialog();
  const { notifySuccess, notifyError } = useNotification();

  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    location: useRef<HTMLInputElement>(null),
    date: useRef<HTMLInputElement>(null),
  };

  const [errors, setErrors] = useState({
    name: false,
    location: false,
    date: false,
  });

  const handleDateValidation = () => {
    const value = inputRefs.date.current && inputRefs.date.current.value;
    return value && value >= new Date().toISOString().split("T")[0]
      ? true
      : false;
  };

  const validateText = (value: string | null | undefined) => {
    return value
      ? /.{5,100}/.test(value) && /^[A-Za-z0-9_-\s]+$/.test(value)
      : false;
  };

  const handleDisabled = (): boolean => {
    return (
      Object.values(errors).some((el) => el) ||
      Object.values(inputRefs).some(
        (el) => el.current != null && el.current.value == ""
      )
    );
  };

  const handleInputChange = (
    field: string,
    inputRef: RefObject<HTMLInputElement>
  ) => {
    const isValid =
      field == "date"
        ? handleDateValidation()
        : validateText(inputRef.current?.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: !isValid }));
  };

  const clearInputFields = (inputRefs: {
    [key: string]: RefObject<HTMLInputElement>;
  }) => {
    if (inputRefs.name.current) inputRefs.name.current.value = "";
    if (inputRefs.date.current) inputRefs.date.current.value = "";
    if (inputRefs.location.current) inputRefs.location.current.value = "";
  };

  const handleAdd = async () => {
    try {
      await createCompetition({
        refetchQueries: [{ query: GET_COMPETITIONS }],
        variables: {
          competition: {
            name: inputRefs.name.current ? inputRefs.name.current.value : "",
            location: inputRefs.location.current
              ? inputRefs.location.current.value
              : "",
            date: inputRefs.date.current ? inputRefs.date.current.value : "",
          },
        },
      });
      clearInputFields(inputRefs);
      notifySuccess("Compétition créée avec succès");
    } catch {
      setErrors((prevErrors) => ({ ...prevErrors, name: false }));
      notifyError("Erreur à la création de la compétition");
    }
  };

  const handleEdit = async () => {
    await editCompetition({
      refetchQueries: [{ query: GET_COMPETITIONS }],
      variables: {
        competition: {
          id: competition ? competition.id : undefined,
          name: inputRefs.name.current ? inputRefs.name.current.value : "",
          location: inputRefs.location.current
            ? inputRefs.location.current.value
            : "",
          date: inputRefs.date.current ? inputRefs.date.current.value : "",
        },
      },
    });
    notifySuccess("Compétition modifiée avec succès");
    setDisplayMode("consult");
  };

  const submitDeletion = async () => {
    const userConfirms = await askUser(
      `Supprimer la compétition ${competition && competition.name} ?`,
      "Cette action est définitive, elle supprime également l'ensemble des jurys associés à cette compétition !"
    );

    if (competition && userConfirms) {
      const { success, message } = await handleRemove();
      if (success) {
        notifySuccess("compétition supprimée");
      } else {
        notifyError(message as string);
      }
    }
  };

  const handleRemove = async (): Promise<DataHandlerResult> => {
    const competitionInput = {
      id: competition!.id,
    };
    const {
      data: {
        removeCompetition: { success, message },
      },
    } = (await removeCompetition({
      refetchQueries: [{ query: GET_COMPETITIONS }],
      variables: { competitionId: competitionInput },
    })) as { data: RemoveCompetitionMutation };

    return { success, message };
  };

  const getMyDate = (competition: Competition) => {
    if (displayMode === "consult")
      return new Date(Date.parse(competition.date)).toLocaleDateString("fr-FR");
    if (displayMode === "edit") return competition.date;
    return "";
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <EditableTextCell
          displayMode={displayMode}
          inputRef={inputRefs.name}
          label="Nom"
          onChange={() => handleInputChange("name", inputRefs.name)}
          error={errors.name}
          helperText={
            errors.name
              ? "Le nom doit faire entre 5 et 100 caractères alphanumériques"
              : ""
          }
          defaultValue={competition ? competition.name : ""}
        />
        <EditableTextCell
          displayMode={displayMode}
          inputRef={inputRefs.location}
          label="Lieu"
          onChange={() => handleInputChange("location", inputRefs.location)}
          error={errors.location}
          helperText={
            errors.location
              ? "Le lieu doit faire entre 5 et 100 caractères alphanumériques"
              : ""
          }
          defaultValue={competition ? competition.location : ""}
        />
        <EditableTextCell
          textFieldProps={{ type: "date", InputLabelProps: { shrink: true } }}
          displayMode={displayMode}
          inputRef={inputRefs.date}
          label="Date"
          onChange={() => handleInputChange("date", inputRefs.date)}
          error={errors.date}
          helperText={
            errors.date ? "La date ne peut être antérieure à aujourd'hui" : ""
          }
          defaultValue={competition && getMyDate(competition)}
        />
        <TableCell align="right">
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {displayMode == "create" ? (
              <BtnCRUD
                disabled={handleDisabled()}
                handleClick={handleAdd}
                type={"add"}
              />
            ) : displayMode == "edit" ? (
              <>
                <BtnCRUD
                  disabled={handleDisabled()}
                  handleClick={handleEdit}
                  type={"save"}
                />
                <BtnCRUD
                  disabled={false}
                  handleClick={() => setDisplayMode("consult")}
                  type={"cancel"}
                />
              </>
            ) : (
              <>
                <BtnLink
                  to={`/manage/competitions/${
                    competition && competition.id
                  }/juries`}
                  content="Jurys"
                />
                <BtnLink
                  to={`/manage/competitions/${
                    competition && competition.id
                  }/teams`}
                  content="équipes"
                />
                <BtnLink
                  to={`/manage/competitions/${
                    competition && competition.id
                  }/planning`}
                  content="planning"
                />
                <BtnCRUD
                  disabled={false}
                  handleClick={() => setDisplayMode("edit")}
                  type={"edit"}
                />
                <BtnCRUD
                  disabled={false}
                  handleClick={submitDeletion}
                  type={"delete"}
                />
              </>
            )}
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
