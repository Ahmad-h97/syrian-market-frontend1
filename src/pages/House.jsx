import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './House.module.css';

import HouseCardHeader from '../components/HouseCardHeader'; // import the header
import { useAuthStore } from '../store/authStore'; // get current userId

export default function House() {
  const { houseId } = useParams();
  const [house, setHouse] = useState({
    images: [],
    postedBy: {},
  });

  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const currentUserId = useAuthStore(state => state.userId);
  const isOwner = house?.postedBy?.id === currentUserId;
  const showFollowButton = !isOwner && !isFollowing;

  const onFollowToggle = async () => {
    setLoadingFollow(true);
    try {
      const res = await api.post(`/users/follow/${house.postedBy.id}`);
      setIsFollowing(res.data.isFollowing);
    } catch (error) {
      console.error(error);
    }
    setLoadingFollow(false);
  };

  useEffect(() => {
    api.get(`houses/houses/${houseId}`)
      .then(res => {
        setHouse(res.data);
        if (res.data.isFollowing !== undefined) {
          setIsFollowing(res.data.isFollowing);
        }
      })
      .catch(err => {
        console.error("Error fetching house:", err);
      });
  }, [houseId]);

  return (
    <div>
      {/* House Header */}
      {house.postedBy && house.postedBy.id && (
        <HouseCardHeader
          postedBy={house.postedBy}
          isFollowing={isFollowing}
          onFollowToggle={onFollowToggle}
          loadingFollow={loadingFollow}
          showFollowButton={showFollowButton}
        />
      )}

      {/* Image Slider */}
      {house.imagesPost?.length > 0 && (
        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className={styles.swiper}
          >
            {house.imagesPost.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`house-${idx}`} className={styles.slideImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* House Details */}
      <div className={styles.detailsContainer}>
        <p className={styles.detail}>
          <strong>Price:</strong>{' '}
          {house.price ? `$${house.price}` : <span className={styles.muted}>Login to see this</span>}
        </p>

        <p className={styles.detail}>
          <strong>Location:</strong> {house.location}
        </p>

        <p className={styles.detail}>
          <strong>Description:</strong> {house.description}
        </p>
      </div>
    </div>
  );
}
