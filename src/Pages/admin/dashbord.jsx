import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

function Section({ title, items, columns }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Aucune donnée.</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="py-2 px-4 border-b text-left capitalize">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col} className="py-2 px-4 border-b">
                      {item[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function TableBord() {
    const [data, setData] = useState({ users: [], categories: [], plantes: [], commandes: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
//   const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        if (!token) {
          setError("Token not found");
          setLoading(false);
          return;
        }
        
        
        const res = await fetch('/api/statistique', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          setError(result.message || "Something went wrong.");
        } else {
          setData(result);
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10 text-lg">Chargement…</div>;
  if (error) return <div className="text-center py-10 text-red-500">Erreur : {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
    </div>
  );
}
