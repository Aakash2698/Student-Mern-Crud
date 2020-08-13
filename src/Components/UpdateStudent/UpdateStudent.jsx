import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getData, updateData, uploadData } from "../../Action/Action";

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      FirstName: "",
      LastName: "",
      Gender: "",
      DOB: "",
      Hobbies: [],
      ProfileImage: "",
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("http://localhost:4000/student/" + id)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          id: data._id,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Gender: data.Gender,
          DOB: data.DOB,
          Hobbies: data.Hobbies,
          ProfileImage: data.ProfileImage,
        })
      );
  }

  onUpdate = (e) => {
    e.preventDefault();
    const {
      id,
      FirstName,
      LastName,
      Gender,
      DOB,
      Hobbies,
      ProfileImage,
    } = this.state;

    const updContact = {
      id,
      FirstName,
      LastName,
      Gender,
      DOB,
      Hobbies,
    };
    // let data = new FormData();
    // data.append("ProfileImage", ProfileImage);
    // this.props
    //   .uploadData(data)
    //   .then((res) =>
    //   {
    //     console.log("res", res.data.filename);
    //     updContact.filename = res.data.filename;
    //     this.props.updateData(id, updContact);
    //   })
    //   .catch((err) =>
    //   {
    //     console.log(err);
    //   });
  };
  radioChange = (e) => {
    this.setState({
      Gender: e.target.value,
    });
  };

  checkInputChange = (e) => {
    const target = e.target;
    var value = target.value;

    if (target.checked) {
      this.state.Hobbies[value] = value;
    } else {
      this.state.Hobbies.splice(value, 1);
    }
  };
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onUploadHandler = (e) => {
    this.setState({
      ProfileImage: e.target.files[0],
    });
  };
  render() {
    const { FirstName, LastName, Gender, DOB, Hobbies,ProfileImage } = this.state;
    return (
      <form
        onSubmit={(e) => this.onUpdate(e)}
        method="POST"
        encType="multipart/form-data"
      >
        <h1>Update Student</h1>
        <fieldset>
          {/* first name */}
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="FirstName"
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => this.onInputChange(e)}
          />
          {/* last name */}
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="LastName"
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => this.onInputChange(e)}
          />
          {/* Gender */}
          <div className="flex-container">
            <label htmlFor="Gender">Gender</label>
            <div>
              <input
                type="radio"
                value="Male"
                checked={Gender === "Male"}
                onChange={(e) => this.radioChange(e)}
              />
            </div>
            <div>
              <label htmlFor="Male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                value="Female"
                checked={Gender === "Female"}
                onChange={(e) => this.radioChange(e)}
              />
            </div>
            <div>
              <label htmlFor="Female">Female</label>
            </div>
          </div>

          <br />
          {/* birthday */}
          <label htmlFor="birthday">Date of birth</label>
          <input
            type="date"
            id="birthday"
            name="DOB"
            value={DOB}
            onChange={(e) => this.onInputChange(e)}
          />
          <br />
          {/* Hobbies */}
          <div className="flex-container">
            <label>Hobbies :</label>
            <div>
              <input
                type="checkbox"
                name="Hobbies"
                id="Reading"
                value="Reading"
                onChange={(e) => this.checkInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="inlineCheckboxh1">Reading</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="Hobbies"
                id="Developing"
                value="Developing"
                onChange={(e) => this.checkInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="inlineCheckboxh2">Developing</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Hobbies"
                id="Desiging"
                value="Desiging"
                onChange={(e) => this.checkInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="inlineCheckboxh3">Designing</label>
            </div>
          </div>
          <br />
          {/* profile photo */}
          <label htmlFor="img">Select Profile image:</label>
          <input
            type="file"
            id="img"
            name="ProfileImage"
            accept="image/*"
            onChange={(e) => this.onUploadHandler(e)}
          />
          <img
            className="avatar"
            src={`http://localhost:4000/uploads/${ProfileImage}`}
            alt="ProfileImage"
          />
          <br />
          <br />
          <button className="button">Submit</button>
        </fieldset>
      </form>
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
      updateData,
      uploadData,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
