import { TableCell, TableRow } from "@mui/material";

export default function EvaluationTitleRow({ title }: { title: string }) {
  return (
    <>
      <TableRow>
        <TableCell
          align="center"
          colSpan={4}
          sx={{ backgroundColor: "#bbdff9" }}
        >
          {title}
        </TableCell>
      </TableRow>
    </>
  );
}
