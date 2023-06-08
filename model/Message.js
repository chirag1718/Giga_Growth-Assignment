import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailTo: {
    type: String,
    required: true,
  },
  emailFrom: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Message", messageSchema);
