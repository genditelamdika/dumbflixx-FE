import { useNavigate, useParams } from "react-router";
import { API } from "../config/api";
import { useEffect, useRef, useState } from "react";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation } from "react-query";
function Addepisode() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [film, setFilm] = useState([]);
    const [form, setForm] = useState({
      titleepisode: "",
      thumbnailepisode: "",
      linkFilm: "",
      filmId: "",
    });
  
    const getFilms = async () => {
      try {
        const response = await API.get('/films')
        setFilm(response.data.data)
        console.log("data asu : ", response.data)
      } catch (error) {
        console.log(error)
      }
    }
  
   // Handle change data on form
   const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0])
    }
  }
  
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
             // Store data with FormData as object
        const formData = new FormData();
        formData.set("titleepisode", form.titleepisode);
        formData.set("image", form.thumbnailepisode[0], form.thumbnailepisode[0].name);
        formData.set("linkfilm", form.linkFilm);
        formData.set("filmid", parseInt(form.filmId));

         // Insert product data
        const response = await API.post("/episode", formData, config);
        console.log("add episode success : ", response);
        MySwal.fire({
          title: <strong>Add Film Success</strong>,
          html: <i>You clicked the button!</i>,
          icon: 'success'
        })
        navigate('/Film')
        
      } catch (error) {
        console.log("add episode failed : ", error);
        console.log(form);
  
        MySwal.fire({
          title: <strong>Sadge</strong>,
          icon: 'error'
        })
      }
    });
  
    useEffect(() => {
      getFilms()
    }, [])
  
    return(
        <>
        <div className="bg-black" style={{ height: "600px" }}>
      <section id="project-form">
        <div class="container">
          <h2 class=" mb-2 pt-5 text-light" style={{ marginLeft: "140px" }}>
            Add Film
          </h2>
          <form method="post" class="w-75 mx-auto" onSubmit={(e) => handleSubmit.mutate(e)}>
            <input type="text" class="d-none" name="id" />
            <div class="mb-3 d-flex align-items-center">
              <input onChange={handleChange} type="text" class="bg-dark form-control text-light w-75 h-50" name="titleepisode" id="titleepisode" placeholder="Title Episode" style={{ color: "white" }} />
              <div className="position-relative">
                <label type="file" for="attachfile" class="form-label fw-bold bg-dark rounded text-secondary border border-light" style={{ width: "150px", padding: "5px", marginTop: "5px", marginLeft: "70px", fontSize: "10pt" }}>
                  Attach Thumbnail
                  <input onChange={handleChange}  type="file" id="thumbnailepisode" name="thumbnailepisode" className="position-absolute" style={{ width: "", opacity: "0", left: "70px", bottom: "10px" }} />
                </label>
                <div for="attachfile" className=" position-absolute" style={{ bottom: "14px", left: "200px" }}>
                  {/* <img className="w-75" src={icclip} style={{}} /> */}
                </div>
              </div>
            </div>

            <div class="mb-3">
              <input onChange={handleChange} type="text" class="bg-dark form-control text-light w-100 h-50" name="linkFilm" id="linkFilm" placeholder="Link Episode" width={{}} />
            </div>

            <div class="mb-3">
              <select onChange={handleChange} name="filmId" id="filmId" class="form-select bg-dark text-light" aria-label="Default select example">
                <option >Film</option>
                {film &&
                  film.map((item , index) => (
                    <option key={index} className="text-light" name={item.id} value={item.id}>
                      {item.title}
                      
                    </option>
                  ))}
              </select>
            </div>
            <button type="submit" class="bg-danger form-control text-light w-25 h-50 float-end border-0 fw-bold"  width={{}}>
                save
              </button>
              </form> 
        </div>
      </section>
    </div>
              
        </>
    )
}
export default Addepisode;