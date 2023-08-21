import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Resturant from "./components/Resturant";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddRestaurant from "./components/RestaurantForm";
import RestaurantDetails from "./components/RestaurantDetails";
import CategoryForm from "./components/CategoryForm";
import ItemForm from "./components/ItemForm";

function App() {
  const [token, setToken] = useState(
    localStorage.AuthKey != undefined || localStorage.AuthKey != ""
  );

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/signin" />} />
          <Route
            exact
            path="/signin"
            element={<Signin setToken={setToken} />}
          />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Header className="" />
        <div className="main-container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Navigate to="/dashboard" />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/resturant" element={<Resturant />} />
            <Route
              key={"addresturant"}
              path="/addresturant"
              element={<AddRestaurant isEdit={false} />}
            />
            <Route
              path="/editrestaurant/:restaurantId"
              key={"editrestaurant"}
              element={<AddRestaurant isEdit={true} />}
            />
            <Route
              path="/restaurantdetails/:restaurantId"
              element={<RestaurantDetails />}
            />
            <Route path="/category" element={<CategoryForm />}></Route>
            <Route path="/addItem" element={<ItemForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
