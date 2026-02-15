import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("addItem", "routes/addItem.tsx"),
  ...prefix("supplies", [
    index("routes/supplies.tsx"),
    route(":supplyName", "routes/supply.tsx"),
  ]),
  route("forms", "routes/forms.tsx"),
] satisfies RouteConfig;
