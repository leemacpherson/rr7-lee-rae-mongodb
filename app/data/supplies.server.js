import { ObjectId } from "mongodb";
import { validateSupplyInput } from "./validation.server";
import { getDb } from "./db.server";
import uploadFileHandler from "~/data/upload-file-utility.server.mjs";

let supplyData;

const supplyDataHandler = async ({ request }) => {
  console.log("in supplyDataHandler");
  const formData = await request.formData();
  console.log("formData is ", formData);
  // Custom logic to validate and process other form fields
  supplyData = {
    supplyType: formData.get("supplyType"),
    description: formData.get("description"),
    units: formData.get("units"),
    location: formData.get("location"),
    amount: Number(formData.get("amount")),
    date: formData.get("date"),
    // imageLocation: formData.get("fileUpload"), // This will be the value returned from uploadFileHandler
  };
  return supplyData;
};
// this happens in the action function in addItem.tsx, so we don't need it here

// export async function addSupplyItem() {
//   // retreive the form data
//   console.log("SS-addSupply-1 in supplies.server, addSupply just started");

//   const supplyData = supplyDataHandler();
//   console.log(
//     "SS-addSupply-2 in supplies.server, returned from supplyDataHandler:",
//     supplyData,
//   );

//   // see if there is a file being submitted (photo)

//   try {
//     const filename = await uploadFileHandler();
//     if (filename) {
//       console.log("returned from uploadFileHandler");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }

//   try {
//     const db = await getDb();

//     // 3. Direct MongoDB Driver Usage
//     let insertResults;
//     insertResults = await db.collection("rr7-supplies").insertOne({
//       units: supplyData.units,
//       amount: supplyData.amount,
//       supplyType: supplyData.supplyType,
//       location: supplyData.location,
//       imageLocation:
//         "https://helpwithapi.com/supplies/blue-pot-12h-8w-small.jpeg",
//       description: supplyData.description,
//       createdAt: new Date(),
//       date: supplyData.date,
//     });

//     console.log(`Inserted with ID: ${insertResults.insertedId}`);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function deleteSupply(id) {
  console.log("in supplies.server, deleteSupply just started, the id is ", id);

  try {
    const db = await getDb();
    // const submittedId = `ObjectId('${id}')`; // Assuming id is already a string
    // console.log("submittedId is ", submittedId);
    const deletionResult = await db.collection("rr7-supplies").deleteOne({
      _id: new ObjectId(id), // Convert string to ObjectId
    });
    console.log("deletionResult is ", deletionResult);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSupplies() {
  const db = await getDb();
  const data = await db.collection("rr7-supplies").find().toArray();
  // console.log(
  //   "LOADER in supplies.server, when we run getDb( what we get back is ",
  //   data,
  // );
  // Serialize _id to string for component usage
  return {
    items: data.map((i) => ({ ...i, _id: i._id.toString() })),
  };
}

export async function updateSupply(id, supplyData) {
  console.log(
    `in supplies.server updateSupply and id is ${id} and supplyData is ${supplyData}`,
  );
  try {
    const db = await getDb();
    const collection = db.collection("rr7-supplies");

    console.log(
      "7. in updateSupply just got db from getDb in supplies.server >>",
      db,
    );
    // const data = await db.collection("rr7-supplies").find().toArray();
    const data = await db.collection("rr7-supplies").find().toArray();
    console.log(
      "8. in updateSupply just sent find to mongoDB in supplies.server ",
    );

    try {
      validateSupplyInput(supplyData);
      console.log(
        "9a. in updateSupply try block, just ran validateSupplyInput and it did not throw an error",
      );
    } catch (error) {
      console.log(
        "9b. in updateSupply catch block, just ran validateSupplyInput and it threw this error",
        error,
      );
      return error;
    }

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          units: supplyData.units,
          location: supplyData.location,
          amount: supplyData.amount,
          supplyType: supplyData.supplyType,
          description: supplyData.description,
          date: supplyData.date,
        },
      },
    );

    console.log("10. in updateSupply, updateResult is ", updateResult);
  } catch (error) {
    console.log(
      "in the catch block for updateSupply and the error is >>",
      error,
    );
    throw error;
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  // Custom logic to validate and process other form fields

  supplyData = {
    supplyType: formData.get("supplyType"),
    description: formData.get("description"),
    units: formData.get("units"),
    location: formData.get("location"),
    amount: Number(formData.get("amount")),
    date: formData.get("date"),
    imageLocation: formData.get("fileUpload"), // This will be the value returned from uploadFileHandler
  };
  console.log("SS-action-1 in supplies.server, supplyData:", supplyData);
  return supplyData;
  //   await uploadFileHandler();
}
