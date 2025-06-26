import { useState,useRef } from 'react';
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {useAuthStore} from '../store/authStore'; // ⬅ import Zustand store
import styles from './PostHouse.module.css'


export default function PostHouse() {
  const accessToken = useAuthStore(state => state.accessToken); // ⬅ get token
  const navigate = useNavigate();


const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click(); // open file picker
  };


  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    category:'',
    description: '',
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

   const handleDeleteNew = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = images.length;

    const allowed = 3 - total;
    if (files.length > allowed) {
      alert(`You can only upload ${allowed} more image(s).`);
      return;
    }

    setImages(prev => [...prev, ...files]);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) return setMessage("You must be logged in.");

    setLoading(true);
    const form = new FormData();
     images.forEach((img) => {
    form.append('images', img);
  });
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      
      const res = await api.post('/houses/houses', form, {
      });
      
      setMessage(res.data.message || 'House posted successfully');
      navigate('/'); // redirect after success
    } catch (err) {
       console.error('🔴 Full error object:', err); // logs the whole Axios error object
  console.error('📦 Response data:', err.response?.data); // detailed message from server
  console.error('📦 Status:', err.response?.status); // status code like 403
  console.error('📦 Headers:', err.response?.headers); // any auth or CORS headers
  
      setMessage(err.response?.data?.message || err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
      
    }
  };

  if (!accessToken) {
  return (
    <div className={styles.container}>
      <p className={styles.notLoggedInMessage}>
        You must be logged in to post a house.
      </p>
      <button 
        onClick={() => navigate('/login')} 
        className={styles.notLoggedInButton}
        aria-label="Go to login page"
      >
        Go to Login
      </button>
    </div>
  );
}
  return (
    <div className={styles.container}>
     
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input 
          name="title" 
          placeholder="Title" 
          onChange={handleChange} 
          className={styles.input}
          
          required />
          </div>
        <div className={styles.field}>
          <label htmlFor="title">price</label>
          <input 
          name="price" 
          placeholder="Price" type="number" 
          onChange={handleChange} 
          className={styles.input}

          required />
          </div>

        <div className={styles.field}>
  <label htmlFor="location">Location</label>
  <select
    name="location"
    onChange={handleChange}
    className={styles.input}
    required
  >
    <option value="">Select a city</option>
    <option value="Damascus">Damascus</option>
    <option value="Aleppo">Aleppo</option>
    <option value="Homs">Homs</option>
    <option value="Latakia">Latakia</option>
    <option value="Tartus">Tartus</option>
    <option value="Hama">Hama</option>
    <option value="Raqqa">Raqqa</option>
    <option value="Deir ez-Zor">Deir ez-Zor</option>
    <option value="Hasakah">Hasakah</option>
    <option value="Daraa">Daraa</option>
  </select>
</div>

    <div className={styles.field}>
  <label htmlFor="category">Category</label>
  <select
    name="category"
    onChange={handleChange}
    className={styles.input}
    required
  >
    <option value="">Select a category</option>
    <option value="real estate">Real Estate</option>
    <option value="electronics">Electronics</option>
    <option value="phones & PC">Phones & PC</option>
    <option value="clothes">Clothes</option>
    <option value="services">Services</option>
    <option value="vehicles">Vehicles</option>
  </select>
</div>

        <div className={styles.field}>
          <label htmlFor="">description</label>
          <textarea 
          name="description" 
          placeholder="Description" 
          onChange={handleChange} 
          className={styles.input}

          required />
          </div>
        
        <div className={styles.imageGrid}>
  {images.map((file, index) => (
    <div key={`new-${index}`} className={styles.imageItem}>
      <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} width="100" />
      <button type="button" onClick={() => handleDeleteNew(index)}>Delete</button>
    </div>
  ))}
</div>
        
        
         <div className={styles.imagesbuttonWrapper}>
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          ref={fileInputRef}
          style={{ display: 'none' }} // hides the input
          onChange={handleImageChange}
          disabled={ images.length >= 3}
          
        />
        <p>{3 - (images.length)} images can still be added</p>
         <button className={styles.button}
        type="button" 
        onClick={handleButtonClick} 
        disabled={images.length >= 3}
      >
        add image
      </button>
       
        </div>
       
        
        
         <button className={styles.submit} type="submit" disabled={loading}>{loading ? 'posting...' : 'post'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
