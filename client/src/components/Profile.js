import React, { useContext, useEffect, useState } from "react";
import "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from '../config/api';
import { useParams } from "react-router-dom";

function Profile() {

  const [profileData,setProfil] = useState({});

  const getProfileData = async () => {
    try {
      const id = Number(localStorage.getItem("id"))
      const response = await API.get(`/user/${id}`);
      setProfil(response.data.data)
      console.log(profileData)
    }catch(error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    getProfileData()
  },[])

  // let { data: profile } = useQuery('profileCache', async () => {
  //   const response = await API.get(`/user/${id}`);
  //   return response.data.data;
  // });


    return (
      <>
      {/* {profile !== undefined ? ( */}
      <div
        style={{ background: "black", height: "90.5vh", margin:"20px" }}
        className="d-flex align-items-center justify-content-center">
        <div
          style={{
            background: "#1f1f1f",
            padding: "25px",
            borderRadius: "5px",
            width: "40rem",
          }}>
          <Row>
            <Col sm={6} style={{ marginTop: "-5px", paddingRight: "55px", }}>
              <>
                <h4 className="mb-5 text-white">Personal Info</h4>
              </>
  
              <div className="d-flex mb-3">
              <img src={require( "../image/Vector.png")} className="me-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-white" style={{ fontSize: "" }}>
                  {profileData.name}</p>
                  <p className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Full name</p>
                </span>
              </div>
  
              <div className="d-flex mb-3">
              <img src={require( "../image/Vector2.png")} className="me-3" style={{height:"30px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-white" style={{ fontSize: "14px" }}>
                  {profileData.email}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Email
                  </p>
                </span>
              </div>
  
              <div className="d-flex mb-3">
              <img src={require( "../image/Vector3.png")} className="me-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-white" style={{ fontSize: "14px" }}>
                  {profileData.gender}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                      Gender
                  </p>
                </span>
              </div>
  
              <div className="d-flex mb-3">
              <img src={require( "../image/Vector4.png")} className="me-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-white" style={{ fontSize: "14px" }}>
                  Active
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Active
                  </p>
                </span>
              </div>
  
              <div className="d-flex mb-3">
              <img src={require( "../image/Vector4.png")} className="me-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-white" style={{ fontSize: "14px" }}>
                  {profileData.phone}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Mobile Phone
                  </p>
                </span>
              </div>
  
              <div className="d-flex">
             <img src={require( "../image/Vector5.png")} className="me-3 w-3 h-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-white" style={{ fontSize: "14px" }}>
                  {profileData.address}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Address
                  </p>
                </span>
              </div>
            </Col>
            <Col sm={6} style={{ paddingLeft: "10px" }}>
              <img
                src={require( "../image/profile.png" )}
                alt="Profile"
                style={{
                  width: "280px",
                  height: "345px",
                  borderRadius: "5px",
                  left:"838px",
                  top:"163px",
                }}></img>
              <button
                className=" mt-3"
                style={{ background: "red", border: "none",
                position: "absolute;",
width: "280px",
height: "50px",
left: "838px",
top: "521px", }}>
                Change Photo Profile
              </button>{" "}
            </Col>
          </Row>
        </div>
      </div>
        </>
    );
  }
  
  export default Profile

//   import React, { useContext } from "react";
// import "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import "../assets/css/detail-account.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { CgProfile } from "react-icons/cg";
// import { FiMail } from "react-icons/fi";
// import { RiVipFill } from "react-icons/ri";
// import { TbGenderBigender } from "react-icons/tb";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import { SiGooglemaps } from "react-icons/si";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import { API } from "../config/api";
// import { UserContext } from "../context/userContext";

// // import { generateFromString } from "generate-avatar";

// function Profile() {
//   // const title = 'Profile';
//   const params = useParams();
//   let id = params.id;
//   const title = "Profile";
//   document.title = "Dumbflix | " + title;

//   // const [state] = useContext(UserContext);

//   let { data: profile } = useQuery("profileCache", async () => {
//     const response = await API.get(`/ser/${id}`);
//     return response.data.data;
//   });


//   return (
//     <div
//       style={{ background: "black", height: "90.5vh" }}
//       className="d-flex align-items-center justify-content-center">
//       <div
//         style={{
//           background: "#1f1f1f",
//           padding: "25px",
//           borderRadius: "5px",
//           width: "40rem",
//         }}>

//           <>
//             <Row>
//               <Col sm={6} style={{ marginTop: "-5px", paddingRight: "55px" }}>
//                 <>
//                   <h4 className="mb-5 text-white">Personal Info</h4>
//                 </>
//                 <div className="d-flex mb-3">
//                   <CgProfile className="CgProfile me-3" />
//                   <span style={{ marginTop: "-3px" }}>
//                     <p className="text-white" style={{ fontSize: "14px" }}>
//                       {profile.profile.email}
//                     </p>
//                     <p
//                       className="text-muted"
//                       style={{ marginTop: "-15px", fontSize: "12px" }}>
//                       Full name
//                     </p>
//                   </span>
//                 </div>

//                 <div className="d-flex mb-3">
//                   <FiMail className="FiMail me-3" />
//                   <span style={{ marginTop: "-3px" }}>
//                     <p className="text-white" style={{ fontSize: "14px" }}>
//                       {profile.profile.email}
//                     </p>
//                     <p
//                       className="text-muted"
//                       style={{ marginTop: "-15px", fontSize: "12px" }}>
//                       Email
//                     </p>
//                   </span>
//                 </div>

//                   <div className="d-flex mb-3">
//                     <RiVipFill className="RiVipFill me-3" />
//                     <span style={{ marginTop: "-3px" }}>
//                       <p className="text-white" style={{ fontSize: "14px" }}>
//                         Admin
//                       </p>
//                       <p
//                         className="text-muted"
//                         style={{ marginTop: "-15px", fontSize: "12px" }}>
//                         Status
//                       </p>
//                     </span>
//                   </div>
        
//                   <div className="d-flex mb-3">
//                     <RiVipFill className="RiVipFill me-3" />
//                     <span style={{ marginTop: "-3px" }}>
//                       <p className="text-white" style={{ fontSize: "14px" }}>
//                         Active
//                       </p>
//                       <p
//                         className="text-muted"
//                         style={{ marginTop: "-15px", fontSize: "12px" }}>
//                         Status
//                       </p>
//                     </span>
//                   </div>
                

//                 <div className="d-flex mb-3">
//                   <TbGenderBigender className="TbGenderBigender me-3" />
//                   <span style={{ marginTop: "-3px" }}>
//                     <p className="text-white" style={{ fontSize: "14px" }}>
//                       {profile.profile.gender}
//                     </p>
//                     <p
//                       className="text-muted"
//                       style={{ marginTop: "-15px", fontSize: "12px" }}>
//                       Gender
//                     </p>
//                   </span>
//                 </div>

//                 <div className="d-flex mb-3">
//                   <BsFillTelephoneFill className="BsFillTelephoneFill me-3" />
//                   <span style={{ marginTop: "-3px" }}>
//                     <p className="text-white" style={{ fontSize: "14px" }}>
//                       {profile.profile.phone}
//                     </p>
//                     <p
//                       className="text-muted"
//                       style={{ marginTop: "-15px", fontSize: "12px" }}>
//                       Mobile Phone
//                     </p>
//                   </span>
//                 </div>

//                 <div className="d-flex">
//                   <SiGooglemaps className="SiGooglemaps me-3" />
//                   <span style={{ marginTop: "-3px" }}>
//                     <p className="text-white" style={{ fontSize: "14px" }}>
//                       {profile.profile.address}
//                     </p>
//                     <p
//                       className="text-muted"
//                       style={{ marginTop: "-15px", fontSize: "12px" }}>
//                       Address
//                     </p>
//                   </span>
//                 </div>
//               </Col>
//               {/* <Col sm={6} style={{ paddingLeft: "55px" }}>
//                 <img
//                   src={`data:image/svg+xml;utf8,${generateFromString(
//                     profile.email
//                   )}`}
//                   alt="Profile"
//                   style={{
//                     width: "100%",
//                     height: "maxHeight",
//                     borderRadius: "5px",
//                   }}></img>
//               </Col> */}
//             </Row>
//           </>
        
//         //   <>
//         //     <p className="text-white">Data Tidak Ditemukan</p>
//         //   </>
//         // 
//       </div>
//     </div>
//   );
// }

// export default Profile;