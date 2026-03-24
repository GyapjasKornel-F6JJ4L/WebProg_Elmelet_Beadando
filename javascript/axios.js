const { useState, useEffect } = React;

const App = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nev: '',
    kategoria: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'php/api.php';

  const fetchSoftware = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setSoftwareList(response.data);
      setError('');
    } catch (err) {
      setError('Hiba történt az adatok betöltésekor: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Komponens betöltésekor lefuttatjuk az adatok lekérését
  useEffect(() => {
    fetchSoftware();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nev || !formData.kategoria) {
      alert('Kérjük töltsön ki minden kötelező mezőt!');
      return;
    }

    try {
      if (formData.id) {
        // Meglévő szoftver frissítése (Update)
        await axios.put(API_URL, {
          id: formData.id,
          nev: formData.nev,
          kategoria: formData.kategoria
        });
      } else {
        // Új szoftver hozzáadása (Create)
        await axios.post(API_URL, {
          nev: formData.nev,
          kategoria: formData.kategoria
        });
      }
      // Szövegmezők ürítése és lista újra-lekérése
      setFormData({ id: '', nev: '', kategoria: '' });
      fetchSoftware();
    } catch (err) {
      console.error(err);
      alert('Hiba történt az adatmentés során!');
    }
  };

  const handleEdit = (software) => {
    // A szerkesztendő szoftver adatait betöltjük a form-ba
    setFormData({ ...software });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Biztosan törölni szeretné a(z) ${id} azonosítójú szoftvert?`)) {
      try {
        // Szoftver törlése az adatbázisból (Delete)
        await axios.delete(`${API_URL}?id=${id}`);
        fetchSoftware();
      } catch (err) {
        console.error(err);
        alert('Hiba történt a törlés során!');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      nev: '',
      kategoria: ''
    });
  };

  return (
    <main>
      <h2>Szoftverleltár (React + Axios CRUD, MySQL Adatbázis)</h2>

      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <div className="form-container">
        <h3>{formData.id ? `Szoftver szerkesztése (ID: ${formData.id})` : 'Új szoftver hozzáadása'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nev">Név / Szoftver:</label>
            <input
              type="text"
              id="nev"
              value={formData.nev}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="kategoria">Kategória:</label>
            <input
              type="text"
              id="kategoria"
              value={formData.kategoria}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Mentés</button>
            {formData.id && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                style={{ marginLeft: '5px' }}
              >
                Mégse
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <p>Adatok töltése folyamatban...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '35%' }}>Név</th>
              <th style={{ width: '25%' }}>Kategória</th>
              <th style={{ width: '30%' }}>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {softwareList.length > 0 ? (
              softwareList.map(software => (
                <tr key={software.id}>
                  <td>{software.id}</td>
                  <td>{software.nev}</td>
                  <td>{software.kategoria}</td>
                  <td className="actions">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(software)}
                    >
                      Szerkesztés
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(software.id)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>Nincs elérhető adat az adatbázisban.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
