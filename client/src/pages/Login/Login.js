import FormCard from "../../components/FormCard/FormCard";

import s from "./Login.module.css";

function Login() {
  return (
    <main className={s.main}>
      <FormCard login />
    </main>
  );
}

export default Login;
