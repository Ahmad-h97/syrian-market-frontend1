
import { useState } from 'react';
import HouseCard from './HouseCard';
import styles from './HouseGrid.module.css'
import { MdOutlineViewAgenda  , MdGridView } from 'react-icons/md';



export default function HouseGrid ({houses}){

   const [isGrid, setIsGrid] = useState(true);

   const toggleLayout = () => {
    setIsGrid(prev => !prev);
  };

    return(
    <div className={styles.houseContainer}>
       <div className={styles.buttonWrapper}>
        <button className={styles.viewToggle} onClick={toggleLayout}>
         {isGrid ? <MdGridView size={24} /> : <MdOutlineViewAgenda   size={24} />} 
      </button>
       </div>
 <hr className={styles.hr} />
        <div className={isGrid ? styles.gridContainer : styles.listContainer}>
        {houses.map(house => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}