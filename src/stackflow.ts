import { vars } from "@seed-design/design-token";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
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

const theme =
  typeof window !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
    ? "cupertino"
    : "android";

const borderColor =
  theme === "cupertino"
    ? vars.$semantic.color.divider3
    : vars.$semantic.color.divider2;

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme,
      backgroundColor: vars.$semantic.color.paperDefault,
      appBar: {
        borderColor,
        textColor: vars.$scale.color.gray900,
        iconColor: vars.$scale.color.gray900,
      },
    }),
    historySyncPlugin({
      routes: {
        Main: "/",
        Article: "/articles/:articleId",
      },
      fallbackActivity: () => "Main",
    }),
    preloadPlugin({
      loaders: {
        Main({
          activityParams,
          isInitialActivity,
          initialContext,
          activityContext,
        }) {
          const key = `Main#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            preloadDataMap[key] = {
              _t: "ok",
              data: initialContext.data,
            };
          }

          if (!preloadDataMap[key]) {
            const promise = window.___loader
              .loadPage((activityContext as any).path)
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
          initialContext,
          activityContext,
        }) {
          const key = `Article#${JSON.stringify(activityParams)}`;

          if (isInitialActivity) {
            preloadDataMap[key] = {
              _t: "ok",
              data: initialContext.data,
            };
          }

          if (!preloadDataMap[key]) {
            const promise = window.___loader
              .loadPage((activityContext as any).path)
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
