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
import { InstantSearch } from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";
import Terms from "./components/pages/Terms/Terms";

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

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || "",
  process.env.REACT_APP_ALGOLIA_API_KEY || ""
);

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
      {
        path: "/terms",
        element: suspenseful(<Terms />),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <InstantSearch searchClient={searchClient} indexName="shopify_products">
    <RouterProvider router={router} />
  </InstantSearch>
  // </React.StrictMode>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
