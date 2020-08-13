import React, { Component } from "react";
import "./NewStudent.scss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { insertData, uploadData } from "../../Action/Action";

class NewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Gender: "",
      DOB: "",
      Hobbies: {
        Reading: false,
        Developing: false,
        Designing: false,
      },
      ProfileImage: null,
      imagePreviewUrl: null,
    };
  }

  //Submit//
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.Hobbies);
  
    const {
      FirstName,
      LastName,
      Gender,
      DOB,
      Hobbies,
      ProfileImage,
    } = this.state;
  
    const selectedHobbies = [];
    
    for(let hobby in Hobbies) {
      if(Hobbies[hobby]) {
        selectedHobbies.push(hobby)
      }
    }
  
    console.log(selectedHobbies);
    selectedHobbies.join(',')
  
    let NewStudent = {
      FirstName,
      LastName,
      Gender,
      DOB,
      Hobbies: selectedHobbies,
    };
  
    this.setState({
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
    });
    
    let data = new FormData();
    data.append("ProfileImage", ProfileImage);
    this.props
      .uploadData(data)
      .then((res) => {
        console.log("res", res.data.filename);
        NewStudent.filename = res.data.filename;
        this.props.insertData(NewStudent);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  //Inputbox//
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //radio button//
  radioChange = (e) => {
    this.setState({
      Gender: e.target.value,
    });
  };
  //Checkbox //

  handleCheckbox = (e) => {
    const state = this.state;

    this.setState({
      ...state,
      Hobbies: {
        ...state.Hobbies,
        [e.target.name]: !state.Hobbies[e.target.name]
      }
    })
  }

  // upload Image //
  onUploadHandler = (e) => {
    this.setState({
      ProfileImage: e.target.files[0],
    });
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { FirstName, LastName, Gender, DOB, Hobbies } = this.state;

    return (
      <form
        onSubmit={(e) => this.onSubmit(e)}
        method="POST"
        encType="multipart/form-data"
      >
        <h1>Student Form</h1>
        <fieldset>
          {/* first name */}
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="FirstName"
            value={FirstName}
            placeholder="First Name"
            onChange={(e) => this.onInputChange(e)}
          />
          {/* last name */}
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="LastName"
            value={LastName}
            placeholder="Last Name"
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
                name="Reading"
                id="Checkbox1"
                checked={this.state.Hobbies.Reading}
                onChange={this.handleCheckbox}
              />
            </div>
            <div>
              <label htmlFor="Checkbox1">Reading</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="Developing"
                id="Checkbox2"
                checked={this.state.Hobbies.Developing}
                onChange={this.handleCheckbox}
              />
            </div>
            <div>
              <label htmlFor="Checkbox2">Developing</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Designing"
                id="Checkbox3"
                checked={this.state.Hobbies.Designing}
                onChange={this.handleCheckbox}
              />
            </div>
            <div>
              <label htmlFor="Checkbox3">Designing</label>
            </div>
          </div>
          <br />
          {/* profile image */}
          <label htmlFor="image">Select Profile image:</label>
          <input
            type="file"
            id="ProfileImage"
            name="ProfileImage"
            accept="image/*"
            onChange={(e) => this.onUploadHandler(e)}
          />
          <img
            className="avatar"
            src={this.state.imagePreviewUrl}
            alt="ProfileImage"
            width="150"
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
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      insertData,
      uploadData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NewStudent);
