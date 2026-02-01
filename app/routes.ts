import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),

  ...prefix("supplies", [
    index("routes/supplies.tsx"),
    route(":supplyName", "routes/supply.tsx"),
  ]),
] satisfies RouteConfig;
