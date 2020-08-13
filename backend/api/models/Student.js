const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  Hobbies: {
    type: [String],
  },
  ProfileImage: {
    type: String,
  },
});
module.exports = mongoose.model("Student", studentSchema);
