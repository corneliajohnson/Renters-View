import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import homeImage from "../../img/homeBackground.jpg";
import { Button, Row, Col } from "reactstrap";

export const Register = (props) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phone = useRef();
  const conflictDialog = useRef();
  const conflictDialogTenant = useRef();
  const history = useHistory();

  const existingLandlordCheck = () => {
    return fetch(`http://localhost:8088/landlords?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const existingTenantCheck = () => {
    return fetch(`http://localhost:8088/tenants?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    existingTenantCheck().then((tenantUser) => {
      if (tenantUser) {
        conflictDialogTenant.current.showModal();
      } else {
        existingLandlordCheck().then((userExists) => {
          if (!userExists) {
            fetch("http://localhost:8088/landlords", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email.current.value,
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                phone: phone.current.value,
                image:
                  "https://res.cloudinary.com/cornelia/image/upload/v1603479745/rentersview/etcken8mmrmin4sig5eo.png",
              }),
            })
              .then((_) => _.json())
              .then((createdUser) => {
                if (createdUser.hasOwnProperty("id")) {
                  localStorage.setItem("landlord", createdUser.id);
                  history.push("/");
                }
              });
          } else {
            conflictDialog.current.showModal();
          }
        });
      }
    });
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>
          Account with that email address already exists for a landlord account
        </div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <dialog className="dialog dialog--password" ref={conflictDialogTenant}>
        <div>
          The email belongs to a current tenant, to continue as a tenant go to{" "}
          <Link to="login">login page</Link>
        </div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
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
          <form className="form--login p-4" onSubmit={handleRegister}>
            <div className="text-center">
              {" "}
              <img
                className="m-0 p-0"
                width="20%"
                src={require("../../img/logo.png")}
                alt="logo"
              />
            </div>
            <h2 className="display-3">Please Register for Renter's View</h2>
            <h2 className="display-4 text-white">Landlord Registration</h2>
            <Row className="mt-2 mb-2">
              <Col>
                <fieldset>
                  <input
                    ref={firstName}
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    required
                    autoFocus
                  />
                </fieldset>
              </Col>
              <Col>
                <fieldset>
                  <input
                    ref={lastName}
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                    required
                  />
                </fieldset>
              </Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col>
                <fieldset>
                  <input
                    ref={email}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    required
                  />
                </fieldset>
              </Col>
              <Col>
                <fieldset>
                  <input
                    ref={phone}
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder="Phone number"
                    required
                  />
                </fieldset>
              </Col>
            </Row>
            <fieldset>
              <Button type="submit" className="mt-2">
                {" "}
                Sign in{" "}
              </Button>
            </fieldset>
            <div className="link--login">
              <Link to="/login">
                <Button color="light" className="float-right">
                  Already a member?
                </Button>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
