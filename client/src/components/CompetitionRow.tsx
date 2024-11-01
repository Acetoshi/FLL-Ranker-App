import { useRef, useState } from "react";
import { TableRow, TableCell } from "@mui/material";
import {
  useCreateCompetitionMutation,
  // useEditCompetitionMutation,
} from "../types/graphql-types";
import { GET_COMPETITIONS } from "../schemas/queries";
import EditableTextCell from "./EditableTextCell";
import BtnCRUD from "./BtnCRUD";

type CompetitionRowProps = {
  mode: "create" | "edit" | "consult";
  competition?: {
    id: number;
    name: string;
    location: string;
    date: string;
  };
};

export default function CompetitionRow({
  mode,
  competition,
}: CompetitionRowProps) {
  const [displayMode, setDisplayMode] = useState(mode);
  const [createCompetition] = useCreateCompetitionMutation();
  // const [editCompetition] = useEditCompetitionMutation();
  console.info(displayMode);
  const nameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);

  const locationRef = useRef<HTMLInputElement>(null);
  const [locationError, setLocationError] = useState<boolean>(false);

  const dateRef = useRef<HTMLInputElement>(null);
  const [dateError, setDateError] = useState<boolean>(false);

  const [btnIsDisabled, setBtnIsDisabled] = useState<boolean>(true);

  const handleDateValidation = () => {
    const value = dateRef.current && dateRef.current.value;
    return value && value >= new Date().toISOString().split("T")[0]
      ? true
      : false;
  };

  const validateText = (value: string | null) => {
    return value
      ? /.{5,100}/.test(value) && /^[A-Za-z0-9_-\s]+$/.test(value)
      : false;
  };

  const handleNameValidation = () => {
    const value = nameRef.current && nameRef.current.value;
    return validateText(value);
  };

  const handleLocationValidation = () => {
    const value = locationRef.current && locationRef.current.value;
    return validateText(value);
  };

  const handleInputChange = (element: string) => {
    switch (element) {
      case "nom":
        if (handleNameValidation()) {
          setNameError(false);
        } else {
          setNameError(true);
        }
        break;
      case "lieu":
        if (handleLocationValidation()) {
          setLocationError(false);
        } else {
          setLocationError(true);
        }
        break;
      case "date":
        if (handleDateValidation()) {
          setDateError(false);
        } else {
          setDateError(true);
        }
        break;
    }
    if (
      handleNameValidation() &&
      handleLocationValidation() &&
      handleDateValidation()
    ) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
  };

  const handleAdd = async () => {
    if (handleNameValidation()) {
      setNameError(false);
      setBtnIsDisabled(false);

      try {
        await createCompetition({
          refetchQueries: [{ query: GET_COMPETITIONS }],
          variables: {
            competition: {
              name: nameRef.current ? nameRef.current.value : "",
              location: locationRef.current ? locationRef.current.value : "",
              date: dateRef.current ? dateRef.current.value : "",
            },
          },
        });
      } catch {
        setNameError(true);
      }
    } else {
      setNameError(true);
      setBtnIsDisabled(true);
    }
  };

  // if (mode == "consult") {
  //   return;
  // } else if (mode == "edit") {
  //   return;
  // } else if (mode == "create") {

  // } else {
  //   return;
  // }

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell align="left">
          <EditableTextCell
            displayMode={displayMode}
            inputRef={nameRef}
            label="Nom"
            onChange={() => handleInputChange("nom")}
            error={nameError}
            helperText={
              nameError
                ? "Le nom doit faire entre 5 et 100 caractères alphanumériques"
                : ""
            }
            defaultValue={competition ? competition.name : ""}
          />
        </TableCell>
        <TableCell align="left">
          <EditableTextCell
            displayMode={displayMode}
            inputRef={locationRef}
            label="Lieu"
            onChange={() => handleInputChange("lieu")}
            error={locationError}
            helperText={
              locationError
                ? "Le lieu doit faire entre 5 et 100 caractères alphanumériques"
                : ""
            }
            defaultValue={competition ? competition.location : ""}
          />
        </TableCell>
        <TableCell align="left">
          <EditableTextCell
            type="date"
            InputLabelProps={{ shrink: true, required: true }}
            displayMode={displayMode}
            inputRef={dateRef}
            label="Date"
            onChange={() => handleInputChange("date")}
            error={dateError}
            helperText={
              dateError
                ? "La date doit être supérieure à celle d'aujourd'hui"
                : ""
            }
            defaultValue={
              competition
                ? new Date(Date.parse(competition.date)).toLocaleDateString(
                    "fr-FR"
                  )
                : ""
            }
          />
        </TableCell>
        <TableCell align="right">
          {displayMode == "create" ? (
            <BtnCRUD
              disabled={btnIsDisabled}
              handleClick={handleAdd}
              type={"add"}
            />
          ) : displayMode == "edit" ? (
            <>
              <BtnCRUD disabled={false} handleClick={handleAdd} type={"save"} />
              <BtnCRUD
                disabled={false}
                handleClick={handleAdd}
                type={"cancel"}
              />
            </>
          ) : (
            <BtnCRUD
              disabled={false}
              handleClick={() => setDisplayMode("edit")}
              type={"edit"}
            />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
