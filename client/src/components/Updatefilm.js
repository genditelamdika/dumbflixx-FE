import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Row from "react-bootstrap/Row";
import { InputGroup } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import Button from "react-bootstrap/Button";
function Updatefilm() {

    let navigate = useNavigate();
    const { id } = useParams();
  
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]); //Store all category data
    const [preview, setPreview] = useState(null); //For image preview
    const [form, setForm] = useState({
        title: '',
        thumbnailfilm: '',
        year: '',
        // linkfilm: '',
        description: '',
        category_id: ''
    }); //Store product data

    async function getDataUpdate() {
      const responseFilm = await API.get('/film/' + id);
      const responseCategories = await API.get('/categories');
      setCategories(responseCategories.data.data);
      // setPreview(responseFilm.data.data.image);
    
      const newCategoryId = responseFilm.data.data?.category?.map((item) => {
        return item.id;
      });
    
      setForm({
        ...form,
        title: responseFilm.data.data.title,
        year: responseFilm.data.data.year,
        // linkfilm: responseFilm.data.data.linkfilm,
        description: responseFilm.data.data.description,
        category_id: newCategoryId
      });
      setIsLoading(false)
    }
    
    useEffect(() => {
      getDataUpdate()
    }, []);

    
    // For handle if category selected
const handleChangeCategoryId = (e, setIsChecked) => {
  const id = parseInt(e.target.value);
  const checked = e.target.checked;

  if (checked) {
    // Save category id if checked
    setForm({ ...form, category_id: [...form.category_id, id] });
    setIsChecked(true)
  } else {
    // Delete category id from variable if unchecked
    let newCategoryId = form?.category_id?.filter((categoryId) => {
      return categoryId != id;
    });
    setForm({ ...form, category_id: newCategoryId });
    setIsChecked(false)
  }
};

// Handle change data on form
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]:
      e.target.type === 'file' ? e.target.files : e.target.value,
  });

  // Create image url for preview
  if (e.target.type === 'file') {
    let url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
  }
};

const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();

    // Configuration
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };
    console.log(handleSubmit)

    // Store data with FormData as object
    const formData = new FormData();
    if (form.thumbnailfilm) {
      formData.set('image', form?.thumbnailfilm[0], form?.thumbnailfilm[0]?.name);
    }
    formData.set('title', form.title);
    formData.set('year', form.year);
    // formData.set('linkfilm', form.linkfilm);
    formData.set('description', form.description);
    formData.set("categoryId", Number(form.category_id));
    // let category_id = form.category_id.map((categoryId) => Number(categoryId))
    // formData.set('category_id', JSON.stringify(category_id));


    const response = await API.patch(
      '/film/' + id,
      formData,
      config
    );
    console.log(response.data);

    navigate('/Film');
  } catch (error) {
    console.log(error);
  }
});
   

    return (
        <>
        <div
        className="bg-black text-white py-5"
        style={{ padding: "0px 170px" }}>
        <h5 className="fw-bold mb-5 ">Add Film</h5>
        <Form className="secondary" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder={form?.title}
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                  color: "white",
                }}
                name="title"
                onChange={handleChange}
                value={form?.title}
              />
            </Col>

            <Col md={12} lg={4} xl={3}>
              <label
                htmlFor="thumbnailFilm"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  padding: "8px 40px 8px 40px",
                  color: "#6C757D",
                  borderRadius: "6px",
                  border: "1px solid white",
                  fontSize: "14px",
                  fontWeight: "lighter",
                }}>
                Attach Thumbnail
                <IoMdAttach
                  style={{
                    color: "#E50914",
                    fontSize: "30px",
                    marginLeft: "8px",
                  }}
                />
              </label>
              <input
                type="file"
                name="thumbnailfilm"
                onChange={handleChange} 
                // onClick={handleClickAttach} 
                id="thumbnailFilm"
                hidden
              />
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Control
              style={{
                background: "rgba(210, 210, 210, 0.25)",
                height: "50px",
                color: "white",
              }}
              type="number"
              placeholder="Year"
              name="year"
              onChange={handleChange}
              value={form?.year}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridAddress2">
            <InputGroup className="mb-3 mt-3">
              <Form.Select
onChange={handleChange}
                style={{
                  backgroundColor: "#353535",
                  borderColor: "white",
                  color: "#6C757D",
                }}
                name="category_id"
                >
                <option value="">Select Category</option>
                {categories?.map((item) => {
                  return (
                    <option value={item.id} name={item.id}
                    // categoryId={form?.category_id}
                    // handleChangeCategoryId={handleChangeCategoryId}
                    >
                      {item.name}
                    </option>
                    
                  );
                })}
              </Form.Select>
            </InputGroup>
          </Form.Group>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            style={{
              background: "rgba(210, 210, 210, 0.25)",
              marginBottom: "66px",
              resize: "none",
              height: "177px",
              color: "white",
            }}
            name="description"
            onChange={handleChange}
            value={form?.description}
          />

          {/* episode */}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
              type="submit"
              style={{
                width: "200px",
                height: "40px",
                background: "#E50914",
                border: "1px solid black",
                fontWeight: "bold",
              }}
              >
              Save
            </Button>
          </div>
        </Form>
      </div>
        </>
    )
}
export default Updatefilm;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// // import icclip from "../../img/icon/cliplogo.png";
// // import "../../CSS/Mainpage.css";
// import { useMutation, useQuery } from "react-query";
// import { API } from "../config/api";
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// export default function Updatefilm() {
//   const {id} = useParams()
//   console.log("Kontol : ",id)
//   const navigate = useNavigate();
//   const MySwal = withReactContent(Swal);
//   const [cat, setCat] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     thumbnailfilm: "",
//     year: "",
//     description: "",
//     categoryId: "",
//   });
//   // let { data: getfilms } = useQuery("UpdateChache", async () => {
//   //   const response = await API.get("/film/"+ id);
//   //   console.log("data :", response.data);
//   //   return response.data;
//   // });

