import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { stackflow } from "@stackflow/react";

import { preloadDataMap } from "./lib/readPreloadData";
import React, { startTransition } from 'react';

declare const window: any

const activities = {
  Main: React.lazy(() => import("./activities/Main")),
  Article: React.lazy(() => import("./activities/Article")),
}

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [basicRendererPlugin(), historySyncPlugin({
    routes: {
      Main: "/",
      Article: "/articles/:articleId",
    },
    fallbackActivity: () => "Main",
    experimental_initialPreloadRef({ context, activityId }) {
      if (!preloadDataMap[activityId]) {
        preloadDataMap[activityId] = {
          _t: "ok",
          data: context.data
        }
      }
      return {
        activityId,
      }
    },
    experimental_preloadRef({ path, activityId }) {
      if (!preloadDataMap[activityId]) {
        const promise = window.___loader
          .loadPage(path)
          .then((result: any) => {
            preloadDataMap[activityId] = {
              _t: 'ok',
              data: result.json.data
            }
          })
  
        preloadDataMap[activityId] = {
          _t: 'pending',
          promise,
        }
      }

      return {
        activityId,
      }
    },
    experimental_startTransition: startTransition,
  })],
});

export type TypeActivities = typeof activities
