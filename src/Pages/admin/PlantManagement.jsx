import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useToken from "../../store/tokenUser";
import PlantList from "../../components/Dashboard Admin/PlanteListe";
import PlantForm from "../../components/Dashboard Admin/PlantForm";

function PlantManagement() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [plants, setPlants] = useState([]);
  const token = useToken((state) => state.token);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categorie", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
          setFormData((prev) => ({
            ...prev,
            category_id: data[0]?.id || "",
          }));
        }
      } catch (err) {
        Swal.fire("Erreur", "Impossible de charger les catégories", err);
      }
    };

    fetchCategories();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", parseFloat(formData.price));
    data.append("category_id", formData.category_id);
    data.append("image", formData.image);

    setLoading(true);
    try {
      const res = await fetch("/api/plante", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const newPlant = await res.json();
        setPlants((prev) => [...prev, newPlant]);
        Swal.fire("Succès", "Plante ajoutée", "success");
        setIsFormVisible(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          category_id: categories[0]?.id || "",
          image: null,
        });
      } else {
        Swal.fire("Erreur", "Échec de l'ajout", "error");
      }
    } catch (err) {
      Swal.fire("Erreur", "Erreur serveur", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Gestion des Plantes</h2>

      <button
        onClick={() => setIsFormVisible((prev) => !prev)}
        className="bg-blue-500 text-green-400 px-6 py-3 rounded-md mb-6 hover:bg-blue-600 transition duration-200"
      >
        {isFormVisible ? "Annuler" : "Ajouter une Plante"}
      </button>

      {isFormVisible && (
        <PlantForm
          formData={formData}
          categories={categories}
          loading={loading}
          handleInputChange={handleInputChange}
          handleAddPlant={handleAddPlant}
        />
      )}

      <PlantList plants={plants} />
    </div>
  );
}

export default PlantManagement;
