import { useState } from 'react';
import HouseCard from './HouseCard';
import styles from './HouseGrid.module.css'
import { MdOutlineViewAgenda, MdGridView } from 'react-icons/md';
import FilterPopup from './FilterPopup'; 
import InterestsPopup from './InterstsPopup';
import { CiSearch } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";

export default function HouseGrid({ houses }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isInterstsOpen, setIsInterstsOpen] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [followStatus, setFollowStatus] = useState({});

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);
  const openIntersts = () => setIsInterstsOpen(true);
  const closeIntersts = () => setIsInterstsOpen(false);

  const handleToggleLayout = () => {
    setIsGrid(prev => !prev);
  };

  const handleFollowToggle = (userId, newStatus) => {
    setFollowStatus(prev => ({
      ...prev,
      [userId]: newStatus
    }));
  };
  console .log(houses)
 

  return (
    <div className={styles.houseContainer}>
      <div className={styles.buttonWrapper}>
        <div>
          <button onClick={openIntersts} className={styles.btnIntersts}>
            My intersts <IoIosHeartEmpty size={24} />
          </button>
          {isInterstsOpen && <InterestsPopup onClose={closeIntersts} />}
        </div>
      
        <div>
          <button onClick={openFilter} className={styles.btnFilter}>
            Search <CiSearch  size={24} />
          </button>
          {isFilterOpen && <FilterPopup onClose={closeFilter} />}
        </div>

        <button className={styles.viewToggle} onClick={handleToggleLayout}>
          {isGrid ? <MdGridView size={24} /> : <MdOutlineViewAgenda size={24} />} 
        </button>
      </div>
 
      <div className={isGrid ? styles.gridContainer : styles.listContainer}>
        {houses?.map(house => (
          <HouseCard 
            key={house.id} 
            house={house}  
             {...(house.isFollowing !== undefined && {
    isFollowing: followStatus[house.postedBy?.id] ?? house.isFollowing
  })}
            onFollowToggle={handleFollowToggle}
            isGrid={isGrid}
          />
        ))}
      </div>
    </div>
  );
}