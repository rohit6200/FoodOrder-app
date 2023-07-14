import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Home from "./Home";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const handleImageError = (event) => {
    event.target.src = "path_to_default_image"; // Replace with the path to your default image
  };

  return (
    <div>
      <Home />

      <div className="container">
        <div className="row">
          {orderData && orderData.orderData ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((item, index) => {
                if (Array.isArray(item)) {
                  return (
                    <div key={index}>
                      {item.map((arrayData) => (
                        <div key={arrayData.id}>
                          {arrayData.Order_date ? (
                            <div className="m-auto mt-5">
                              {arrayData.Order_date}
                              <hr />
                            </div>
                          ) : (
                            <div className="col-12 col-md-6 col-lg-3">
                              <div
                                className="card mt-3"
                                style={{ maxWidth: "16rem" ,maxHeight:'360px'}}
                              >
                                <img
                                  src={arrayData.img}
                                  className="card-img-top img-fluid"
                                  alt="..."
                                  onError={handleImageError}
                                  style={{ objectFit: "cover" }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {arrayData.name}
                                  </h5>
                                  <div className="container w-100 p-0" style={{height: '38px'}} >
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="m-1">
                                          Quantity: {arrayData.qty}
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <span className="m-1">
                                          Size: {arrayData.size}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12">
                                        <span className="m-1">
                                          Order Date: {arrayData.Order_date}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })
          ) : (
            <div className="m-5 w-100 text-center fs-3" style={{color:'white' , fontWeight:'bold'}}>
              No order data available.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
