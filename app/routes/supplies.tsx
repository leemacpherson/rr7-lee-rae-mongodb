import type { Route } from "./+types/supplies";

export async function clientLoader() {}

export default function Supplies({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return <div>Supplies</div>;
}
