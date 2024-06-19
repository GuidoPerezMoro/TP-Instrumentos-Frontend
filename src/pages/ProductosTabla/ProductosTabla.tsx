// ProductosTabla.tsx

import { FC, useEffect, useState } from "react";
import "../../styles/variables.css";
import styles from "./ProductosTabla.module.css";
import {
  createInstrumento,
  deleteInstrumento,
  editInstrumento,
  getAllInstrumentos,
} from "../../services/instrumentoApi";
import { Instrumento } from "../../types/Instrumento";
import { ModalInstrumento } from "../../components/ui/ModalInstrumento/ModalInstrumento";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap"; // Importa Form para el dropdown
import { useAuth } from "../../hooks/useAuth";
import GenerateExcel from "../../components/GenerateExcel/GenerateExcel";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getAllCategorias } from "../../services/categoriaApi";

export const ProductosTabla: FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instrumentoToEdit, setInstrumentoToEdit] =
    useState<Instrumento | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("Todas");
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

  const fetchCategorias = async () => {
    await getAllCategorias()
      .then((data) => {
        setCategorias([
          "Todas",
          ...data.map((cat: { categoria: string }) => cat.categoria),
        ]);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteInstrumento(id);
      console.log(`Instrumento con id ${id} eliminado.`);
      fetchInstrumentos();
      console.log("Instrumentos actualizados después de la eliminación.");
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
      fetchInstrumentos();
    }
  };

  const handleEdit = (instrumento: Instrumento) => {
    setInstrumentoToEdit(instrumento);
    setIsModalOpen(true);
  };

  const handleSave = async (instrumento: Instrumento) => {
    console.log("Datos que se envían al servidor:", instrumento);
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

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getNestedProperty = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const sortedInstrumentos = () => {
    let sorted = [...instrumentos];
    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        const aValue = getNestedProperty(a, sortConfig.key);
        const bValue = getNestedProperty(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted.filter(
      (instrumento) =>
        selectedCategoria === "Todas" ||
        instrumento.categoria.categoria === selectedCategoria
    );
  };

  useEffect(() => {
    fetchInstrumentos();
    fetchCategorias();
  }, []);

  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };

  if (loading) {
    return <div>Obteniendo instrumentos...</div>;
  }

  return (
    <>
      <h1 className={styles.title}>Tabla de instrumentos</h1>
      <Box>
        {isAuthenticated && (role === "DEVELOPER" || role === "ADMIN") && (
          <Box>
            <Button
              variant="primary"
              onClick={openModal}
              className={`${styles.button} ${styles["button-add"]}`}
            >
              <AddIcon className={styles.icon} />
              Agregar Instrumento
            </Button>
          </Box>
        )}
        <Box>
          {isAuthenticated && (role == "DEVELOPER" || role == "ADMIN") && (
            <Box>
              <div className={styles.excelSection}>
                <Box>
                  <div className={styles.dateInputContainer}>
                    <label className={styles.dateLabel} htmlFor="startDate">
                      Desde:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={styles.dateInput}
                    />
                  </div>
                </Box>
                <Box>
                  <div className={styles.dateInputContainer}>
                    <label className={styles.dateLabel} htmlFor="endDate">
                      Hasta:
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={styles.dateInput}
                    />
                  </div>
                </Box>
                <Box>
                  <GenerateExcel startDate={startDate} endDate={endDate} />
                </Box>
              </div>
            </Box>
          )}
        </Box>
      </Box>

      <Box className={styles.filterSection}>
        <Form.Group controlId="categoriaFiltro" className={styles.filterGroup}>
          <Form.Label className={styles.filterLabel}>
            Filtrar por categoría
          </Form.Label>
          <div className={styles.filterSelectContainer}>
            <Form.Control
              as="select"
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className={styles.filterSelect}
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </Form.Control>
            <span className={styles.selectArrow}></span>
          </div>
        </Form.Group>
      </Box>

      <Box>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                className={styles.th}
                onClick={() => handleSort("instrumento")}
              >
                Nombre {getSortIndicator("instrumento")}
              </th>
              <th
                className={styles.th}
                onClick={() => handleSort("categoria.categoria")}
              >
                Categoría {getSortIndicator("categoria.categoria")}
              </th>
              <th className={styles.th} onClick={() => handleSort("precio")}>
                Precio {getSortIndicator("precio")}
              </th>
              <th className={styles.th}>Editar</th>
              {isAuthenticated &&
                (role === "DEVELOPER" || role === "ADMIN") && (
                  <th className={styles.th}>Eliminar</th>
                )}
            </tr>
          </thead>
          <tbody>
            {sortedInstrumentos().map((instrumento) => (
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
                {isAuthenticated &&
                  (role === "DEVELOPER" || role === "ADMIN") && (
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
      </Box>
      <ModalInstrumento
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        instrumentoToEdit={instrumentoToEdit || undefined}
      />
    </>
  );
};
