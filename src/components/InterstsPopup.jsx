import React, { useState } from 'react';
import { FilterStore } from '../store/FilterStore';
import styles from './HouseGrid.module.css';

const availableCategories = [
  "real estate",
  "electronics",
  "phones & PC",
  "clothes",
  "services",
  "vehicles"
];

const InterestsPopup = ({ onClose }) => {
  const { filters, setFilters } = FilterStore();
  const [selected, setSelected] = useState(filters.interestedCategories || []);

  const toggleCategory = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter(c => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  const applyInterests = () => {
    setFilters({ ...filters, interestedCategories: selected });
    onClose();
  };

  const resetInterests = () => {
    setSelected([]);
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Select Interested Categories</h3>

        <div>
          {availableCategories.map((category) => (
            <label key={category} style={{ display: 'block', margin: '8px 0' }}>
              <input
                type="checkbox"
                checked={selected.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))}
        </div>

        <div className={styles.popupButtons}>
          <button onClick={resetInterests}>Reset</button>
          <button onClick={applyInterests}>Apply</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default InterestsPopup;
