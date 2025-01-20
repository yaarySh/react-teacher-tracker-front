import React from "react";

function Footer() {
  return (
    <footer class="container-fluid text-center">
      <p>Copyrights</p>
      <form class="form-inline">
        Sign up for more updates:
        <br />
        <input type="email" class="form-control" size="50" placeholder="Email Address" />
        <button type="button" class="btn btn-danger">
          Sign Up
        </button>
      </form>
    </footer>
  );
}

export default Footer;
