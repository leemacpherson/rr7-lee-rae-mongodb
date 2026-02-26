import {
  type RouteConfig,
  index,
  layout,
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
  ...prefix("dashboard", [
    layout("routes/Dashboard/DashboardLayout.jsx"),
    route("DashboardSettings", "routes/Dashboard/DashboardSettings.jsx"),
    route("DashboardProfile", "routes/Dashboard/DashboardProfile.jsx"),
  ]),
  route("forms", "routes/forms.tsx"),
  // route("dashboard", "routes/DashboardHome.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
