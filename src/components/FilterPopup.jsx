import React, { useState } from 'react';
import { FilterStore } from '../store/FilterStore';
import styles from './HouseGrid.module.css'


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
      title: '',
      maxPrice: '',
      minPrice: '',
      timeAmount: "",
      timeUnit: "",
    });
  };

    return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Filter Houses</h3>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={localFilters.location}
          onChange={handleChange}
        />

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
<input
  type="number"
  name="timeAmount"
  value={localFilters.timeAmount}
  onChange={handleChange}
/>

<select
  name="timeUnit"
  value={localFilters.timeUnit}
  onChange={handleChange}
>
  <option value="">all</option>
  <option value="hours">Hours</option>
  <option value="days">Days</option>
  <option value="weeks">Weeks</option>
  <option value="months">Months</option>
  <option value="years">Years</option>
</select>

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