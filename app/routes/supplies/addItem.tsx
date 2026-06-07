import { redirect, type ActionFunctionArgs, useNavigate } from "react-router";

import Modal from "~/components/util/Modal";
import SupplyForm from "~/components/SupplyForm";
import { addSupply } from "~/data/supplies.server";

interface Supply {
  _id: string;
  description: string;
  units: string;
  type: string;
  imageLocation: string;
  location: string;
  amount: number;
  date: string;
  fileUpload: string;
}

interface AddItemProps {
  request: Request;
}

export default function addItem() {
  const navigate = useNavigate();

  console.log("in addItem() ");

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

export async function action() {
  // go to the backend file handler

  try {
    await addSupply();
    console.log("addItem.action - after addSupply");
  } catch (error) {
    // console.log(error);
    console.log("addItem.action - during catch block");
    throw error;
  }

  console.log("addItem.action - after the try/ catch block");

  // Proceed with other form values

  return;
}

// ORIGINAL first version with file handline

//   return redirect("/supplies");

// }
