import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      localStorage.setItem("userEmail", credentials.em);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
      alert("SuccessFully Login");
    }
  };
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container w-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>
          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/Signup" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </>
  );
};
export default Login;
