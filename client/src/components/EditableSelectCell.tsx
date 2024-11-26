import { MenuItem, Select, TableCell } from "@mui/material";
import { Ref, useState } from "react";
import { Mode } from "../types/types";

interface EditableSelectCellProps {
  displayMode: Mode;
  defaultValue: string;
  options: Array<{ id: number; label: string }>;
  inputRef: Ref<HTMLInputElement>;
  error?: boolean;
}

export default function EditableSelectCell({
  displayMode,
  defaultValue,
  options,
  inputRef,
  error,
}: EditableSelectCellProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <TableCell>
      {displayMode === "create" || displayMode === "edit" ? (
        <Select
          fullWidth
          value={selectedValue}
          onChange={handleChange}
          ref={inputRef}
          error={error}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        defaultValue || ""
      )}
    </TableCell>
  );
}
