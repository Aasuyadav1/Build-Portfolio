import mongoose, { Schema, Document, Model} from "mongoose";

interface skilltype extends Document {
  userid: object;
  label: string;
  value: string;
}

const skillSchema: Schema<skilltype> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
  },
  value: {
    type: String,
    required: true,
  }
});

const Skill =
  (mongoose.models.Skill as Model<skilltype>) ||
  mongoose.model<skilltype>("Skill", skillSchema);

export default Skill;
