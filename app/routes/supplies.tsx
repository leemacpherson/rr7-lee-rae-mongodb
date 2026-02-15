import { Form } from "react-router";
import { getDb } from "../../backend/db.server";
import type { Route } from "./+types/supplies";

// Server-side loader: Fetches data from MongoDB
export async function loader() {
  const db = await getDb();
  const data = await db.collection("items").find().toArray();
  // Serialize _id to string for component usage
  return { items: data.map((i) => ({ ...i, _id: i._id.toString() })) };
}

// Server-side action: Handles form submission (Create)
// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const name = formData.get("name");

//   const db = await getDb();
//   await db.collection("items").insertOne({ name, createdAt: new Date() });

//   return { success: true }
// }

export default function Supplies({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>MongoDB Items</h1>
      <ul>
        {items.map((item: any) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <Form method="post">
        <input type="text" name="name" required />
        <button type="submit">Add Item</button>
      </Form>
    </div>
  );
}

// export default function Home({ loaderData }: Route.ComponentProps) {
//   const { items } = loaderData;

//   return (
//     <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
//       <h1>MongoDB Items</h1>
//       <ul>
//         {items.map((item: any) => (
//           <li key={item._id}>{item.name}</li>
//         ))}
//       </ul>
//       <Form method="post">
//         <input type="text" name="name" required />
//         <button type="submit">Add Item</button>
//       </Form>
//     </div>
//   );
// }
