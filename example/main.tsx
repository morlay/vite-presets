import { render } from "react-dom";
import React, { useEffect, useState } from "react";
import { toSnakeCase } from "./add.web-worker";

const App = () => {
  const [v, setV] = useState("hello world");

  useEffect(() => {
    import("lodash").then(({ toUpper }) => {
      toSnakeCase(v).then((v) => {
        setV(`${toUpper(v)} / ${v}`);
      });
    });
  }, []);

  return <h1>{v}</h1>;
};

render(
  <App />,
  document.getElementById("root"),
);