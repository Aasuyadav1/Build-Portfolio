import mongoose, { Schema, Document, Model } from "mongoose";

interface PortfolioType extends Document {
  userid: mongoose.Types.ObjectId;
  skills: mongoose.Types.ObjectId[];
  projects: mongoose.Types.ObjectId[];
  links: mongoose.Types.ObjectId[];
  about: mongoose.Types.ObjectId;
}

const portfolioSchema: Schema<PortfolioType> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: "Skill",
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "Project",
  }],
  links: [{
    type: Schema.Types.ObjectId,
    ref: "Link",
  }],
  about: {
    type: Schema.Types.ObjectId,
    ref: "About",
  },
});

const Portfolio =
  (mongoose.models.Portfolio as Model<PortfolioType>) ||
  mongoose.model<PortfolioType>("Portfolio", portfolioSchema);

export default Portfolio;
