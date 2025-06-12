import { useEffect, useState } from "react"
import styles from './Home.module.css'
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import HouseGrid from '../components/HouseGrid';
import Loading from "../components/loading";
import { useSearchParams } from 'react-router-dom';


function Home(){
    const[houses, setHouses] = useState([]);
    
   const [isFetching, setIsFetching] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const handlePageChange = (newPage) => {

   
    setSearchParams({ page: newPage });
    
 
  };

  const [totalPages, setTotalPages] = useState(1);

  

    useEffect(() => {
      

         api.get(`/houses/houses?page=${page}&limit=10`)
        .then(res =>  {
            console.log(res.data)
            

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
    

    
   

    return(
       <div>
        {isFetching ? (
             <>
               <Loading />
             </>
           ) : (
             <>

        <HouseGrid houses={houses}/>

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

    
    );
}
export default Home