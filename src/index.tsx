import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Account from "./components/pages/Account/Account";
import Cart from "./components/pages/Cart/Cart";

const Home = lazy(() => import("./components/pages/Home/Home"));
const ErrPage = lazy(() => import("./components/pages/ErrPage/ErrPage"));
const ProductsPage = lazy(
  () => import("./components/pages/ProductsPage/ProductsPage")
);
const ProductDetailPage = lazy(
  () => import("./components/pages/ProductDetailPage/ProductDetailPage")
);

const suspenseful = (element: JSX.Element) => {
  return (
    <Suspense
      fallback={
        <div className="LoadingScreen">
          <h1>Loading...</h1>
        </div>
      }
    >
      {element}
    </Suspense>
  ); //TODO: spinner loading page
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
        path: "/account",
        element: suspenseful(<Account />),
      },
      {
        path: "/cart",
        element: suspenseful(<Cart />),
      },
      {
        path: "/products",
        element: suspenseful(<ProductsPage />),
      },
      {
        path: "/product/:productHandle",
        element: suspenseful(<ProductDetailPage />),
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
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
