import "normalize.css";
import "@seed-design/stylesheet/global.css";
import "@stackflow/basic-ui/index.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "./src/styles/index.css";
import "./src/styles/f.css";

import { WrapPageElementBrowserArgs } from "gatsby";
import React from "react";

import { AppScreenThemeProvider } from "./src/AppScreenThemeContext";
import { Stack } from "./src/stackflow";

export const wrapPageElement = ({
  props: { location, data },
}: WrapPageElementBrowserArgs) => (
  <React.StrictMode>
    <AppScreenThemeProvider>
      <React.Suspense>
        <Stack initContext={{ req: { path: location.pathname }, data }} />
      </React.Suspense>
    </AppScreenThemeProvider>
  </React.StrictMode>
);
