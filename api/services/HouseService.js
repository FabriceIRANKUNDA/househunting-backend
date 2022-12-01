import House from "../db/models/HouseModel";
import APIfeatures from "../helpers/utils/apiFeatures";

class HouseService {
  static createHouse = async (req) => {
    req.body.postedBy = req.user._id;
    return await House.create(req.body);
  };

  static getAllHouses = async (req) => {
    const features = new APIfeatures(House.find(req.query))
      .filter()
      .sort()
      .limitFields()
      .paginate();

    return await features.query;
  };

  static getHouse = async (req) => {
    return await House.findById(req.params.id);
  };

  static updateHouse = async (req) => {
    return await House.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
  };

  static deleteHouse = async (req) => {
    return await House.findByIdAndDelete(req.params.id);
  };
}

export default HouseService;
