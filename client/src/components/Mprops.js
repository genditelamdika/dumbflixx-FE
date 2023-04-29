import { Link } from "react-router-dom"

const Cards = (props) => {
    
    const obj1 = Object.values(props.value.TV)
    const obj2 = Object.values(props.value.Movies)
    console.log(obj1)
    const ListMovies = () => {
        return obj1.map((movie) => {
            return (
                <Link to={`/Detail/${movie.id}`}>

                <div className="flex">
                <div className="props">
                    <img src={require(`../image/Cards/${movie.image}.png` )} />
                    <p className="text-decoration-none">{movie.name}</p>
                    <p >{movie.year}</p>
                </div>
                </div>
                </Link>
            )
        })
    }
    const ListTV = () => {
        return obj2.map((tv) => {
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
                <p className=" text-white text-3xl mb-8">Movies</p>
            </div>
            <div className="flex gap-6">
                <ListMovies/>
            </div>
            <div>
                <p className=" text-white text-3xl mb-8"></p>
            </div>
            <div className="flex gap-6">
                <ListTV/>
            </div>
        </div>
    )
}

export default Cards
