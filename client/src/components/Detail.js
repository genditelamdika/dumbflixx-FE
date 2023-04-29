import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

import ReactPlayer from "react-player";
import jumbo from "../image/Jumbotron.png";
import tangle from "../image/Rectangle65.png";
import { Carousel } from "react-bootstrap";
import { useState } from "react";

function Detail() {
  const { id } = useParams();
  // const [currentEpisode, setCurrentEpisode] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  let { data: film } = useQuery("filmCache", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });
  console.log(film);

  console.log(id);
  let { data: episode } = useQuery("episodeCache", async () => {
    const response = await API.get(`/film/${id}/episode`);
    return response.data.data;
  });
  const [currentEpisode, setCurrentEpisode] = useState(0);

  const handleNextEpisode = () => {
    setCurrentEpisode((currentEpisode) => currentEpisode + 1);
  };

  // const handleNextEpisode = () => {
  //   setCurrentEpisode((prev) => prev + 1);
  //   setCurrentVideo(0);
  // };

  // const handleNextVideo = () => {
  //   setCurrentVideo((prev) => prev + 1);
  // };

  return (
    <>
      <div className="bg">
        <div className="px-5">
          <Carousel>


            {episode && (
              <ReactPlayer
            //   style={{height:"1000px",
            // width:"1000px",}}
              light={film?.thumbnailfilm}
              className="player"
              url={episode[currentEpisode]?.linkfilm}
              />
              )}
            <div className="text-center m-5">
            <Button
            className="ms-3"
            variant="primary"
            onClick={handleNextEpisode}
            >
            Next Video
          </Button>
            </div>
            <div className="d-flex justify-content-between pt-5 px-5 text-white">
              <div className="d-flex justify-content-nearly">
                <div>

              <img src={film?.thumbnailfilm} />
              
                </div>

                <div>
                <p
                className="px-4 d-col"
                style={{
                  display: "Block",
                }}
                >
                <p>
                  <h1 className="white ">{film?.title}</h1>
                  <div className="d-flex justify-content-between">
                  <p className="white">{film?.year}</p>
                  <p className="white">{film?.category.name}</p>

                  </div>
                  <p className="white">{film?.description}</p>
                  <Button
                    className="px-5 fw-semibold shadow-sm"
                    variant="danger"
                    >
                    Watch Now{" "}
                  </Button>
                </p>
                      </p>
                </div>
              
              </div>
              <div>
              {episode &&
              episode.map((item, i) => (
                <Carousel.Item
                  key={i}
                  className={
                    i === currentEpisode
                      ? "carousel-item active"
                      : "carousel-item"
                  }
                >
                  <ReactPlayer
                    url={item?.linkfilm}
                    light={item?.thumbnailfilm}
                  />
                  {/* <img className="d-block w-100" alt="First slide" /> */}
                </Carousel.Item>
              ))}

              </div>
            </div>
            
          </Carousel>
          
            
        </div>
      </div>
    </>
  );
}
export default Detail;

// import React, { useState } from "react";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import { API } from '../config/api';

// import { useState } from "react";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import API from "./API";

// function Detail() {
//   const { id } = useParams();
//   const [currentEpisode, setCurrentEpisode] = useState(0);
//   const [currentVideo, setCurrentVideo] = useState(0);

//     let { data: film } = useQuery("filmCache", async () => {
//       const response = await API.get(`/film/${id}`);
//       return response.data.data;

//     });

//     console.log(id);
//     let { data: episodes } = useQuery("episodeCache", async () => {
//       const response = await API.get(`/film/${id}/episode`);
//       return response.data.data;

//     });

//   const handleNextEpisode = () => {
//     setCurrentEpisode((prev) => prev + 1);
//     setCurrentVideo(0);
//   };

//   const handleNextVideo = () => {
//     setCurrentVideo((prev) => prev + 1);
//   };

//   return (
//     <div>
//       <h1>{film?.title}</h1>
//       <div>
//         <h2>Episodes:</h2>
//         <ul>
//           {episodes.map((episode, index) => (
//             <li key={index}>
//               <h3>{episode?.titleepisode}</h3>
//               <p>{episode?.description}</p>
//               <div>
//                 {episode.map((video, index) => (
//                   <div key={index}>
//                     {index === currentVideo && (
//                       <video src={video?.linkfilm} controls autoPlay />
//                     )}
//                   </div>
//                 ))}
//                 <button onClick={handleNextVideo}>
//                   Next Video
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {/* {currentEpisode < episodes.length - 1 && (
//           <button onClick={handleNextEpisode}>
//             Next Episode
//           </button>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default Detail;
