import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { preloadPlugin } from "@stackflow/plugin-preload";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";
import React from "react";

import { preloadDataMap } from "./lib/readPreloadData";

declare const window: any;

const activities = {
  Main: React.lazy(() => import("./activities/Main")),
  Article: React.lazy(() => import("./activities/Article")),
};

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
    historySyncPlugin({
      routes: {
        Main: "/",
        Article: "/articles/:articleId",
      },
      fallbackActivity: () => "Main",
    }),
    preloadPlugin({
      loaders: {
        Main({ activityParams, isInitialActivity, initContext, eventContext }) {
          const key = `Main#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            preloadDataMap[key] = {
              _t: "ok",
              data: initContext.data,
            };
          }

          if (!preloadDataMap[key]) {
            const promise = window.___loader
              .loadPage(eventContext["plugin-history-sync"].path)
              .then((result: any) => {
                preloadDataMap[key] = {
                  _t: "ok",
                  data: result.json.data,
                };
              });

            preloadDataMap[key] = {
              _t: "pending",
              promise,
            };
          }

          return {
            key,
          };
        },
        Article({
          activityParams,
          isInitialActivity,
          initContext,
          eventContext,
        }) {
          const key = `Article#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            preloadDataMap[key] = {
              _t: "ok",
              data: initContext.data,
            };
          }

          if (!preloadDataMap[key]) {
            const promise = window.___loader
              .loadPage(eventContext["plugin-history-sync"].path)
              .then((result: any) => {
                preloadDataMap[key] = {
                  _t: "ok",
                  data: result.json.data,
                };
              });

            preloadDataMap[key] = {
              _t: "pending",
              promise,
            };
          }

          return {
            key,
          };
        },
      },
    }),
  ],
});

export type TypeActivities = typeof activities;
