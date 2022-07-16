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
        <Stack context={{ req: { path: location.pathname }, data }} />
      </React.Suspense>
    </AppScreenThemeProvider>
  </React.StrictMode>
);
