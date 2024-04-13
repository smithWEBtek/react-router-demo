import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, {action as editAction} from "./routes/edit";
import Index from "./routes/index";
import {action as destroyAction} from "./routes/destroy";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
      loader={rootLoader}
      action={rootAction}
    >
      <Route errorElement={<ErrorPage />} />
      <Route index element={<Index />} />
      <Route
        path="contacts/:contactId"
        element={<Contact />}
        loader={contactLoader}
        action={contactAction}
      />
      <Route
        path="contacts/:contactId/edit"
        element={<EditContact />}
        loader={contactLoader}
        action={editAction}
      />
      <Route
        path="contacts/:contactId/destroy"
        action={destroyAction}
        errorElement={<div>Oops error!</div>}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
