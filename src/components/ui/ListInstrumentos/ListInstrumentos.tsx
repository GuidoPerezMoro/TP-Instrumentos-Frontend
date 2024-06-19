// ListInstrumentos.tsx
import { FC, useState, ChangeEvent } from "react";
import "./../../../styles/variables.css"; // Importa las variables primero
import styles from "./ListInstrumentos.module.css"; // Importa el módulo CSS
import { CardInstrumento } from "./../CardInstrumento/CardInstrumento";
import { Instrumento } from "../../../types/Instrumento";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface IListInstrumentos {
  instrumentos: Instrumento[];
  title: string;
}

export const ListInstrumentos: FC<IListInstrumentos> = ({
  instrumentos,
  title,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredInstrumentos = instrumentos.filter((inst) =>
    inst.instrumento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={styles.containerPrincipalList}>
      <Box className={styles.containerTitle}>
        <h1>{title}</h1>
      </Box>
      <Box className={styles.searchBox}>
        <TextField
          label="Buscar instrumento"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className={styles.icon} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className={styles.containerList}>
        {filteredInstrumentos.map((inst) => (
          <CardInstrumento instrumento={inst} key={inst.id} />
        ))}
      </Box>
    </Box>
  );
};
