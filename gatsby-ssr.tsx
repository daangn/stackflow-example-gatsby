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