//   const getCategories = async () => {
//     try {
//       const response = await API.get('/category')
//       setCat(response.data.data)
//       console.log("data asu : ", response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleOnChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
//     });
//     if (e.target.type === "file") {
//       let url = URL.createObjectURL(e.target.files[0]);
//       console.log(url)
//     }
//   };
//   const handleOnSubmit = useMutation(async (e) => {
//     try {
//       e.preventDefault();

//       const config = {
//         headers: {
//           "Content-type": "multipart/formdata",
//         },
//       };
//       const formData = new FormData();
//       formData.set("title", form.title);
//       formData.set("thumbnailfilm", form.thumbnailfilm[0], form.thumbnailfilm[0]);
//       formData.set("year", form.year);
//       formData.set("description", form.description);
//       formData.set("categoryId", Number(form.categoryId));

//       const response = await API.patch(`/film/${id}`, formData, config);
//       console.log("add film success : ", response);
//       MySwal.fire({
//         title: <strong>Add Film Success</strong>,
//         html: <i>You clicked the button!</i>,
//         icon: 'success'
//       })
//       navigate('/Film')
      
//     } catch (error) {
//       console.log("add film failed : ", error);
//       console.log(form);

//       MySwal.fire({
//         title: <strong>Sadge</strong>,
//         icon: 'error'
//       })
//     }
//   });

//   useEffect(() => {
//     getCategories()
//   }, [])

//   return (
//     <div className="bg-black" style={{ height: "600px" }}>
//       <section id="project-form">
//         <div class="container">
//           <h2 class=" mb-2 pt-5 text-light" style={{ marginLeft: "140px" }}>
//             Add Film
//           </h2>
//           <form method="post" class="w-75 mx-auto" onSubmit={(e) => handleOnSubmit.mutate(e)}>
//             <input type="text" class="d-none" name="id" />
//             <div class="mb-3 d-flex align-items-center">
//               <input onChange={handleOnChange} value={form.title} type="text" class="bg-dark form-control text-light w-75 h-50" name="title" id="title" placeholder="Title" style={{ color: "white" }} />
//               <div className="position-relative">
//                 <label type="file" for="attachfile" class="form-label fw-bold bg-dark rounded text-secondary border border-light" style={{ width: "150px", padding: "5px", marginTop: "5px", marginLeft: "70px", fontSize: "10pt" }}>
//                   Attach Thumbnail
//                   <input onChange={handleOnChange}  type="file" id="thumbnailFilm" name="thumbnailFilm" className="position-absolute" style={{ width: "", opacity: "0", left: "70px", bottom: "10px" }} />
//                 </label>
//                 <div for="attachfile" className=" position-absolute" style={{ bottom: "14px", left: "200px" }}>
//                   {/* <img className="w-75" src={icclip} style={{}} /> */}
//                 </div>
//               </div>
//             </div>

//             <div class="mb-3">
//               <input onChange={handleOnChange} type="number" class="bg-dark form-control text-light w-100 h-50" name="year" id="projectName" placeholder="Year" width={{}} />
//             </div>

//             <div class="mb-3">
//               <select onChange={handleOnChange} name="categoryId" id="categoryId" class="form-select bg-dark text-light" aria-label="Default select example">
//                 <option >Category</option>
//                 {cat &&
//                   cat.map((item , index) => (
//                     <option key={index} className="text-light bg-dark" name={item.id} value={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//             <div class="mb-3">
//               <textarea onChange={handleOnChange} class="form-control bg-dark text-light" id="description" name="description" placeholder="Description" required>
//                 Description
//               </textarea>
//             </div>
//             <button type="submit" class="bg-danger form-control text-light w-25 h-50 float-end border-0 fw-bold" name="projectName" id="projectName" placeholder="LMFAO" width={{}}>
//                 save
//               </button>
//             {/* <div class="mb-3 d-flex align-items-center">
//               <input type="text" class="bg-dark form-control text-light w-75 h-50" name="projectName" id="projectName" placeholder="Title Episode" width={{}} />
//               <div className="position-relative">
//                 <label type="file" for="attachfile" class="form-label fw-bold bg-dark rounded text-secondary border border-light" style={{ width: "150px", padding: "5px", marginTop: "5px", marginLeft: "70px", fontSize: "10pt" }}>
//                   Attach Thumbnail
//                   <input type="file" id="fname" name="fname" className="position-absolute" style={{ width: "", opacity: "0", left: "70px", bottom: "10px" }} />
//                 </label>
//                 <div for="attachfile" className=" position-absolute" style={{ bottom: "14px", left: "200px" }}>
//                   <img className="w-75" src={icclip} style={{}} />
//                 </div>
//               </div>
//             </div>
//             <div class="mb-3">
//               <input type="text" class="bg-dark form-control text-light w-100 h-50" name="projectName" id="projectName" placeholder="Link Film" width={{}} />
//             </div>
//             <div class="mb-3">
//               <input type="text" class="bg-dark form-control text-light w-100 h-50" name="projectName" id="projectName" placeholder="LMFAO" width={{}} />
//             </div>
//             <div class="pb-5 mt-4">
              
//             </div> */}
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }