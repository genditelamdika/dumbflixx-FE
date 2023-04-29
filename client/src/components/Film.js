import Props from "./Props"
import Movies from '../components/Movies'
import Masonry from "react-masonry-css";
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from "react-router-dom";
import { Col, NavDropdown, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from '../config/api';

import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";

import Cards from "./Cards";
// import Detail from "./Detail";
import { useNavigate } from 'react-router';

function Film(props){
  let navigate = useNavigate();
      
        
    //   }
    // let { data: films, refetch } = useQuery("filmsCache", async () => {
    //   const response = await API.get("/films");
    //   return response.data.data;
    // });

    // const handleUpdate = (id) => {
    //   navigate("/Updatefilm/" + id);
    // };
    // console.log(films);
    // const breakpointColumnsObj = {
    //   default: 6,
    //   1100: 4,
    //   700: 3,
    //   500: 2,
    // };
    const [categories, setCategories] = useState(null);
    const [selectedValue, setSelectedValue] = useState("TV Series");
    const [deleteid, setDelete] = useState(null);
  
    const getCategory = async () => {
      try {
        const response = await API.get("/categories");
        setCategories(response.data.data);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    const handleDelete = (e) => {
      e.preventDefault();
      const btnvalue = e.target.value;
      setDelete(Number(btnvalue));
    };
  
    let { data: films, refetch } = useQuery("filmsChache", async () => {
      const response = await API.get("/films");
      console.log("data :", response.data);
      return response.data.data;
    });
        const handleUpdate = (id) => {
      navigate("/Updatefilm/" + id);
    };
    console.log(films);
  
    const deletebyId = useMutation(async (id) => {
      try {
        await API.delete(`/film/${id}`);
        refetch();
      } catch (error) {
        console.log(error);
      }
    });
    useEffect(() => {
      getCategory();
    }, []);
  
    useEffect(() => {
      deletebyId.mutate(deleteid);
    }, [deleteid]);
  
    const series = films?.filter((item)=> item.categoryID === 1)
    const movies = films?.filter((item)=> item.categoryID === 2)
  
    return(
      <>
      <div className="bg-black py-4">
        <style>{'body { background-color: black; }'}</style>
        <div className="ms-4 me-5  d-flex justify-content-between">
          <div className="d-flex justify-content-evenly align-items-center" style={{ width: "275px" }}>
            <h2 className="text-light fs-4" style={{ width: "200px" }}>
              List Film
            </h2>
            <select value={selectedValue} onChange={handleChange} class=" form-select w-75  bg-dark text-light" aria-label="Default select example">
              {categories?.map((cat,i) => (
                
                
                  <option key={i} value={cat.name}>{cat.name}  {console.log(categories)}</option>
                 
                
                
              ))}
            </select>
          </div>
          <div className="d-flex">
            <Link className="text-decoration-none" to="/Addfilm">
              <button type="button" className="shadow  btn btn-danger fw-bold w-100 py-2">
                Add Film
              </button>
            </Link>
            <Link className="text-decoration-none ms-5" to="/Addepisode">
              <button type="button" className="shadow  btn btn-danger fw-bold w-100 py-2">
                Add Episode
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-wrap bg-black global d-flex justify-content-evenly">
        {selectedValue === "series" ? (
          <>
            {movies?.length !== 0 ? (
              <>
                {movies?.map((item) => (
                  <div>
                    <Link className="text-decoration-none" to={`/Detail/${item.id}`}>
                      <div className="card bg-black">
                        <img src={item.thumbnailfilm} className="" />
                        <h4 className="text-light pt-2">{item.title}</h4>
                        <p className="text-light pt-2">{item.year}</p>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-between">
                      <button onClick={handleDelete} type="buton" className="shadow  btn btn-danger fw-bold  " style={{width:"70px"}} name={item.id} value={item.id}>
                        Delete
                      </button>
                      <Link  to={`/Updatefilm/${item.id}`}>

                      <button  type="buton" className="shadow  btn btn-success fw-bold   " 
                       style={{width:"70px"}} name={item.id} value={item.id}>
                        Update
                      </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1 className="text-5xl mx-auto mt-40">Tv Shows Not Found!</h1>
            )}
          </>
        ) : (
          <>
            {series?.length !== 0 ? (
              <>
                {series?.map((item) => (
                  <div>
                    <Link className="text-decoration-none" to={`/Detail/${item.id}`}>
                      <div className="card bg-black">
                        <img src={item.thumbnailfilm} className="" />
                        <h4 className="text-light pt-2">{item.title}</h4>
                        <p className="text-light pt-2">{item.year}</p>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-between">
                      <button onClick={handleDelete} type="buton" className="shadow  btn btn-danger fw-bold  " style={{width:"70px"}} name={item.id} value={item.id}>
                        Delete
                      </button >
                      <Link to={`/Updatefilm/${item.id}`}>
                      <button  type="buton"  className="shadow  btn btn-success fw-bold  " style={{width:"70px"}} name={item.id} value={item.id}>
                        Update
                      </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1 className="text-5xl mx-auto mt-40">Movies Not Found!</h1>
            )}
          </>
        )}
      </div>
    </>
  );
};
    //   <div style={{ background: "black" }}>
    //   <div className="px-5 py-5">
    //     <div className="mx-4 gap-5">
    //       <div className="d-flex flex row-cols-2 mb-3">
    //         <p className="fs-6 fw-semibold text-white">List Film</p>
    //         <Link
    //           to="/Addfilm"
    //           className="d-flex justify-content-end text-decoration-none">
    //           <Button variant="danger" size="sm" className="px-4 py-1 fw-bold">
    //             Add Film
    //           </Button>
    //         </Link>
    //       </div>
    //       <div className="d-flex flex-wrap justify-content-center gap-4">
    //         {film?.map((item) => {
    //           return (
    //             <Cards
    //               id={item.id}
    //               title={item.title}
    //               year={item.year}
    //               thumbnailfilm={item.thumbnailfilm}
    //             />
    //             );
    //           })}
    //           //   <div className="d-flex flex-wrap justify-content-center gap-4">
    //       {films?.map((item) => (
    //        <div className="flex">
    //         <div className="props">
    //         <Link to={`/Detail/${item.id}`}><img src={item.thumbnailfilm}/></Link>
    //         <h5>

    //         <Link to={`/Detail/${item.id}`}>{item.title}</Link>
    //         </h5>
    //         <h5>{item.year}</h5>
    //         <h5>{item.description}</h5>
            
    //                     <Button
    //                       onClick={() => {
    //                         handleUpdate(item.id);
    //                       }}
    //                       className="btn-sm btn-success me-2"
    //                       style={{ width: "135px" }}
    //                     >
    //                       Edit
    //                     </Button>

    //         </div>

    //       </div>

    //      ))} 
    //           </div>
    //           </div>
    //           </div>
    //           </div>
    //           </div>


    // )
    //           }
        
export default Film;


