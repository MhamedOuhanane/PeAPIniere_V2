import React from "react";

const PlantList = ({ plants }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mt-10">Liste des Plantes</h3>
      <div className="mt-4">
        {plants.length > 0 ? (
          <ul className="space-y-4">
            {plants.map((plant) => (
              <li key={plant.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{plant.name}</span>
                  <span className="text-sm text-gray-500">{plant.category}</span>
                </div>
                <div className="text-sm text-gray-600">{plant.description}</div>
                <div className="text-sm mt-2">
                  <strong>Prix:</strong> €{plant.price} | <strong>Stock:</strong> {plant.stock}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune plante ajoutée.</p>
        )}
      </div>
    </div>
  );
};

export default PlantList;
