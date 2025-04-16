import React from "react";

const PlantForm = ({
  formData,
  categories,
  loading,
  handleInputChange,
  handleAddPlant
}) => {
  return (
    <form onSubmit={handleAddPlant}>
      <div className="mb-4">
        <label className="block text-lg font-semibold">Nom:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold">Prix (€):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold">Catégorie:</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold">Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          accept="image/png, image/jpeg"
          required
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-green-500 text-white rounded-md mt-4 hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "Ajout en cours..." : "Ajouter la plante"}
      </button>
    </form>
  );
};

export default PlantForm;
