import mongoose, { Schema, Document, Model } from "mongoose";

interface linkType extends Document {
  userid: mongoose.Types.ObjectId;
  label: string;
  link: string;
}

const linkSchema: Schema<linkType> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const Link =
  (mongoose.models.Link as Model<linkType>) ||
  mongoose.model<linkType>("Link", linkSchema);

export default Link;
