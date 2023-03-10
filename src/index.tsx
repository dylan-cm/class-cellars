import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";

const Home = lazy(() => import("./components/pages/Home/Home"));
const ErrPage = lazy(() => import("./components/pages/ErrPage/ErrPage"));
const ComponentTesting = lazy(
  () => import("./components/pages/ComponentTesting/ComponentTesting")
);

const suspenseful = (element: JSX.Element) => {
  return <Suspense fallback={<h1>Loading...</h1>}>{element}</Suspense>; //TODO: spinner loading page
};

const router = createBrowserRouter([
  {
    path: "/",
    element: suspenseful(<Root />),
    children: [
      {
        path: "",
        element: suspenseful(<Home />),
      },
      {
        path: "/test",
        element: suspenseful(<ComponentTesting />),
      },
      {
        path: "*",
        element: suspenseful(<ErrPage />),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
