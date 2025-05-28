import { useState, useEffect } from 'react';
import { fetchGuestHouses, createGuestHouse, updateGuestHouse, deleteGuestHouse } from '../../services/api';

const GuestHouseCRUD = () => {
  const [guestHouses, setGuestHouses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    amenities: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadGuestHouses();
  }, []);

  const loadGuestHouses = async () => {
    const data = await fetchGuestHouses();
    setGuestHouses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateGuestHouse(editingId, formData);
    } else {
      await createGuestHouse(formData);
    }
    setEditingId(null);
    setFormData({ name: '', address: '', description: '', amenities: '' });
    loadGuestHouses();
  };

  const handleEdit = (gh) => {
    setEditingId(gh.id);
    setFormData({
      name: gh.name,
      address: gh.address,
      description: gh.description,
      amenities: gh.amenities
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guest house?')) {
      await deleteGuestHouse(id);
      loadGuestHouses();
    }
  };

  return (
    <div className="guest-house-crud">
      <h3>Manage Guest Houses</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <input
          type="text"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={(e) => setFormData({...formData, amenities: e.target.value})}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
        )}
      </form>

      <div className="guest-house-list">
        {guestHouses.map(gh => (
          <div key={gh.id} className="guest-house-item">
            <h4>{gh.name}</h4>
            <p>{gh.address}</p>
            <div className="actions">
              <button onClick={() => handleEdit(gh)}>Edit</button>
              <button onClick={() => handleDelete(gh.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestHouseCRUD;