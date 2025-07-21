import { Home } from "../pages/auth";
import { Zakas } from "../pages/dashboard";
import Category from "../pages/dashboard/Category";
import Product from "../pages/dashboard/Product";
import Site from "../pages/dashboard/Site";

export const paths = {
  home: "/",
  login: "/login",
  product: "/products",
  zakas: "/zakas",
  category: "/category",
  site: "/site",
};

export const DashboardList = [
  {
    id: 1,
    path: paths.home,
    element: <Home />,
  },
  {
    id: 2,
    path: paths.product,
    element: <Product />,
  },
  {
    id: 3,
    path: paths.zakas,
    element: <Zakas />,
  },
  {
    id: 4,
    path: paths.category,
    element: <Category />,
  },
  {
    id: 5,
    path: paths.site,
    element: <Site />,
  },
];

export const DashboardNavList = [
  {
    key: 1,
    label: "Product",
    path: paths.product,
  },
  {
    key: 2,
    label: "Zakas",
    path: paths.zakas,
  },
  {
    key: 3,
    label: "Category",
    path: paths.category,
  },
  {
    key: 4,
    label: "Site",
    path: paths.site,
  },
];
