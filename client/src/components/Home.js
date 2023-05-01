// import The from "../image/thewitcher.png"
// import Props from "./Props"
import Cards from "./Cards";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";
import { API } from '../config/api';
// import ExampleForm from "/hooks/ExampleForm";
function Home(){
  let { data: films } = useQuery("moviesCache", async () => {
    const response = await API.get(`/films`);
    return response.data.data;
  });
  // console.log(movies);
  const movies = films?.filter((item)=> item.categoryID === 1)
  const series = films?.filter((item)=> item.categoryID === 2)
  


  return (
    <>
      

<div className="the"> 
<img  src={require( "../image/thewitcher.png")} alt="gambar"  className=""></img>
<div>
<div className="d-flex">
<p className="pl-3">2019</p>
<p className="Tvshoww">Tv Show</p>
</div>
        <div className="watch">
<Button className=' 'variant='danger' style={{
 width:"230px",
 height:"70px",
 fontSize:"20px"
}} >Watch Now </Button>
</div>
</div> 
</div> 

      
       <img className="kontol" src={require( "../image/Jumbotron.png")} alt="gambar"></img>
      <div style={{ background: "black" }}>
       {/* <Ads />  */}
      <div style={{ background: "black", padding: "20px" }}>
        <div className="mx-4 gap-5">
          <p className="fs-6 fw-semibold text-white">Movies</p>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {movies?.slice(0, 6).map((data) => {
              return (
                <Cards
                  id={data.id}
                  title={data.title}
                  year={data.year}
                  thumbnailfilm={data.thumbnailfilm}
                />
              );
            })}
            <Link
              to="/movies"
              className="text-decoration-none d-flex flex-column h-full justify-content-center gap-2">
              <div className="text-white">
                {/* <Arrow /> */}
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>See More</p>
              </div>
            </Link>
          </div>
          <p className="fs-6 fw-semibold text-white mt-5">TV Series</p>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {series?.slice(0, 6).map((data) => {
              return (
                // <img src={item.thumbnailfilm}></img>
                <Cards
                id={data.id}
                title={data.title}
                year={data.year}
                thumbnailfilm={data.thumbnailfilm}
                // description={data.description}
                />
                );
            })}
            <Link
              to="/Tvshow"
              className="text-decoration-none d-flex flex-column h-full justify-content-center gap-2">
              <div className="text-white">
                {/* <Arrow /> */}
                <p style={{ fontSize: "17px", fontWeight: "bold" }}>See More</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
                </>




    )
}

export default Home
