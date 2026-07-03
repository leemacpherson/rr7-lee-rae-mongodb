import SupplyListItem from "./SupplyListItem";

function SuppliesList({ supplies }) {
  // console.log("@@@@@@@. SuppliesList supplies:", supplies);
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
              volume={supply.volume}
              location={supply.location}
              supplyType={supply.supplyType}
              units={supply.units}
              date={supply.date}
              imageLocation={supply.imageLocation}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuppliesList;
