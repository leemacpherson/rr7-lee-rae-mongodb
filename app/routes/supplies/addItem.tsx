import {
  redirect,
  type ActionFunctionArgs,
  useActionData,
  useNavigate,
} from "react-router";
import { validateSupplyInput } from "~/data/validation.server";
import { getDb } from "~/data/db.server";

import ErrorPage from "~/components/ErrorPage";
import Modal from "~/components/util/Modal";
import SupplyForm from "~/components/SupplyForm";

interface Supply {
  _id: string;
  description: string;
  units: string;
  type: string;
  imageLocation: string;
  location: string;
  amount: number;
  date: string;
}

export default function addItem() {
  const navigate = useNavigate();
  const actionData = useActionData();

  console.log("in addItem, actionData holds ", actionData);

  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }

  return (
    <>
      <Modal>
        <SupplyForm />
      </Modal>
      <h2>This is addItem after modal</h2>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const supplyData = Object.fromEntries(formData);

  console.log(
    "-----we are in the action() in addItem and supplyData has ",
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
  console.log(
    "in addItem action, just got db connection, now about to insertOne with supplyData: ",
    supplyData,
  );
  let insertResults;
  insertResults = await db.collection("rr7-supplies").insertOne({
    units: supplyData.units,
    amount: supplyData.amount,
    supplyType: supplyData.supplyType,
    location: supplyData.location,
    imageLocation:
      "https://helpwithapi.com/supplies/blue-pot-12h-8w-small.jpeg",
    description: supplyData.description,
    createdAt: new Date(),
    date: supplyData.date,
  });
  console.log("in addItem action, insertOne results is ", insertResults);

  return redirect("/supplies");
}
