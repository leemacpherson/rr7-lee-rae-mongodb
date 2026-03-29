import { ObjectId } from "mongodb";
import { getDb } from "./db.server";

export async function addSupply(supplyData) {
  console.log("in supplies.server, supplyData is ", supplyData);
  try {
    // 3. Direct MongoDB Driver Usage
    const result = await db.collection("rr7-supplies").insertOne({
      supplyData,
    });

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
    const deletionResult = await db.collection("rr7supplies").deleteOne({
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
  const data = await db.collection("rr7supplies").find().toArray();
  // console.log(
  //   "LOADER in supplies.server, when we run getDb( what we get back is ",
  //   data,
  // );
  // Serialize _id to string for component usage
  return {
    items: data.map((i) => ({ ...i, _id: i._id.toString() })),
  };
}

// export async function updateSupply(id, supplyData) {
//   try {
//     await prisma.supply.update({
//       where: { id: id },
//       data: {
//         title: supplyData.title,
//         amount: +supplyData.amount,
//         date: new Date(supplyData.date),
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
