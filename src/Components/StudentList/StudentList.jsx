import React, { Component } from "react";
import "./StudentList.scss";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getData, deleteData } from "../../Action/Action";
import { BsFillTrashFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Gender: "",
      DOB: "",
      Hobbies: [],
      ProfileImage: "",
    };
  }
  componentDidMount() {
    this.props.getData();
  }
  Delete = (id) => {
    this.props.deleteData(id);
  };
  render() {
    let stud = [];
    stud = this.props.stud;

    const list =
      stud.length !== 0 &&
      stud.map((stud, index) => {
        console.log(stud.id);

        return (
          <tr key={stud._id}>
            <td>{stud.FirstName}</td>
            <td>{stud.LastName}</td>
            <td>{stud.Gender}</td>
            <td>{stud.DOB}</td>
            <td>{stud.Hobbies.join(",")}</td>
            <td>
              <img
                className="avatar"
                src={`http://localhost:4000/uploads/${stud.ProfileImage}`}
                alt="ProfileImage"
              />
            </td>
            <td>
              <td>
                <NavLink exact to={`/UpdateStudent/${stud._id}`}>
                  <button className="btn btn-outline-success">Edit</button>
                </NavLink>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => this.Delete(stud._id)}
                >
                  Delete
                </button>
              </td>
            </td>
          </tr>
        );
      });

    return (
      <div>
        <div className="container">
          <h1>Student List</h1>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Gender</th>
                <th scope="col">DOB</th>
                <th scope="col">Hobbies</th>
                <th scope="col">Profile Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stud: state.studentData.students,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getData,
      deleteData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
