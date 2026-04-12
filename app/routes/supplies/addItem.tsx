import { useState } from "react";
import {
  redirect,
  type ActionFunctionArgs,
  useActionData,
  useNavigate,
} from "react-router";
import { validateSupplyInput } from "../../data/validation.server";
import { getDb } from "~/data/db.server";

import ErrorPage from "~/components/ErrorPage";
import Modal from "../../components/util/Modal";
import SupplyForm from "~/components/SupplyForm";

interface Supply {
  _id: string;
  description: string;
  units: string;
  type: string;
  imageLocation: string;
}

export default function addItem() {
  const navigate = useNavigate();
  const actionData = useActionData();
  const [value, setValue] = useState("none");
  const handleChange = (event: any) => {
    setValue(event.target.value); // Update state on change
  };
  console.log("in addItem, actionData holds ", actionData);

  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }

  return (
    <>
      <Modal>
        <SupplyForm className="w-full md:max-w-3xl" />
      </Modal>
      <h2>This is addItem after modal</h2>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const supplyData = Object.fromEntries(formData);
  console.log(
    "we are in the action() in addItem and supplyData has ",
    supplyData,
  );

  try {
    console.log(
      "ACTION in addItem route, next step is run validateSupplyInput.  supplyData has ",
      supplyData,
    );
    validateSupplyInput(supplyData);
    console.log(
      "ACTION in addItem route, just returned from validateSupplyInput",
    );
  } catch (error) {
    console.log("in addItem, in the catch error ", error);
    return <ErrorPage />;
  }
  const db = await getDb();
  await db.collection("rr7-supplies").insertOne({
    units: supplyData.units,
    amount: supplyData.amount,
    type: supplyData.type,
    location: supplyData.location,
    imageLocation: supplyData.imageLocation,
    description: supplyData.description,
    createdAt: new Date(),
  });

  return redirect("/supplies");
}
