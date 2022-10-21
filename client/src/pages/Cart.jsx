import { useSelector, useDispatch } from "react-redux"
import { deleteProductToShoppingCart } from "../redux/actions";

export default function Cart () {
  const dispatch = useDispatch()
  const productsCart = useSelector((state) => state.products.addProductToCart);
  let totalPrice = 0
  productsCart.map(p => totalPrice = totalPrice + p.price)
  return (
    <>
      <div className="container m-auto min-h-[50vh]">
        <h2>Productos</h2>
        {productsCart.length === 0 ? (
          <h2>Carrito de compras vacio</h2>
        ) : (
          productsCart.map((p, i) => (
            <div key={i} className="flex">
              <img src={p.image} alt={p.name} />
              <h3>Name {p.name}</h3>
              <div>Descricion {p.description}</div>
              <span>Stock {p.quantity}</span>
              <span>Precio {p.price}</span>
              <button
                onClick={() => dispatch(deleteProductToShoppingCart(p.id))}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
        {productsCart.length ? (
          <div className="container text-right block">
            <div className="font-bold">
              Total: <span>{totalPrice}</span>{" "}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}