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
 * EditableTextCell component renders a TableCell that conditionally displays 
 * a TextField for editing or creating an entry, or static text for viewing.
 *
 * @param {ElementType<TableCellBaseProps>} [component] - The component type for the TableCell, defaults to 'td'.
 * @param {string} [scope] - The scope attribute for accessibility, typically "row" or "col".
 * @param {"create" | "edit" | "consult"} displayMode - Defines the mode of the cell: "create" for adding new entries, "edit" for modifying existing ones, and "consult" for viewing.
 * @param {Ref<HTMLInputElement>} inputRef - Ref for the TextField input, allows access to the input element.
 * @param {string} label - Label for the TextField input.
 * @param {string} [defaultValue] - Optional default value for the TextField when in edit or create mode.
 * @param {() => void} onChange - Callback function to handle changes in the TextField input, mainly used for data validation feedback.
 * @param {boolean} error - Indicates whether the TextField input has an error.
 * @param {string} helperText - Helper text displayed below the TextField input, often used to show validation messages.
 * @param {TextFieldProps} [textFieldProps] - Optional props to be passed to the TextField component for additional customization.
 *
 * @returns {JSX.Element} A TableCell containing either a TextField for editing or creating an entry, or static text for viewing.
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
          helperText={error ? helperText: ""}
          {...textFieldProps}
        />
      ) : (
        defaultValue || ""
      )}
    </TableCell>
  );
}
