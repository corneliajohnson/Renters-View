import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phone = useRef();
  const image = useRef();
  const conflictDialog = useRef();
  const history = useHistory();

  const [accountType, setAccountType] = useState("");

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/customers?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      if (!userExists && accountType === "landlord") {
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
            image: null,
          }),
        })
          .then((_) => _.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("landlord", createdUser.id);
              history.push("/landlord");
            }
          });
      } else if (!userExists && accountType === "tenant") {
        fetch("http://localhost:8088/tenants", {
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
            image: null,
          }),
        })
          .then((_) => _.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("tenant", createdUser.id);
              history.push("/tenant");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for Renters View
        </h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
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
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputphone"> Phone Number</label>
          <input
            ref={phone}
            type="number"
            name="phone"
            className="form-control"
            placeholder="Phone number"
            required
          />
        </fieldset>
        <div>
          <input
            type="radio"
            value="landlord"
            name="accountType"
            checked={true}
            onChange={(e) => setAccountType(e.target.value)}
          />{" "}
          Landlord
          <input
            type="radio"
            value="tenant"
            name="accountType"
            onChange={(e) => setAccountType(e.target.value)}
          />{" "}
          Tenant
        </div>
        <fieldset>
          <button type="submit"> Sign in </button>
        </fieldset>
      </form>
    </main>
  );
};
