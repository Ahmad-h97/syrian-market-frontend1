import { useEffect, useState } from "react"
import styles from './Home.module.css'
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import HouseGrid from '../components/HouseGrid';
import Loading from "../components/loading";
import { useSearchParams } from 'react-router-dom';
import { FilterStore } from '../store/FilterStore';  // import your filter store


function Home(){

 console.log(1)
  const [showLoading, setShowLoading] = useState(true);



    const[houses, setHouses] = useState([]);
    
   const [isFetching, setIsFetching] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;


   const filters = FilterStore((state) => state.filters);

  // Helper to build query string from filters
  const buildQuery = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return params.toString();
  };


  const handlePageChange = (newPage) => {

   
    setSearchParams({ page: newPage });
    
 
  };

  const [totalPages, setTotalPages] = useState(1);

  

    useEffect(() => {
      setShowLoading(true);
      
      setIsFetching(true);

       const filterQuery = buildQuery(filters);
    let url = `/houses/houses?page=${page}&limit=10`;
    if (filterQuery) url += `&${filterQuery}`;

         api.get(url)
        .then(res =>  {
            console.log("res.data",res.data)
            

            setHouses(res.data.data)
              setTotalPages(res.data.totalPages);
        })
        .catch (err => {
            console.error('error fetching houses',err)
        })   
        .finally(() => {
      
        setIsFetching(false);
        setShowLoading(false);
      });
       
    }, [page,filters]);
    

    
   

    return(
       <div>
         {showLoading ? (
           
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