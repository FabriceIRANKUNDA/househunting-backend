import User from "../db/models/Users";
import APIfeatures from "../helpers/utils/apiFeatures";

class UserService {
  static createUser = async (req) => {
    return await User.create(req.body);
  };

  static getAllUsers = async (req) => {
    const features = new APIfeatures(User.find(req.query))
      .filter()
      .sort()
      .limitFields()
      .paginate();

    return await features.query;
  };

  static getUser = async (req) => {
    return await User.findById(req.params.id);
  };

  static updateUser = async (req) => {
    return await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
  };

  static deleteUser = async (req) => {
    return await User.findByIdAndDelete(req.params.id);
  };
}

export default UserService;
