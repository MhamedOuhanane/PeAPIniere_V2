import { useState, useEffect } from "react"
import Swal from "sweetalert2"

export default function CategoryManagement() {
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({ title: "", description: "" })
    const [editingId, setEditingId] = useState(null)
    const token = props.token;

    useEffect(() => {
      fetchCategories();
    });

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categori", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()
        if (!res.ok) {
          const message = data.message ?? data.error; 
          Swal.fire({
            icon: 'error',
            title: 'Récuperation des Categories',
            text: message,
            color: 'red',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'red',
          });
        }
        setCategories(data)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur fetchCategories:',
          text: error.message,
          color: 'red',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red',
        });
      }
    }

    const handleChange = (e) => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
    }

    const handleAdd = async (e) => {
      e.preventDefault()

      const newCategory = {
        title: form.title,
        description: form.description,
      }

      const res = await fetch("/api/categorie", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      })

      const data = await res.json();
      if (res.ok) {
        await fetchCategories()
        Swal.fire({
          icon: 'success',
          title: 'Créate nouvelle Catégorie',
          text: data.message,
          confirmButtonText: 'confirm',
          confirmButtonColor: 'green',
          color: 'green',
        });
        setForm({ title: "", description: "" })
      } else {
        const message = data.message ?? data.error; 
        Swal.fire({
          icon: 'success',
          title: 'Créate nouvelle Catégorie',
          text: message,
          confirmButtonText: 'confirm',
          confirmButtonColor: 'red',
          color: 'red',
        });
      }
    }

    
    const handleUpdate = async (e) => {
      e.preventDefault()

      const updatedCategory = {
        title: form.title,
        description: form.description,
      }

      const res = await fetch(`/api/categori/${editingId}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCategory),
      })

      if (res.ok) {
        await fetchCategories()
        setForm({ title: "", description: "" })
        setEditingId(null)
      }
    }

    const handleEdit = (category) => {
      setForm({ title: category.title, description: category.description })
      setEditingId(category.id)
    }

    const handleDelete = async (id) => {
      const res = await fetch(`/api/categori/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        await fetchCategories()
      }
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Gestion des Catégories</h1>

        <form onSubmit={editingId ? handleUpdate : handleAdd} className="mb-6 space-y-4">
          <div>
            <label>Nom</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {editingId ? "Modifier" : "Ajouter"}
          </button>
        </form>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Nom</th>
              <th className="text-left p-2">Slug</th>
              <th className="text-left p-2">Description</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-2">{cat.title}</td>
                <td className="p-2">{cat.description}</td>
                <td className="p-2 text-right space-x-2">
                  <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:underline">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
