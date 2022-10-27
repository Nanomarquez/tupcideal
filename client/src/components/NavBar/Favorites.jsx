import { useSelector, useDispatch } from "react-redux";
import { deleteFavoritesList } from "../../redux/actions";
export default function Favorites() {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.products.favorites)
    console.log(favorites)
    return (
      <>
        <div className="container flex min-h-[50vh]">
          <h2>Favoritos</h2>
          {[...new Set(favorites)].map((f, i) => (
            <div key={i} className="flex items-center ">
              <img src={f.image} alt={f.name} width={140} />
              <h3 className="p-5">{f.name}</h3>
              <h3 className="m-5">{f.price_usd}</h3>
              {/* <h3>{f.rating}</h3> */}
              <button onClick={() => {
                dispatch(deleteFavoritesList(f.id))}}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </>
    );
}