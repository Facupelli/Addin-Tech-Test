import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";

import Button from "../Button/Button";

import s from "./FormCard.module.css";

export default function FormCard({ title, login }) {
  const navigate = useNavigate();

  const { setEmail, setUserId } = useContext(UserContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleErrors = (e) => {
    if (e.email) setError((prev) => ({ ...prev, email: e.email }));
    if (e.password) setError((prev) => ({ ...prev, password: e.password }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({
      email: "",
      password: "",
    });

    try {
      const { data } = await axios.post(
        `http://localhost:3001/auth/${login ? "login" : "register"}`,
        { ...values },
        {
          withCredentials: true,
        }
      );

      if (data.errors) {
        handleErrors(data.errors);
      }

      if (data && !data.errors) {
        setEmail(data.user.email);
        setUserId(data.user.id);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={s.form}>
      <h1>{login ? "INICIAR SESIÓN" : "REGISTRARSE"}</h1>
      <div>
        <label>Email</label>
        <input
          className={s.input}
          type="text"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="hola@gmail.com"
        />
        <p className={s.error}>{error?.email}</p>
      </div>

      <div>
        <label>Contraseña</label>
        <input
          className={s.input}
          type="password"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <p className={s.error}>{error?.password}</p>
      </div>

      <Button
        type="submit"
        text="INICIAR SESIÓN"
        handleClick={onSubmit}
        disabled={!values.email && !values.password}
      />

      {login ? (
        <p>
          No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      ) : (
        <p>
          Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      )}
    </form>
  );
}
