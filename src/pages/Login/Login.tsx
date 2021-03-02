import React from "react";

import { FunctionComponent } from "react";
import styles from "./index.scss";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = (props) => {

  return <main className={styles.main}>
    <nav>导航栏</nav>
  </main>;

};



export default Login
