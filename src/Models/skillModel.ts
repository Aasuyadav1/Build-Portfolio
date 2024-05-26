import mongoose, { Schema, Document, Model, model } from "mongoose";

interface skilltype extends Document {
  userid: object;
  skills: [
    {
      skillname: string;
    }
  ];
}

const skillSchema: Schema<skilltype> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skills: [
    {
      skillname: String,
    },
  ],
});

const Skill =
  (mongoose.models.Skill as Model<skilltype>) ||
  mongoose.model<skilltype>("Skill", skillSchema);

export default Skill;
