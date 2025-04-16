import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function PlantManagement() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categorie", {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newCategory),
        })

        const data = await response.json();
        if (response.ok) {
          setCategories(data);
          setFormData((prevState) => ({
            ...prevState,
            category: data[0] || "",
          }));
        } else {
            const message = data.message ?? data.error; 
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de la récupération des catégories',
            text: 'Une erreur est survenue lors de la récupération des catégories.',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'red',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: `Erreur: ${error.message}`,
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => {
      if (type === "file") {
        return { ...prevState, [name]: files[0] };
      }
      return { ...prevState, [name]: value };
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name || formData.name.length < 3)
      formErrors.name = "Le nom est requis et doit contenir au moins 3 caractères.";
    if (!formData.description || formData.description.length < 20)
      formErrors.description = "La description doit contenir au moins 20 caractères.";
    if (!formData.price || isNaN(formData.price) || formData.price < 9.99 || formData.price > 299.99)
      formErrors.price = "Le prix doit être compris entre 9.99 € et 299.99 €.";
    if (!formData.category) formErrors.category = "La catégorie est requise.";
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0)
      formErrors.stock = "Le stock doit être un nombre positif.";
    if (!formData.image) formErrors.image = "L'image est requise.";
    else if (!['image/png', 'image/jpeg'].includes(formData.image.type))
      formErrors.image = "L'image doit être au format PNG ou JPG.";

    return formErrors;
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", parseFloat(formData.price));
    data.append("category", formData.category);
    data.append("stock", parseInt(formData.stock));
    data.append("image", formData.image);

    try {
      const response = await fetch("/api/plante", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const newPlant = await response.json();
        setPlants((prevPlants) => [...prevPlants, newPlant]);

        Swal.fire({
          icon: 'success',
          title: 'Plante ajoutée avec succès!',
          text: `${newPlant.name} a été ajouté à votre liste.`,
          confirmButtonText: 'Ok',
        });

        setFormData({
          name: "",
          description: "",
          price: "",
          category: categories[0],
          stock: "",
          image: null,
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
        Swal.fire({
          icon: 'error',
          title: 'Erreur d\'envoi',
          text: 'Une erreur est survenue lors de l\'ajout de la plante.',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red',
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la plante :", error);
      setErrors({ general: "Une erreur s'est produite. Veuillez réessayer." });
      Swal.fire({
        icon: 'error',
        title: 'Erreur du serveur',
        text: 'Impossible d\'envoyer la plante actuellement.',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const previewImage = formData.image ? URL.createObjectURL(formData.image) : null;

  return (
    <div>
      <h2>Ajouter une nouvelle plante</h2>
      <form onSubmit={handleAddPlant}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
        </div>
        <div>
          <label>Prix (€):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}
        </div>
        <div>
          <label>Catégorie:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span style={{ color: "red" }}>{errors.category}</span>}
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
          {errors.stock && <span style={{ color: "red" }}>{errors.stock}</span>}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            accept="image/png, image/jpeg"
            required
          />
          {errors.image && <span style={{ color: "red" }}>{errors.image}</span>}
          {previewImage && <img src={previewImage} alt="Preview" width={100} />}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter la plante"}
        </button>
      </form>

      <h2>Liste des plantes</h2>
      <ul>
        {plants.length > 0 ? (
          plants.map((plant) => (
            <li key={plant.id}>
              {plant.name} - {plant.category} - €{plant.price} - Stock: {plant.stock}
            </li>
          ))
        ) : (
          <p>Aucune plante ajoutée.</p>
        )}
      </ul>
    </div>
  );
}

export default PlantManagement;
