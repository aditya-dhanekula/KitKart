import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'

import axios from 'axios'

const UserCartDetailsPage = () => {

  const reduxDispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo)

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id)
    return data
  }

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      userInfo={userInfo}
      reduxDispatch={reduxDispatch}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      getUser={getUser}
    />
  );
};

export default UserCartDetailsPage;
