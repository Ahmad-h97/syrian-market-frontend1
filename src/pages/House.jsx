import { useEffect,useState } from "react"
import{ useParams } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './House.module.css'


export default function House (){
    const {houseId}=useParams()
    const [house, setHouse] = useState({
  images: [],
  postedBy: {},
});
useEffect(() =>{
    api.get(`houses/houses/${houseId}`)
    .then(res =>  {
             const data = res.data;
            console.log(data)
            console.log("use effect is called")
             setHouse(res.data)
            })
},[houseId])



    return (
  <div>
   

    <div className={styles.swiperWrapper}>
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
      </div>
 <h2>{house.title}</h2>
    <p>Price: ${house.price}</p>
    <p>Location: {house.location}</p>
    <p>Description: {house.description}</p>
    <p>Posted by: {house.postedBy?.username}</p>
   
  </div>
    )
}