import type { ActionFunctionArgs } from "react-router";
import AuthForm from "~/components/auth/AuthForm";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate user input
  if (authMode === "login") {
    // login logic
  } else {
    // signup logic (create user)
  }
}
