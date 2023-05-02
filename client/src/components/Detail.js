import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

import ReactPlayer from "react-player";
import jumbo from "../image/Jumbotron.png";
import tangle from "../image/Rectangle65.png";
import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  // const [currentEpisode, setCurrentEpisode] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [deleteid, setDelete] = useState(null);
  

  let { data: film } = useQuery("filmCache", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });
  console.log(film);

  console.log(id);

  const handleDelete = (e) => {
    e.preventDefault();
    const btnvalue = e.target.value;
    setDelete(Number(btnvalue));
  };
  let { data: episode, refetch } = useQuery("episodeCache", async () => {
    const response = await API.get(`/film/${id}/episode`);
    return response.data.data;
  });
  const deletebyId = useMutation(async (id) => {
    try {
      await API.delete(`/episode/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    deletebyId.mutate(deleteid);
  }, [deleteid]);

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
        <div className="px-5 w-5 h-5">
          <Carousel className="w-5 h-5">


            {episode && (
              <ReactPlayer
              style={{height:"100%",
            width:"100%",}}
            height={"500px"}
            width={"1000px"}
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
                    light={item?.thumbnailepisode}

                  />
                  <h1 style={{height:"10 px"}}>{item?.titleepisode}</h1>
                      <button onClick={handleDelete} type="buton" className="shadow  btn btn-danger fw-bold  " style={{width:"70px"}} name={item.id} value={item.id}>
                        Delete
                      </button >
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

