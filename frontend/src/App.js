import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import ProductListPage from "./pages/ProductListPage"
import LoginPage from "./pages/LoginPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import RegisterPage from "./pages/RegisterPage"
import UserProfilePage from "./pages/user/UserProfilePage"
import UserOrdersPage from "./pages/user/UserOrdersPage"
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage"
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage"
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/product-list" element={<ProductListPage/>}></Route>
        <Route path="/product-details" element={<ProductDetailsPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="*" element="ERROR 404 PAGE NOT FOUND"></Route>

        <Route element={<ProtectedRoutesComponent/>}>
          <Route path="/user" element={<UserProfilePage/>}></Route>
          <Route path="/user/my-orders" element={<UserOrdersPage/>}></Route>
          <Route path="/user/cart-details" element={<UserCartDetailsPage/>}></Route>
          <Route path="/user/order-details" element={<UserOrderDetailsPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
