import Mprops from "./Mprops"
import { Link } from "react-router-dom";
import { Col, NavDropdown, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from '../config/api';
import Button from 'react-bootstrap/Button';
function Tvshow(){
  // const movie ={
  //   TV:{
  //     tv1: {
  //       id:1,
  //       image: 'Card1',
  //       name: 'The Witcher',
  //       year: '2019'
  //     },
  //     tv2: {
  //       id:2,
  //       image: 'Card2',
  //       name: 'Persona 3 The Movie',
  //       year: '2016'
  //     },
  //     tv3: {
  //       id:3,
  //       image: 'Card3',
  //       name: 'Personal 3 The Movie',
  //       year: '2016'
  //     },
  //     tv4: {
  //       id:4,
  //       image: 'Card4',
  //       name: 'Personal 3 The Movie',
  //       year: '2016'
  //     },
  //     tv5: {
  //       id:5,
  //       image: 'Card5',
  //       name: 'Personal 3 The Movie',
  //       year: '2016'
  //     },
  //     tv6: {
  //       id:6,
  //       image: 'Card2',
  //       name: 'Personal 3 The Movie',
  //       year: '2016'
  //     },
  
  //   },
  
  //   Movies: {
  //     Movie1: {
  //       image: 'Card6',
  //       name: 'title1',
  //       year: '2019'
  //     },
  //     Movie2: {
  //       image: 'Card3',
  //       name: 'tMovie2',
  //       year: '2018'
  //     },
  //     Movie3: {
  //       image: 'Card1',
  //       name: 'title1',
  //       year: '2019'
  //     },
  //     Movie4: {
  //       image: 'Card1',
  //       name: 'title1',
  //       year: '2019'
  //     },
  //     Movie5: {
  //       image: 'Card1',
  //       name: 'title1',
  //       year: '2019'
  //     },
  //     Movie6: {
  //       image: 'Card1',
  //       name: 'title1',
  //       year: '2019'
  //     },
  //   }
  // }
  let { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });
  console.log(films);
  
    return(
        <div className="bg">
        <div className="the">
        <img  src={require( "../image/lacasa.png")} alt="gambar"></img>
        <div>
        <p className="text-white">Tailwind CSS adalah kerangka kerja CSS yang di dalamnya terdapat sekumpulan utility classes untuk membangun antarmuka kustom dengan cepat. Tailwind CSS berbeda dengan kerangka kerja CSS seperti Bootstrap, Bulma, atau Foundation, karena Tailwind CSS bukan sebuah UI Framework. Wikipedia
        </p>
        </div>
        <div className="watch">
        <Button className='px-5 fw-semibold shadow-sm 'variant='danger' >Watch Now </Button>
        </div>
        </div>

        <img className="kontol" src={require( "../image/joker.png")} alt="gambar"></img>
        <div className="d-flex flex-wrap justify-content-center gap-4">
         {films?.map((item) => (
           <div className="flex">
            <div className="props">
            <Link to={`/Detail/${item.id}`}><img src={item.thumbnailfilm}/></Link>
            <h5>

            <Link to={`/Detail/${item.id}`}>{item.title}</Link>
            </h5>
            <h5>{item.year}</h5>

            </div>

          </div>

         ))} 
         </div>
    </div>
    )
}
export default Tvshow