import React, { Component } from "react";
import "./StudentList.scss";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getData, deleteData } from "../../Action/Action";
import ReactPaginate from "react-paginate";

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
      searchText: "",
      offset: 0,
      perPage: 5,
      currentPage: "",
      rowsPerPage: 5,
    };
  }
  componentDidMount() 
  {        
    this.fetchStudenList();
  }
  componentWillUpdate() 
  {
    this.fetchStudenList();
  }
  Delete = (id) => 
  {
    let r = window.confirm("Are you sure want to delete");
    if (r === true) {
      this.props.deleteData(id);
    }
  };
  fetchStudenList = () => 
  {       
    let { searchText, offset, rowsPerPage } = this.state;   
    this.props.getData({ searchText: searchText }, offset, rowsPerPage)
      .then((res) => {});
  };
  search = (key) => {
    this.setState({ searchText: key }, () => {
      this.fetchStudenList();
    });
  };

  handlePageClick = (e) => 
  {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.rowsPerPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.fetchStudenList();
      }
    );
  };
  changeRowsPerPage = (e) => {
    this.setState(
      {
        rowsPerPage: e.target.value,
      });
  };
  render() 
  {    
    const { rowsPerPage } = this.state;
    let count = this.props.count;
    let pageCount = count / rowsPerPage;
    let stud = [];
    stud = this.props.stud ? this.props.stud : [];  
    console.log(stud);    
    const list =
    stud&&stud.length !== 0 &&
      stud.map((stud, index) => {
        return (
          <tr key={stud._id}>
            <td>{stud.FirstName}</td>
            <td>{stud.LastName}</td>
            <td>{stud.Gender}</td>
            <td>{stud.DOB}</td>
            <td>{stud.Hobbies ? stud.Hobbies.join(",") : ""}</td>
            <td>
              <img
                className="avatar"
                src={`http://localhost:4000/uploads/${stud.ProfileImage}`}
                alt="ProfileImage"
              />
            </td>
            <td>
              <span>
                <NavLink exact to={`/update-student/${stud._id}`}>
                  <button className="btn button1">Edit</button>
                </NavLink>
              </span>
              <span>
                <button
                  className="btn button2"
                  onClick={() => this.Delete(stud._id)}
                >
                  Delete
                </button>
              </span>
            </td>
          </tr>
        );
      });

    return (
      <div>
        <div className="container">
          <h1>Student List</h1>
          <div className="container-4">
            <input
              type="search"
              id="search"
              placeholder="Search..."
              onChange={(e) => this.search(e.target.value)}
            />
            <button className="icon">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Gender</th>
                <th scope="col">DOB</th>
                <th scope="col">Hobbies</th>
                <th scope="col">ProfileImage</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
        <br />
        <div className="footer">
          <div>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              pageRangeDisplayed={4}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
          <div>
            <label class="limit" htmlFor="limit">
              Items Per Page
            </label>
          </div>
          <div class="selectdiv">
            <select
              name="rowsPerPage"
              className=""
              value={this.state.rowsPerPage}
              onChange={this.changeRowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("MSTP",state.studentData.students);
  
  return {
    stud: state.studentData.students,
    count: state.studentData.count,

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
