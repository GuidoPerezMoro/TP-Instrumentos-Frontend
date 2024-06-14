// ModalInstrumento.tsx
import { useState, useEffect, FC } from "react";
import styles from "./ModalInstrumento.module.css";
import { Instrumento } from "../../../types/Instrumento";
import { Categoria } from "../../../types/Categoria";
import { getAllCategorias } from "../../../services/categoriaApi";

interface ModalInstrumentoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (instrumento: Instrumento) => void;
  instrumentoToEdit?: Instrumento;
}

export const ModalInstrumento: FC<ModalInstrumentoProps> = ({
  isOpen,
  onClose,
  onSave,
  instrumentoToEdit,
}) => {
  const [instrumento, setInstrumento] = useState<Instrumento>({
    id: 0,
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costoEnvio: "",
    cantidadVendida: "",
    descripcion: "",
    categoria: { id: 0, categoria: "" },
    cantidad: 0,
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const fetchCategorias = async () => {
    try {
      const categorias = await getAllCategorias();
      setCategorias(categorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      // Aquí podríamos manejar el error de alguna manera en la UI
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategorias();
    }
  }, [isOpen]);

  useEffect(() => {
    if (instrumentoToEdit) {
      setInstrumento(instrumentoToEdit);
    } else {
      setInstrumento({
        id: 0,
        instrumento: "",
        marca: "",
        modelo: "",
        imagen: "",
        precio: 0,
        costoEnvio: "",
        cantidadVendida: "",
        descripcion: "",
        categoria:
          categorias.length > 0 ? categorias[0] : { id: 0, categoria: "" },
        cantidad: 0,
      });
    }
  }, [instrumentoToEdit, categorias]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "categoria") {
      const categoriaSeleccionada = categorias.find(
        (cat) => cat.id === Number(value)
      );
      if (categoriaSeleccionada) {
        setInstrumento({ ...instrumento, categoria: categoriaSeleccionada });
      }
    } else {
      setInstrumento({ ...instrumento, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(instrumento);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>
          {instrumentoToEdit ? "Editar Instrumento" : "Agregar Instrumento"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Instrumento:
            <input
              type="text"
              name="instrumento"
              value={instrumento.instrumento}
              onChange={handleChange}
            />
          </label>
          <label>
            Marca:
            <input
              type="text"
              name="marca"
              value={instrumento.marca}
              onChange={handleChange}
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              name="modelo"
              value={instrumento.modelo}
              onChange={handleChange}
            />
          </label>
          <label>
            Imagen:
            <input
              type="text"
              name="imagen"
              value={instrumento.imagen}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={instrumento.precio}
              onChange={handleChange}
            />
          </label>
          <label>
            Costo de Envío:
            <input
              type="text"
              name="costoEnvio"
              value={instrumento.costoEnvio}
              onChange={handleChange}
            />
          </label>
          <label>
            Cantidad Vendida:
            <input
              type="text"
              name="cantidadVendida"
              value={instrumento.cantidadVendida}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={instrumento.descripcion}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Categoría:
            <select
              name="categoria"
              value={instrumento.categoria.id}
              onChange={handleChange}
            >
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoria}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.buttonContainer}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
