import MovieUi from '@/components/MovieUi'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
export async function getServerSideProps({ query }) {
    const { page = 1 } = query
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bf309c33d1b1d0d3e77e80388ce67415&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
    const data = await res.json()
    return {
      props: {
        movies: data.results
      }
    }    
}
  export default function AllMovies({ movies }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [movieList, setMovieList] = useState(movies)
    async function fetchMovieList() {
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bf309c33d1b1d0d3e77e80388ce67415&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`)
      const data = await res.json()
      setMovieList(data.results)
    }
    useEffect(() => {
      fetchMovieList()
    }, [currentPage])
    const handlePrevClick = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
    const handleNextClick = () => {
      setCurrentPage(currentPage + 1)
    }
    return (
        <>
            <Head>
                <title>All Movies</title>
            </Head>
            <div className="container py-5">
            <div className="row g-4">
            <MovieUi responseData={movieList}></MovieUi>
            <div className="pagination d-flex justify-content-center">
                <div aria-label="Page navigation  ">
                    <ul   className="pagination">
                      <li className="page-item"><span onClick={handlePrevClick} className="page-link cursor-pointer">Previous</span></li>
                      <li className="page-item"><span  onClick={()=>setCurrentPage(1)} className="page-link cursor-pointer">1</span></li>
                      <li className="page-item"><span onClick={()=>setCurrentPage(2)} className="page-link cursor-pointer">2</span></li>
                      {currentPage == 3 ? <li className="page-item"><span onClick={()=>setCurrentPage(currentPage)} className="page-link cursor-pointer">{currentPage}</span></li> :null}
                      {currentPage >= 4?
                      <>
                      <li className="page-item"><span onClick={()=>setCurrentPage(currentPage -1 )} className="page-link cursor-pointer">{currentPage-1}</span></li>
                      <li className="page-item"><span onClick={()=>setCurrentPage(currentPage)} className="page-link cursor-pointer">{currentPage}</span></li>
                      <li className="page-item"><span onClick={()=>setCurrentPage(currentPage +1)} className="page-link cursor-pointer">{currentPage +1 }</span></li>
                      </> : null}
                      <li className="page-item"><span onClick={handleNextClick} className="page-link cursor-pointer" >Next</span></li>
                    </ul>
                </div>       
             </div>
             </div>
             </div>
        </>
    )
}
