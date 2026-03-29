import SupplyListItem from "./SupplyListItem";
import { NavLink } from "react-router";

function SuppliesList({ supplies }) {
  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-grey-900 mb-6">Our Supplies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supplies.map((supply) => (
          <div
            key={supply._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <SupplyListItem
              id={supply._id}
              description={supply.description}
              amount={supply.amount}
              location={supply.location}
              supplyType={supply.supplyType}
              units={supply.units}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // return (
  //   <ol>
  //     {supplies.map((supply) => (
  //       <li key={supply._id}>
  //         <SupplyListItem
  //           id={supply._id}
  //           description={supply.description}
  //           amount={supply.amount}
  //           units={supply.units}
  //           location={supply.location}
  //           supplyType={supply.supplyType}
  //         />
  //       </li>
  //     ))}
  //   </ol>
  // );
}

export default SuppliesList;
