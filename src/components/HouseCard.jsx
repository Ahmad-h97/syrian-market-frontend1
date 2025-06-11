import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import styles from './HouseGrid.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function HouseCard({house}) {
  const currentUserId = useAuthStore((state) => state.userId);

  const isOwner = house?.postedBy?.id === currentUserId;
  
 
  
const navigate = useNavigate();
const [isSwiping, setIsSwiping] = useState(false);
const [showOptions, setShowOptions] = useState(false); 
  const optionsRef = useRef();

   useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleCardClick = () => {
    if (!isSwiping) {
      navigate(`/house/${house.id}`);
    }
  };
   
 return (
  
  <div className={styles.postCard} >

    <div className={styles.swiperWrapper}>
       <Link to={`/house/${house.id}`} style={{ display: "block" }}>
        <Swiper
      modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {house.images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`house-${idx}`} className={styles.slideImage} />
          </SwiperSlide>
        ))}
       </Swiper>
      </Link> </div>

    <div className={styles.detailes}>
       <Link to={`/house/${house.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h3>{house.title}</h3>
        <p>Location: {house.location}</p>
        <p>Price: ${house.price}</p>
      </Link>
    </div>

    {isOwner && (
      <div className={styles.options}>
        <button
          className={styles.optionsBtn}
          onClick={() => setShowOptions(prev => !prev)}
        >
          ⋮
        </button>
        {showOptions && (
          <div className={styles.insideButtons} ref={optionsRef} >
            <button className={styles.insideBtn} onClick={() => navigate(`/edit-house/${house.id}`)}>
              Edit
            </button>
            <button className={styles.insideBtn}>Delete</button>
          </div>
        )}
      </div>
      
    )}
    
  </div>
);


}