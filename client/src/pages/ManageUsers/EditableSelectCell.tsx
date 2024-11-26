import { MenuItem, Select, TableCell } from "@mui/material";
import { useState } from "react";

export default function EditableSelectCell({
  displayMode,
  defaultValue,
  options,
  inputRef,
  error,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleChange = (event) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <TableCell>
      {displayMode === "create" || displayMode === "edit" ? (
        <Select
          fullWidth
          id="add-team-select"
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
