import { ObjectId } from "mongodb";
import { validateSupplyInput } from "./validation.server";
import { getDb } from "./db.server";
import { deleteDOFile } from "~/data/s3.server";

export async function deleteSupply(id) {
  try {
    const db = await getDb();
    const submittedId = `${id})`; // Assuming id is already a string
    console.log("submittedId is ", submittedId);

    // delete the associated image from S3.  Find the imageLocation in the database first, then delete it from S3
    const supplyItem = await db.collection("rr7-supplies").findOne({
      _id: new ObjectId(id), // Convert string to ObjectId
    });

    if (supplyItem && supplyItem.imageLocation) {
      const imageLocation = supplyItem.imageLocation;
      console.log("imageLocation is ", imageLocation);
      await deleteDOFile(imageLocation);
    }

    // delete the supply item from the database
    const deletionResult = await db.collection("rr7-supplies").deleteOne({
      _id: new ObjectId(id), // Convert string to ObjectId
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSupplies() {
  const db = await getDb();
  const data = await db.collection("rr7-supplies").find().toArray();

  // Serialize _id to string for component usage
  return {
    items: data.map((i) => ({ ...i, _id: i._id.toString() })),
  };
}

export async function updateSupply(id, supplyData) {
  try {
    const db = await getDb();
    const collection = db.collection("rr7-supplies");

    console.log(
      "7. in updateSupply just got db from getDb in supplies.server >>",
      db,
    );
    // const data = await db.collection("rr7-supplies").find().toArray();
    const data = await db.collection("rr7-supplies").find().toArray();

    try {
      validateSupplyInput(supplyData);
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
