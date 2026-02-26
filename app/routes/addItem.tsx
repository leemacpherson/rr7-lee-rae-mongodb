import { useState } from "react";
import { redirect, type ActionFunctionArgs, Form } from "react-router";
import { validateSupplyInput } from "../data/validation.server";
import { getDb } from "~/data/db.server";

import EditItem from "../components/editItem";

interface Supply {
  _id: string;
  description: string;
  units: string;
  type: string;
  imageLocation: string;
}

export default function addItem() {
  const [value, setValue] = useState("none");
  const handleChange = (event: any) => {
    setValue(event.target.value); // Update state on change
  };

  return <EditItem />;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // const name = formData.get("name") as string;
  // const email = formData.get("email") as string;
  const supplyData = Object.fromEntries(formData);
  console.log(
    "we are in the action() in addItem and supplyData has ",
    supplyData,
  );

  try {
    console.log(
      "ACTION in addItem route, next step is run validateSupplyInput",
    );
    validateSupplyInput(supplyData);
    console.log(
      "ACTION in addItem route, just returned from validateSupplyInput",
    );
  } catch (error) {
    console.log("in addItem, in the catch error");
    return error;
  }
  const db = await getDb();
  await db
    .collection("rr7-supplies")
    .insertOne({
      units: supplyData.units,
      amount: supplyData.amount,
      type: supplyData.type,
      location: supplyData.location,
      description: supplyData.description,
      createdAt: new Date(),
    });
  console.log("ACTION in addItem route, right after insertOne");
  return redirect("/supplies");
}
