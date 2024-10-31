import { Ref, ElementType } from "react";
import {
  TableCell,
  TextField,
  TextFieldProps,
  TableCellBaseProps,
} from "@mui/material";

interface EditableTextCellProps {
  component?: ElementType<TableCellBaseProps> | undefined;
  scope?: string;
  displayMode: "create" | "edit" | "consult";
  inputRef: Ref<HTMLInputElement>;
  label: string;
  defaultValue?: string;
  onChange: () => void;
  error: boolean;
  helperText: string;
  textFieldProps?: TextFieldProps; // optional for any additional props
}

/**
 * 
 * @displayMode : "consult" | "edit" | "create"
 * @returns 
 */

export default function EditableTextCell({
  component = undefined,
  scope = undefined, 
  displayMode,
  inputRef,
  label,
  defaultValue = "",
  onChange,
  error,
  helperText,
  textFieldProps,
}: EditableTextCellProps) {
  return (
    <TableCell component={component} scope={scope}>
      {displayMode === "create" || displayMode === "edit" ? (
        <TextField
          inputRef={inputRef}
          label={label}
          variant={displayMode === "edit" ? "standard" : "outlined"}
          defaultValue={defaultValue}
          fullWidth
          required
          onChange={onChange}
          error={error}
          helperText={helperText}
          {...textFieldProps}
        />
      ) : (
        defaultValue || ""
      )}
    </TableCell>
  );
}
