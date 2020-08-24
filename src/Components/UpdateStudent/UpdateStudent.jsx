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
      Hobbies: {
        Reading: false,
        Developing: false,
        Designing: false,
      },
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
          Hobbies: {
            Reading: data.Hobbies.includes("Reading"),
            Developing: data.Hobbies.includes("Developing"),
            Designing: data.Hobbies.includes("Designing"),
          },
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
    const selectedHobbies = [];
    for (const hobby in Hobbies) {
      if (Hobbies[hobby]) {
        selectedHobbies.push(hobby);
      }
    }
    const updContact = {
      id,
      FirstName,
      LastName,
      Gender,
      DOB,
      Hobbies: selectedHobbies,
      ProfileImage,
    };
    this.props.updateData(id, updContact);
  };
  onInputHandler = (e) => {
    const state = this.state;
    this.setState({ ...state, [e.target.name]: e.target.value });
  };
  onRadioHandler = (e) => {
    this.setState({
      Gender: e.target.value,
    });
  };

  onCheckboxHandler = (e) => {
    const state = this.state;
    this.setState({
      ...state,
      Hobbies: {
        ...state.Hobbies,
        [e.target.name]: !state.Hobbies[e.target.name],
      },
    });
  };
  onUploadHandler = (e) => {
    const state = this.state;
    if (e.target.files[0]) {
      let data = new FormData();
      data.append("ProfileImage", e.target.files[0]);

      this.props
        .uploadData(data)
        .then((res) => {
          console.log("res", res.data.filename);

          this.setState({
            ...state,
            ProfileImage: res.data.filename,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { FirstName, LastName, Gender, DOB, ProfileImage } = this.state;
    return (
      <form
        onSubmit={(e) => this.onUpdate(e)}
        method="POST"
        encType="multipart/form-data"
      >
        <h1>Update Student</h1>
        <fieldset>        
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="FirstName"
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => this.onInputHandler(e)}
          />       
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="LastName"
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => this.onInputHandler(e)}
          />       
          <div className="flex-container">
            <label htmlFor="Gender">Gender</label>
            <div>
              <input
                type="radio"
                value="Male"
                checked={Gender === "Male"}
                onChange={(e) => this.onRadioHandler(e)}
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
                onChange={(e) => this.onRadioHandler(e)}
              />
            </div>
            <div>
              <label htmlFor="Female">Female</label>
            </div>
          </div>

          <br />        
          <label htmlFor="birthday">Date of birth</label>
          <input
            type="date"
            id="birthday"
            name="DOB"
            value={DOB}
            onChange={(e) => this.onInputHandler(e)}
          />
          <br />        
          <div className="flex-container">
            <label>Hobbies :</label>
            <div>
              <input
                type="checkbox"
                name="Reading"
                id="Reading"
                value="Reading"
                checked={this.state.Hobbies.Reading}
                onChange={this.onCheckboxHandler}
              />
            </div>
            <div>
              <label htmlFor="inlineCheckboxh1">Reading</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="Developing"
                id="Developing"
                checked={this.state.Hobbies.Developing}
                onChange={this.onCheckboxHandler}
              />
            </div>
            <div>
              <label htmlFor="inlineCheckboxh2">Developing</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Designing"
                id="Designing"
                checked={this.state.Hobbies.Designing}
                onChange={this.onCheckboxHandler}
              />
            </div>
            <div>
              <label htmlFor="inlineCheckboxh3">Designing</label>
            </div>
          </div>
          <br />      
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
