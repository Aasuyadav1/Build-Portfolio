import mongoose, { Schema, Document, Model } from "mongoose";

interface PortfolioType extends Document {
  userid: mongoose.Types.ObjectId;
  domain: string;
}

const portfolioSchema: Schema<PortfolioType> = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  domain: {
    type: String,
  },
});

const Portfolio =
  (mongoose.models.Portfolio as Model<PortfolioType>) ||
  mongoose.model<PortfolioType>("Portfolio", portfolioSchema);

export default Portfolio;
