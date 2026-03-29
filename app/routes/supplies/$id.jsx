// /supplys/<some-id> => /supplys/supply-1, /supplys/e-1

import { redirect } from "react-router";
import { useNavigate } from "react-router";

import SupplyForm from "~/components/SupplyForm";
import Modal from "~/components/util/Modal";
import { deleteSupply } from "~/data/supplies.server";
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

  console.log("in $id.jsx and params is: ", params);
  console.log("in $id.jsx and supplyId is: ", supplyId);
  console.log("in $id.jsx and request.method is: ", request.method);

  if (request.method === "PATCH") {
    console.log("in $id, the patch PATCH  ");
    const formData = await request.formData();
    const supplyData = Object.fromEntries(formData);

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
