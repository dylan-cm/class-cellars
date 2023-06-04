import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Cart from "./components/pages/Cart/Cart";
import { BeatLoader } from "react-spinners";
import NotFound from "./components/pages/NotFound/NotFound";

const Home = lazy(() => import("./components/pages/Home/Home"));
const ProductsPage = lazy(() => import("./components/pages/Cellar/Cellar"));
const ProductDetailPage = lazy(
  () => import("./components/pages/ProductDetailPage/ProductDetailPage")
);

const suspenseful = (element: JSX.Element) => {
  return (
    <Suspense
      fallback={
        <div className="LoadingScreen">
          <BeatLoader size={36} color={"#cb002d"} />
        </div>
      }
    >
      {element}
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: suspenseful(<Root />),
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: suspenseful(<Home />),
      },
      {
        path: "/cart",
        element: suspenseful(<Cart />),
      },
      {
        path: "/cart/:productHandle/",
        element: suspenseful(<ProductDetailPage back="cart" />),
      },
      {
        path: "/cellar",
        element: suspenseful(<ProductsPage />),
        children: [],
      },
      {
        path: "/cellar/:productHandle",
        element: suspenseful(<ProductDetailPage back="cellar" />),
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

serviceWorkerRegistration.unregister();
reportWebVitals();
