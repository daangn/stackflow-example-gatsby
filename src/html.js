/* eslint-disable */

import PropTypes from "prop-types";
import React from "react";
import dedent from "ts-dedent";

const SEED_SCALE_COLOR_SCRIPT = dedent`
  (() => {var e=document.documentElement;e.dataset.seed="";var pd=window.matchMedia("(prefers-color-scheme: dark)"),a=()=>{e.dataset.seedScaleColor=pd.matches?"dark":"light"};"addEventListener"in pd?pd.addEventListener("change",a):"addListener"in pd&&pd.addListener(a),a();})()
`;
const STACKFLOW_BASIC_UI_THEME_SCRIPT = dedent`
  (() => {var c=/iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase()),e=document.documentElement;e.dataset.stackflowBasicUiTheme=c?"cupertino":"android";})()
`;

export default function HTML(props) {
  return (
    <html
      {...props.htmlAttributes}
      data-seed=""
      data-seed-scale-color="light"
      data-stackflow-basic-ui-theme="android"
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: SEED_SCALE_COLOR_SCRIPT,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: STACKFLOW_BASIC_UI_THEME_SCRIPT,
          }}
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
