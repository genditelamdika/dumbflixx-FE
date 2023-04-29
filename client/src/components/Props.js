import { Link } from "react-router-dom"

const Cards = (props) => {
    
    const objTv = Object.values(props.value.TV)
    const objmovie = Object.values(props.value.Movies)
    console.log(objTv)
    const ListMovies = () => {
        return objTv.map((gendi) => {
            return (
                <Link to={`/Detail/${gendi.id}`}>

                <div className="flex">
                <div className="props">
                    <img src={require(`../image/Cards/${gendi.image}.png` )} />
                    <p className="text-decoration-none">{gendi.name}</p>
                    <p >{gendi.year}</p>
                </div>
                </div>
                </Link>
            )
        })
    }
    const ListTV = () => {
        return objmovie.map((tv) => {
            return (
                <div className="flex">

                <div className="props">
                    <img src={require(`../image/Cards/${tv.image}.png` )} />
                    <p >{tv.name}</p>
                    <p >{tv.year}</p>
                </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div>
                <p className=" text-white text-3xl mb-8">TV Series</p>
            </div>
            <div className="flex gap-6">
                <ListMovies/>
            </div>
            <div>
                <p className=" text-white text-3xl mb-8">Movies</p>
            </div>
            <div className="flex gap-6">
                <ListTV/>
            </div>
        </div>
    )
}

export default Cards


// export default function Props(Tv) {
//     return (
//         <>
//         <div className="props">
//             <h1>
//                 Ini Props!
//             </h1>
//             <img src={require(`../image/${Tv.img}`)}></img>
//             <p>{Tv.name}</p>
//             <p>{Tv.years}</p>

//         </div>
//         <div>
//         <img src={require(`../image/${Tv.img}`)}></img>
//             <p>{Tv.name}</p>
//             <p>{Tv.years}</p>
//         </div>
//         </>
//     )
// }

