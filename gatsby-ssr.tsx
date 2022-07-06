import React from "react";
import { WrapPageElementBrowserArgs } from "gatsby";
import { AppScreenThemeProvider } from './src/AppScreenThemeContext'
import { Stack } from './src/stackflow'

export const wrapPageElement = ({ props: { location, data } }: WrapPageElementBrowserArgs) => {
  return (
    <React.StrictMode>
      <AppScreenThemeProvider>
        <React.Suspense>
          <Stack context={{ req: { path: location.pathname }, data }}/>
        </React.Suspense>
      </AppScreenThemeProvider>
    </React.StrictMode>
  );
};
