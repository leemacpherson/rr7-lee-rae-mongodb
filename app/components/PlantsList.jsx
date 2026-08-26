import PlantsListItem from "./PlantsListItem";

function PlantsList({ plants }) {
  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-grey-900 mb-6">Our Plants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <PlantsListItem
              id={plant._id}
              description={plant.description}
              amount={plant.amount}
              volume={plant.volume}
              location={plant.location}
              supplyType={plant.supplyType}
              units={plant.units}
              date={plant.date}
              imageLocation={plant.imageLocation}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantsList;
