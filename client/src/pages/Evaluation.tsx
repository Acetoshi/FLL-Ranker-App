import EvaluationTitleRow from "../components/EvaluationTitleRow";
import EvaluationRow from "../components/EvaluationRow";
import {
  Box,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from "@mui/material";

export default function Evaluation() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="25vh"
      >
        <Stack spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="h2" component="h1">
            Evaluation
          </Typography>
        </Stack>
      </Box>

      <TableContainer>
        <Table aria-label="Tableau d'évaluation">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#e3f2fc" }}>
                BEGINNING 1
              </TableCell>
              <TableCell sx={{ backgroundColor: "#bbdff9" }}>
                ACCOMPLISHED 3
              </TableCell>
              <TableCell sx={{ backgroundColor: "#91cbf6" }}>
                DEVELOPPING 2
              </TableCell>
              <TableCell sx={{ backgroundColor: "#66b7f1" }}>
                EXCEEDS 4
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <EvaluationTitleRow
              title="IDENTIFY - Team had a clearly defined problem that was well
          researched."
            />
            <EvaluationRow />
            <EvaluationTitleRow title="DESIGN - Team worked together while creating a project plan and developing their ideas." />
            <EvaluationTitleRow title="CREATE - Team developed an original idea or built on an existing one with a prototype model/drawing to represent their solution." />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
