import React from "react";

import { FunctionComponent } from "react";

interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello: FunctionComponent<HelloProps> = (props) => {

  return <div>Hello {props.compiler} {props.framework}!</div>;

};



export default Hello
