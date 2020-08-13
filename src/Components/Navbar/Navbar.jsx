import React, { Component } from "react";
import "./Navbar.scss";
class Navbar extends Component {
  render() {
    return (
      <section className="navigation">
        <div className="nav-container">
          <div className="brand">
            <p>Student Crud</p>
          </div>
          <nav>       
            <ul className="nav-list">
              <li>
                <a href="/Home">Home</a>
              </li>
              <li>
                <a href="/NewStudent">New Student</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }
}
export default Navbar;
