import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";
import homeImage from "../../img/homeBackground.jpg";
import { Button } from "reactstrap";

export const Login = (props) => {
  const email = useRef();
  const existDialog = useRef();
  const history = useHistory();

  //find lanlord email
  const existingLandlordCheck = () => {
    return fetch(`http://localhost:8088/landlords?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  //find tenant email
  const existingTenantCheck = () => {
    return fetch(`http://localhost:8088/tenants?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingLandlordCheck().then((exists) => {
      if (exists) {
        localStorage.removeItem("tenant"); //remove tenant from local stroage
        localStorage.setItem("landlord", exists.id); //add landlord to local storage
        history.push("/");
      } else {
        existingTenantCheck().then((existsTenant) => {
          if (existsTenant) {
            localStorage.removeItem("landlord"); //remove landlord from local stroage
            localStorage.setItem("tenant", existsTenant.id); //add tenant to local storage
            history.push("/tenant");
          } else {
            existDialog.current.showModal();
          }
        });
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <div
        style={{
          backgroundImage: "url(" + homeImage + ")",
          backgroundSize: "cover",
          height: "100vh",
          color: "#fa2d2d",
        }}
      >
        <section
          style={{ position: "fixed", top: "15%", left: "30%", right: "30%" }}
        >
          <form
            className="form--login p-3"
            style={{ borderRadius: "7px" }}
            onSubmit={handleLogin}
          >
            <div className="text-center">
              {" "}
              <img
                className="m-0 p-0"
                width="20%"
                src={require("../../img/logo.png")}
                alt="logo"
              />
            </div>
            <h1 className="display-1">Renter's View</h1>
            <h2 className="mt-5 display-4">Please sign in</h2>
            <fieldset className="mt-2 mb-2">
              <input
                ref={email}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </fieldset>
            <fieldset>
              <Button type="submit">Sign in</Button>
            </fieldset>
            <div className="link--register">
              <Link to="/register">
                <Button color="light" className="float-right">
                  Not a member yet?
                </Button>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
