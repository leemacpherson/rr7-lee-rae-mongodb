// /supplys/<some-id> => /supplys/supply-1, /supplys/e-1

import { redirect } from "react-router";
import { useNavigate } from "react-router";

import SupplyForm from "~/components/SupplyForm";
import Modal from "~/components/util/Modal";
import { updateSupply, deleteSupply } from "~/data/supplies.server";
import { validateSupplyInput } from "~/data/validation.server";
// import { getSupply } from '~/data/supplys.server';

export default function UpdateSupplysPage() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <SupplyForm />
    </Modal>
  );
}

export async function action({ params, request }) {
  const supplyId = params.id;
  const supplyImageId = params.imageId;

  console.log("in $id.jsx and params is: ", params);
  console.log("in $id.jsx and request.method is: ", request.method);

  if (request.method === "PATCH") {
    console.log("in $id, and method = PATCH  ");
    const formData = await request.formData();
    console.log(`we returned from the request.formData()`);
    const supplyData = Object.fromEntries(formData);
    console.log(
      `we ran Object.fromEntries(formData) and got ${supplyData} back`,
    );

    try {
      validateSupplyInput(supplyData);
    } catch (error) {
      return error;
    }

    await updateSupply(supplyId, supplyData);
    return redirect("/supplies");
  } else if (request.method === "DELETE") {
    console.log("in $id, the delete request holds ", request);
    await deleteSupply(supplyId);
    return { deletedId: supplyId };
  }
}

export function loader({ params }) {
  console.log("in $id.jsx loader and params is: ", params);
  const supplyId = params.id;
  console.log("in $id.jsx loader and supplyId is: ", supplyId);
  // const supplyData = getSupply(supplyId);
  // console.log("in $id.jsx loader and supplyData is: ", supplyData);
  return null;
}
