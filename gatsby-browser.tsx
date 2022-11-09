import "normalize.css";
import "@seed-design/stylesheet/global.css";
import "@stackflow/plugin-basic-ui/index.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "./src/styles/index.css";
import "./src/styles/f.css";

import { WrapPageElementBrowserArgs } from "gatsby";
import React from "react";
import ReactDOM from "react-dom/client";

import { Stack } from "./src/stackflow";

export const wrapPageElement = ({
  props: { location, data },
}: WrapPageElementBrowserArgs) => (
  <React.StrictMode>
    <React.Suspense>
      <Stack initContext={{ req: { path: location.pathname }, data }} />
    </React.Suspense>
  </React.StrictMode>
);

export const replaceHydrateFunction = () => (element, container) => {
  ReactDOM.hydrateRoot(container, element);
};
