import mongoose from "mongoose";

export const isObjectIdValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
