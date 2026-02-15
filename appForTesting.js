import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db("mydatabase"); // Replace with your database name
    const collection = database.collection("mycollection"); // Replace with your collection name
    // CREATE
    const doc = { name: "John Doe", age: 30, email: "johndoe@example.com" };
    const createResult = await collection.insertOne(doc);
    console.log(
      `A document was inserted with the _id: ${createResult.insertedId}`,
    );
    // READ
    const query = { age: { $gt: 25 } };
    const docs = await collection.find(query).toArray();
    console.log("Found documents:", docs);
    // UPDATE
    const filter = { name: "John Doe" };
    const updateDoc = {
      $set: { age: 35, email: "john.doe@newdomain.com" },
    };
    const updateResult = await collection.updateOne(filter, updateDoc);
    console.log(
      `${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`,
    );
    // DELETE
    const deleteQuery = { name: "John Doe" };
    const deleteResult = await collection.deleteOne(deleteQuery);
    console.log(`${deleteResult.deletedCount} document(s) was/were deleted.`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
