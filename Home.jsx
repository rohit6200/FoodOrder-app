import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Model from "../Model";
import Cart from "./Cart";
import Carousal from "../components/Carousal";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { useCart } from "../components/ContexReducer";
// import MyOrder from '../screens/MyOrder'

const Home = () => {
  let data = useCart();

  const [cartView, setCartView] = useState(false);
  const [search, setSearch] = useState("");
  const [foodCart, setFoodCart] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const navigate = useNavigate();

  const handlerLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCart(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
              <Link className="navbar-brand fs-1 fs" to="/">
                GoFood
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  {localStorage.getItem("authToken") ? (
                    <li className="nav-item">
                      <Link
                        className="nav-link active fs-5"
                        aria-current="page"
                        to="/myOrder"
                      >
                        MyOrder
                      </Link>
                    </li>
                  ) : null}
                </ul>

                {!localStorage.getItem("authToken") ? (
                  <div className="d-flex">
                    <Link
                      className="btn bg-white text-success mx-1"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="btn bg-white text-success mx-1"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div
                      className="btn bg-white text-success mx-2"
                      onClick={() => setCartView(true)}
                    >
                      My Cart{" "}
                      <Badge pill bg="danger">
                        {data.length}
                      </Badge>
                    </div>
                    {/* MyCard Logic */}
                    {cartView ? (
                      <Model onClose={() => setCartView(false)}>
                        <Cart />
                      </Model>
                    ) : null}
                    <div
                      className="btn bg-white text-danger mx-2"
                      onClick={handlerLogout}
                    >
                      LogOut
                    </div>
                  </div>
                )}
                <div className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Carousal />
      <hr />
      <div className="container">
        {foodCart.length !== 0 ? (
          foodCart.map((data) => {
            return (
              <div className="row mb-3" key={data._id}>
                <div className="col-12">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                </div>
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>......................</div>
        )}
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default Home;
