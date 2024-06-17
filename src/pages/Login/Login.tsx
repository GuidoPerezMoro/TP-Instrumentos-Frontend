// Login.tsx
import { Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getByUsernameAndPassword } from "../../services/UsuarioApi";

export const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await getByUsernameAndPassword(username, password);
      if (user) {
        login(user.id, user.username, user.rol);
        navigate("/");
        //console.log(user);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(
        "Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo."
      );
    }
  };

  const handleGuestContinue = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <span
          style={{ fontSize: "10vh" }}
          className="material-symbols-outlined"
        >
          person
        </span>
        <Form onSubmit={handleSubmitForm} className={styles.form}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.label}>Usuario</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              value={username}
              type="text"
              placeholder="Usuario"
              required
              className={styles.input}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.label}>Contraseña</Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
              required
              className={styles.input}
            />
          </Form.Group>
          <div className={styles.switchContainer}>
            <Form.Check
              type="switch"
              onChange={() => setShowPass(!showPass)}
              id="show-password"
              label="Mostrar contraseña"
              className={styles.switch}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button variant="primary" type="submit" className={styles.button}>
              Iniciar Sesión
            </Button>
          </div>
        </Form>
        <div className={styles.linkContainer}>
          <Link to="/register" className={styles.registerLink}>
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleGuestContinue}
          >
            Continuar como invitado
          </Button>
        </div>
      </div>
    </div>
  );
};
