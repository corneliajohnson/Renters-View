import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Login = (props) => {
  const email = useRef();
  const existDialog = useRef();
  const history = useHistory();

  const existingLandlordCheck = () => {
    return fetch(`http://localhost:8088/landlords?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const existingTenantCheck = () => {
    return fetch(`http://localhost:8088/tenants?email=${email.current.value}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingLandlordCheck().then((exists) => {
      if (exists) {
        localStorage.removeItem("tenant");
        localStorage.setItem("landlord", exists.id);
        history.push("/");
      } else {
        existingTenantCheck().then((existsTenant) => {
          if (existsTenant) {
            localStorage.removeItem("landlord");
            localStorage.setItem("tenant", existsTenant.id);
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

      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Renters View</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
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
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
