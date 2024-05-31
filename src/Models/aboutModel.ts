import mongoose, { Schema, Document, Model } from "mongoose";

interface aboutType extends Document {
  userid: mongoose.Types.ObjectId;
  name: string;
  heading: string;
  about: string;
  image: string;
}

const aboutSchema: Schema<aboutType> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
});


const About =
  (mongoose.models.About as Model<aboutType>) ||
  mongoose.model<aboutType>("About", aboutSchema);

export default About;
