import { useEffect, useState } from "react"
import styles from './Home.module.css'
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/loading";
import HouseGrid from '../components/HouseGrid';
import{ useParams } from 'react-router-dom';

function UserProfile(){
    const[houses, setHouses] = useState([]);
    const[page, setPage] = useState(1);
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(true);
   const [totalPages, setTotalPages] = useState(1);

    const { userId, username } = useParams();
     

    useEffect(() => {


         api.get(`/houses/${userId}/houses?page=${page}&limit=10`)
        .then(res =>  {
            console.log(res.data)
            console.log("xxx")

            setHouses(res.data.data)
            setTotalPages(res.data.totalpages);
        })
        .catch (err => {
            console.error('error fetching houses',err)
        })
        .finally(() => {
      setIsFetching(false);
       });
    }, [page]);

    const handleNextPage = () => {
      setPage (prevPage => prevPage +1);
    }

    return (
  <div>
    {isFetching ? (
      <Loading />
    ) : (
      <>
        <HouseGrid houses={houses} />

        <hr className={styles.hr} />
                <div className={styles.navBtns}>
             <button className={styles.navBtn} onClick={() => handlePageChange(page - 1)}  disabled={page <= 1}>
                Previous Page
              </button>
        
               <button className={styles.navBtn} onClick={() => handlePageChange(page + 1) } disabled={page >= totalPages}>
                Next Page
              </button>
              </div>
      </>
    )}
  </div>
)
}
export default UserProfile