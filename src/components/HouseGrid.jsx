
import { useState } from 'react';
import HouseCard from './HouseCard';
import styles from './HouseGrid.module.css'
import { MdOutlineViewAgenda  , MdGridView } from 'react-icons/md';
import FilterPopup from './FilterPopup'; // We'll create this next
import { FiFilter } from "react-icons/fi";


export default function HouseGrid ({houses}){

  const [isFilterOpen, setIsFilterOpen] = useState(false);

   const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

   const [isGrid, setIsGrid] = useState(false);

   const handleToggleLayout  = () => {
    setIsGrid(prev => !prev);
  };

    return(
    <div className={styles.houseContainer}>
      
       <div className={styles.buttonWrapper}>
        <div>
         <button onClick={openFilter} className={styles.btnFilter}> Filter <FiFilter size={24} />
</button>

      {isFilterOpen && <FilterPopup onClose={closeFilter} />}

      </div>

        <button className={styles.viewToggle} onClick={handleToggleLayout}>
         {isGrid ? <MdGridView size={24} /> : <MdOutlineViewAgenda   size={24} />} 
      </button>

      
       </div>
 
        <div className={isGrid ? styles.gridContainer : styles.listContainer}>
        {houses.map(house => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
      
    </div>
  );
}