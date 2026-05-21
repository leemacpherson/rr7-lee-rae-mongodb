import { ObjectId } from "mongodb";
import { validateSupplyInput } from "./validation.server";
import { getDb } from "./db.server";

export async function addSupply(supplyData) {
  console.log("in supplies.server, supplyData is ", supplyData);
  try {
    // 3. Direct MongoDB Driver Usage
    const result = await db.collection("rr7-supplies").insertOne({
      supplyData,
    });
    console.log("result of insertOne is ", result);

    console.log(`Inserted with ID: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
