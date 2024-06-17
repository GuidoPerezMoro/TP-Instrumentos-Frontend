// ProductosTabla.tsx
import { FC, useEffect, useState } from "react";
import "../../styles/variables.css"; // Importa las variables primero
import styles from "./ProductosTabla.module.css"; // Importa el módulo CSS
import {
  createInstrumento,
  deleteInstrumento,
  editInstrumento,
  getAllInstrumentos,
} from "../../services/instrumentoApi";
import { Instrumento } from "../../types/Instrumento";
import { ModalInstrumento } from "../../components/ui/ModalInstrumento/ModalInstrumento";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

export const ProductosTabla: FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instrumentoToEdit, setInstrumentoToEdit] =
    useState<Instrumento | null>(null);
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const fetchInstrumentos = async () => {
    await getAllInstrumentos()
      .then((data) => {
        setInstrumentos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los instrumentos:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (id: number) => {
    await deleteInstrumento(id);
    fetchInstrumentos();
  };

  const handleEdit = (instrumento: Instrumento) => {
    setInstrumentoToEdit(instrumento);
    setIsModalOpen(true);
  };

  const handleSave = async (instrumento: Instrumento) => {
    if (instrumentoToEdit) {
      await editInstrumento(instrumento.id, instrumento);
    } else {
      await createInstrumento(instrumento);
    }
    fetchInstrumentos();
  };

  const handleViewPoint = (id: number) => {
    navigate(`/producto/${id}`);
  };

  const openModal = () => {
    setInstrumentoToEdit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchInstrumentos();
  }, []);

  if (loading) {
    return <div>Obteniendo instrumentos...</div>;
  }

  // A la ruta solo pueden acceder los roles DEVELOPER, ADMIN, OPERADOR
  return (
    <>
      <h1 className={styles.title}>Tabla de instrumentos</h1>
      {isAuthenticated && (role == "DEVELOPER" || role == "ADMIN") && (
        <Button
          variant="primary"
          onClick={openModal}
          className={`${styles.button} ${styles["button-add"]}`}
        >
          Agregar Instrumento
        </Button>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nombre</th>
            <th className={styles.th}>Categoría</th>
            <th className={styles.th}>Precio</th>
            <th className={styles.th}>Editar</th>
            {isAuthenticated && (role == "DEVELOPER" || role == "ADMIN") && (
              <th className={styles.th}>Eliminar</th>
            )}
          </tr>
        </thead>
        <tbody>
          {instrumentos.map((instrumento) => (
            <tr key={instrumento.id} className={styles.tr}>
              <td
                className={`${styles.td} ${styles["instrumento-nombre"]}`}
                onClick={() => handleViewPoint(instrumento.id)}
              >
                {instrumento.instrumento}
              </td>
              <td className={styles.td}>{instrumento.categoria.categoria}</td>
              <td className={styles.td}>${instrumento.precio}</td>
              <td className={styles.td}>
                <button
                  className={`${styles.button} ${styles["button-edit"]}`}
                  onClick={() => handleEdit(instrumento)}
                >
                  Editar
                </button>
              </td>
              {isAuthenticated && (role == "DEVELOPER" || role == "ADMIN") && (
                <td className={styles.td}>
                  <button
                    className={`${styles.button} ${styles["button-delete"]}`}
                    onClick={() => handleDelete(instrumento.id)}
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ModalInstrumento
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        instrumentoToEdit={instrumentoToEdit || undefined}
      />
    </>
  );
};
