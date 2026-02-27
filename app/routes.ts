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
  route("dashboard", "routes/dashboard/DashboardLayout.jsx", [
    index("routes/dashboard/DashboardHome.jsx"),
    route("settings", "routes/dashboard/DashboardSettings.jsx"),
    route("profile", "routes/dashboard/DashboardProfile.jsx"),
  ]),
  route("forms", "routes/forms.tsx"),
  // route("dashboard", "routes/DashboardHome.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
