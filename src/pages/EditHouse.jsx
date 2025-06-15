import { useEffect, useState,useRef} from "react";

import{ useParams } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {useAuthStore} from '../store/authStore'; 
import styles from './PostHouse.module.css'
import Loading from "../components/loading";

export default function EditHouse (){

    const {houseId} = useParams();
    console.log(houseId)
const accessToken = useAuthStore(state => state.accessToken); // ⬅ get token
  const navigate = useNavigate();

const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    category:'',
    description: '',
  });

  const [existingUrls, setExistingUrls] = useState([]); // old images from backend
  const [newImages, setNewImages] = useState([]);       // new files user uploads
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
      
         api.get(`/houses/houses/${houseId}`)
        .then(res =>  {
             const data = res.data;
            console.log("res",data)
            console.log("res",data.category)
            console.log("use effect is called")


              setFormData({
          title: data.title || '',
          price: data.price || '',
          location: data.location || '',
          category: data.category || '',
          description: data.description || '',
        });
          setExistingUrls(data.images || []);
      })
        .catch (err => {
            console.error('error fetching houses',err)
        })
         .finally(() => {
      setIsFetching(false);
       });
    }, [houseId]);


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

   const handleDeleteExisting = (url) => {
    setExistingUrls(prev => prev.filter(u => u !== url));
    
  };
console.log(existingUrls)

  const handleDeleteNew = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

   const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = existingUrls.length + newImages.length;

    const allowed = 3 - total;
    if (files.length > allowed) {
      alert(`You can only upload ${allowed} more image(s).`);
      return;
    }

    setNewImages(prev => [...prev, ...files]);
    
  };
console.log(newImages)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) return setMessage("You must be logged in.");

    setLoading(true);
    const form = new FormData();


    newImages.forEach(img => form.append('images', img));
    form.append('existingUrls', JSON.stringify(existingUrls));
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));



    try {
      const res = await api.patch(`/houses/houses/${houseId}`, form, {
        
      });
      setMessage(res.data.message || 'House edited successfully');
      navigate('/'); // redirect after success
    } catch (err) {
       console.error('🔴 Full error object:', err); // logs the whole Axios error object

      setMessage(err.response?.data?.message || err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
      
    }
  };

 
  return (
    <div className={styles.container}>
        {isFetching ? (
      <>
        <Loading />
      </>
    ) : (
      <>
      <h2 className={styles.title}>Edit House</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input 
            name="title" 
            placeholder="Title" 
            value={formData.title}
            onChange={handleChange} 
            className={styles.input}
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="price">Price</label>
          <input 
            name="price" 
            placeholder="Price" 
            type="number" 
            value={formData.price}
            onChange={handleChange} 
            className={styles.input}
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="location">Location</label>
          <select
          
            name="location" 
            placeholder="Location" 
            value={formData.location}
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
    value={formData.category}
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
          <label htmlFor="description">Description</label>
          <textarea 
            name="description" 
            placeholder="Description" 
            value={formData.description}
            onChange={handleChange} 
            className={styles.input}
            required 
          />
        </div>

        {/* Show existing images */}
        <div className={styles.imageGrid}>
          {existingUrls.map((url, index) => (
            <div key={`existing-${index}`} className={styles.imageItem}>
              <img src={url} alt={`House ${index}`} width="100" />
              <button type="button" onClick={() => handleDeleteExisting(url)}>Delete</button>
            </div>
          ))}
        </div>

        {/* New uploaded image previews */}
        <div className={styles.imageGrid}>
          {newImages.map((file, index) => (
            <div key={`new-${index}`} className={styles.imageItem}>
              <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} width="100" />
              <button type="button" onClick={() => handleDeleteNew(index)}>Delete</button>
            </div>
          ))}
        </div>

        {/* Upload image input */}
        <div className={styles.imagesbuttonWrapper}>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
            disabled={existingUrls.length + newImages.length >= 3}
          />
          <p>{3 - (existingUrls.length + newImages.length)} images can still be added</p>
          <button 
            className={styles.button}
            type="button" 
            onClick={handleButtonClick}
            disabled={existingUrls.length + newImages.length >= 3}
          >
            Add Image
          </button>
        </div>

        <button 
          className={styles.submit} 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'EDITING...' : 'EDIT'}
        </button>
      </form>

      {message && <p>{message}</p>}
      </>
    )}
    </div>
  );

}