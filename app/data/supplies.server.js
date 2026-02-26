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

// export async function getSupplies() {
//   try {
//     const supply = prisma.supply.findMany({ orderBy: { date: "desc" } });
//     return supply;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function getSupply(id) {
//   try {
//     const supply = await prisma.supply.findFirst({ where: { id: id } });
//     return supply;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

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

// export async function deleteSupply(id) {
//   try {
//     await prisma.supply.delete({
//       where: { id: id },
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
