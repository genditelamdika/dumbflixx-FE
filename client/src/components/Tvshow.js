import Props from "./Props"
import Button from 'react-bootstrap/Button';
import Cards from "./Cards";
import { useQuery } from "react-query";
import { API } from '../config/api';
function Tvshow(){
    // const movie ={
    //     TV:{
    //       tv1: {
    //         image: 'Card1',
    //         name: 'The Witcher',
    //         year: '2019'
    //       },
    //       tv2: {
    //         image: 'Card1',
    //         name: 'Persona 3 The Movie',
    //         year: '2016'
    //       },
    //       tv3: {
    //         image: 'Card3',
    //         name: 'Personal 3 The Movie',
    //         year: '2016'
    //       },
    //       tv4: {
    //         image: 'Card1',
    //         name: 'Personal 3 The Movie',
    //         year: '2016'
    //       },
    //       tv5: {
    //         image: 'Card3',
    //         name: 'Personal 3 The Movie',
    //         year: '2016'
    //       },
    //       tv6: {
    //         image: 'Card2',
    //         name: 'Personal 3 The Movie',
    //         year: '2016'
    //       },
      
    //     },
    //     Movies: {
    //         Movie1: {
    //           image: 'Card1',
    //           name: 'title1',
    //           year: '2019'
    //         },
    //         Movie2: {
    //           image: 'Card3',
    //           name: 'tMovie2',
    //           year: '2018'
    //         },
    //         Movie3: {
    //           image: 'Card1',
    //           name: 'title1',
    //           year: '2019'
    //         },
    //         Movie4: {
    //           image: 'Card1',
    //           name: 'title1',
    //           year: '2019'
    //         },
    //         Movie5: {
    //           image: 'Card1',
    //           name: 'title1',
    //           year: '2019'
    //         },
    //         Movie6: {
    //           image: 'Card1',
    //           name: 'title1',
    //           year: '2019'
    //         },
    //       }
      
        
    //   }
    let { data: films } = useQuery("filmsCache", async () => {
      const response = await API.get("/films");
      return response.data.data;
    });
    const movies = films?.filter((item)=> item.categoryID === 1)
    const series = films?.filter((item)=> item.categoryID === 2)

    return(<div className="bg">
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

        <img className="kontol" src={require( "../image/money.png")} alt="gambar"></img>
        <div style={{ background: "black", padding: "20px" }}>
        <div className="mx-4 gap-5">
        <p className="fs-6 fw-semibold text-white mt-5">Series</p>
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
         </div>
    </div>
    </div>
    </div>
    )
}
export default Tvshow