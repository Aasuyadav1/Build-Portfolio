import mongoose, { Schema, Document, Model } from "mongoose";

interface ProjectType extends Document {
  userid: mongoose.Types.ObjectId;
  title: string;
  description: string;
  github: string;
  image: string;
  link: string;
  technologies: string[];
}

const projectSchema: Schema<ProjectType> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  github: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  technologies: {
    type: [String],
  }
});

const Project =
  (mongoose.models.Project as Model<ProjectType>) ||
  mongoose.model<ProjectType>("Project", projectSchema);

export default Project;
