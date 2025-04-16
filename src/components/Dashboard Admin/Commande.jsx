import React, { useState, useEffect } from 'react';
import useToken from '../../store/tokenUser';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const defaultPage = useToken((state) => state.defaultPage);
  const token = useToken((state) => state.token);

  useEffect(() => {
    defaultPage(token);
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/commande', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = activeTab === 'all' ? orders : orders.filter(order => order.status === activeTab);

  if (loading) {
    return <p>Chargement des commandes...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('all')}>Toutes</button>
        <button onClick={() => setActiveTab('en-attente')}>En attente</button>
        <button onClick={() => setActiveTab('en-preparation')}>En préparation</button>
        <button onClick={() => setActiveTab('livree')}>Livrées</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>N° Commande</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.total} €</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
