import {BrowserRouter, Routes, Route} from "react-router-dom"

//Components
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"
//User Components
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent"
//Publicly available pages
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import ProductListPage from "./pages/ProductListPage"
import LoginPage from "./pages/LoginPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import RegisterPage from "./pages/RegisterPage"
//Protected User Pages
import UserProfilePage from "./pages/user/UserProfilePage"
import UserOrdersPage from "./pages/user/UserOrdersPage"
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage"
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage"
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent"
//Protected Admin Pages
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage"
import AdminChatsPage from "./pages/admin/AdminChatsPage"
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage"
import AdminEditProductPage from "./pages/admin/AdminEditProductPage"
import AdminEditUserPage from "./pages/admin/AdminEditUserPage"
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage"
import AdminOrdersPage from "./pages/admin/AdminOrdersPage"
import AdminProductsPage from "./pages/admin/AdminProductsPage"
import AdminUsersPage from "./pages/admin/AdminUsersPage"

function App() {
  return (
    <BrowserRouter>
    <HeaderComponent/>
      <Routes>
        <Route element={<RoutesWithUserChatComponent/>}>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/product-list" element={<ProductListPage/>}></Route>
          <Route path="/product-details" element={<ProductDetailsPage/>}></Route>
          <Route path="/cart" element={<CartPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="*" element="ERROR 404 PAGE NOT FOUND"></Route>
        </Route>

        <Route element={<ProtectedRoutesComponent admin={false}/>}>
          <Route path="/user" element={<UserProfilePage/>}></Route>
          <Route path="/user/my-orders" element={<UserOrdersPage/>}></Route>
          <Route path="/user/cart-details" element={<UserCartDetailsPage/>}></Route>
          <Route path="/user/order-details" element={<UserOrderDetailsPage/>}></Route>
        </Route>
        

        <Route element={<ProtectedRoutesComponent admin={true}/>}>
          <Route path="/admin/users" element={<AdminUsersPage/>}></Route>
          <Route path="/admin/edit-user" element={<AdminEditUserPage/>}></Route>
          <Route path="/admin/products" element={<AdminProductsPage/>}></Route>
          <Route path="/admin/create-new-product" element={<AdminCreateProductPage/>}></Route>
          <Route path="/admin/edit-product" element={<AdminEditProductPage/>}></Route>
          <Route path="/admin/orders" element={<AdminOrdersPage/>}></Route>
          <Route path="/admin/order-details" element={<AdminOrderDetailsPage/>}></Route>
          <Route path="/admin/chats" element={<AdminChatsPage/>}></Route>
          <Route path="/admin/analytics" element={<AdminAnalyticsPage/>}></Route>
        </Route>
          
      </Routes>
      
      <FooterComponent/>
    </BrowserRouter>
  );
}

export default App;
