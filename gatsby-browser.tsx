import "normalize.css";
import "@seed-design/stylesheet/global.css";
import "@stackflow/plugin-basic-ui/index.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "./src/styles/index.css";
import "./src/styles/f.css";

import { WrapPageElementBrowserArgs } from "gatsby";
import React from "react";

import { Stack } from "./src/stackflow";

export const wrapPageElement = ({
  props: { location, data },
}: WrapPageElementBrowserArgs) => (
  <React.StrictMode>
    <React.Suspense>
      <Stack initialContext={{ req: { path: location.pathname }, data }} />
    </React.Suspense>
  </React.StrictMode>
);
