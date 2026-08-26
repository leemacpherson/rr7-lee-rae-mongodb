import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("supplies", "routes/supplies.tsx", [
    route(":id", "routes/supplies/$id.jsx"),
    route("add", "routes/supplies/addItem.tsx"),
  ]),
  route("plants", "routes/plants.tsx", [
    route(":id", "routes/plants/$id.jsx"),
    route("add", "routes/plants/addItem.tsx"),
  ]),
  route("dashboard", "routes/dashboard/DashboardLayout.jsx", [
    index("routes/dashboard/DashboardHome.jsx"),
    route("settings", "routes/dashboard/DashboardSettings.jsx"),
    route("profile", "routes/dashboard/DashboardProfile.jsx"),
  ]),
  route("forms", "routes/forms.tsx"),
  route("contact", "routes/contact.tsx"),
  route("auth", "routes/auth.tsx"),
] satisfies RouteConfig;
