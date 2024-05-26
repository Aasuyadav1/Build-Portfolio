import mongoose, { Schema, Document, Model } from "mongoose";

interface ProjectType extends Document {
  userid: mongoose.Types.ObjectId;
  projects: [
    {
      projectname: string;
      description: string;
      skills: [
        {
          skillname: string;
        }
      ];
      githublink: string;
      projectlink: string;
      image: string;
    }
  ];
}

const projectSchema: Schema<ProjectType> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projects: [
    {
      projectname: String,
      description: String,
      skills: [
        {
          skillname: String,
        },
      ],
      githublink: String,
      projectlink: String,
      image: String,
    },
  ],
});

const Project =
  (mongoose.models.Project as Model<ProjectType>) ||
  mongoose.model<ProjectType>("Project", projectSchema);

export default Project;
