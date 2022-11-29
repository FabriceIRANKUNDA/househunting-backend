import User from "../db/models/Users";
import Preference from "../db/models/Preference";
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

  static createPreferences = async (req) => {
    req.body.user = req.user._id;
    return await Preference.create(req.body);
  };

  static updatePreferences = async (req) => {
    return await Preference.findOneAndUpdate({ user: req.user._id }, req.body, {
      runValidators: true,
      new: true,
    });
  };
}

export default UserService;
