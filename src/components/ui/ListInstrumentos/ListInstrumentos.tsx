import { FC } from "react";

import "./../../../styles/variables.css"; // Importa las variables primero
import styles from "./ListInstrumentos.module.css"; // Importa el módulo CSS
import { CardInstrumento } from "./../CardInstrumento/CardInstrumento";
import { Instrumento } from "../../../types/Instrumento";

interface IListInstrumentos {
  instrumentos: Instrumento[];
  title: string;
}

export const ListInstrumentos: FC<IListInstrumentos> = ({
  instrumentos,
  title,
}) => {
  return (
    <div className={styles.containerPrincipalList}>
      <div className={styles.containerTitle}>
        <h2>{title}</h2>
      </div>
      <div className={styles.containerList}>
        {instrumentos.map((inst) => (
          <CardInstrumento instrumento={inst} key={inst.id} />
        ))}
      </div>
    </div>
  );
};
