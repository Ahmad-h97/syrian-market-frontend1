import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import api from '../utils/axiosInstance';
import HouseCardHeader from './HouseCardHeader';  // import new header
import styles from './HouseGrid.module.css';
import { useAuthStore } from '../store/authStore';

export default function HouseCard({ house, isFollowing, onFollowToggle }) {
  const navigate = useNavigate();
  const [isSwiping, setIsSwiping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef();
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFollowToggle = async (e) => {
    e.stopPropagation();

    setLoadingFollow(true);
    try {
      const res = await api.post(`/users/follow/${house.postedBy.id}`);
      onFollowToggle(house.postedBy.id, res.data.isFollowing);
      setClicked(prev => !prev);
    } catch (err) {
      console.error(err);
    }
    setLoadingFollow(false);
  };

  const handleCardClick = () => {
    if (!isSwiping) {
      navigate(`/house/${house.id}`);
    }
  };

  const currentUserId = useAuthStore(state => state.userId);
  const isOwner = house?.postedBy?.id === currentUserId;
  const showFollowButton = !isOwner && (clicked || !isFollowing);

  return (
    <div className={styles.postCard}>
      <HouseCardHeader
        postedBy={house.postedBy}
        isFollowing={isFollowing}
        onFollowToggle={handleFollowToggle}
        loadingFollow={loadingFollow}
        showFollowButton={showFollowButton}
      />

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
            {house.imagesUltra.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`house-${idx}`} loading="lazy" className={styles.slideImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Link>
      </div>

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
            <div className={styles.insideButtons} ref={optionsRef}>
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
