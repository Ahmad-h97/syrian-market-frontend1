import React, { useState } from 'react';
import { FilterStore } from '../store/FilterStore';
import styles from './HouseGrid.module.css';

const FilterPopup = ({ onClose }) => {
  const { filters, setFilters, clearFilters } = FilterStore();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const resetFilters = () => {
    setLocalFilters({
      location: '',
      category: '',
      title: '',
      maxPrice: '',
      minPrice: '',
      timeAmount: '',
      timeUnit: '',
    });
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Filter Houses</h3>

        <select
          name="location"
          value={localFilters.location}
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

       
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={localFilters.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={localFilters.minPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={localFilters.maxPrice}
          onChange={handleChange}
        />

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '30%',
              marginBottom: '10px',
              padding: '6px',
              fontSize: '0.9rem',
              border: '1px solid #ccc',
            }}
          >
            last
          </div>

          <input
            type="number"
            name="timeAmount"
            placeholder="ex : 4"
            value={localFilters.timeAmount}
            onChange={handleChange}
          />

          <select
            name="timeUnit"
            value={localFilters.timeUnit}
            onChange={handleChange}
          >
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>

        <div className={styles.popupButtons}>
          <button onClick={resetFilters}>Reset</button>
          <button onClick={applyFilters}>Apply</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
