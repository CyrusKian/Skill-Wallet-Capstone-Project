import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { PropertyListings } from "./components/PropertyListings";
import { PropertyDetail } from "./components/PropertyDetail";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { AddProperty } from "./components/AddProperty";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "properties", Component: PropertyListings },
      { path: "properties/:id", Component: PropertyDetail },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "dashboard", Component: Dashboard },
      { path: "add-property", Component: AddProperty },
      { path: "*", Component: NotFound },
    ],
  },
]);
