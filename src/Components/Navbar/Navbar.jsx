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
                <a href="/Home">home</a>
              </li>
              <li>
                <a href="/NewStudent">add-student</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }
}
export default Navbar;
