import React, { lazy } from "react";

const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import()),
  },
];
