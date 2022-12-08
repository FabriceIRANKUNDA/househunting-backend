import House from "../db/models/HouseModel";
import Preference from "../db/models/Preference";
import User from "../db/models/Users";
import APIfeatures from "../helpers/utils/apiFeatures";

class HouseService {
  static createHouse = async (req) => {
    req.body.postedBy = req?.user?._id;
    return await House.create(req.body);
  };

  static getAllHouses = async (req) => {
    const features = new APIfeatures(House.find(req.query))
      .filter()
      .sort()
      .limitFields();

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

  static getPreferredHouse = async (req) => {
    const preferences = await Preference.findOne({ user: req.user?._id });
    let houses = [];

    if (preferences) {
      houses = [
        ...(await House.find({
          priceMonthly: {
            $gte: preferences?.priceRange?.min,
            $lte: preferences?.priceRange?.max,
          },
          internet: { $in: preferences?.internet },
          "location.address": { $regex: preferences?.location },
          bedRooms: { $gte: preferences?.numOfBedRooms },
          visible: true,
          available: true,
        })),
      ];
    }

    houses = [
      ...houses.filter((house) => {
        let dateTo = new Date(Date.now());
        return (
          dateTo.getMonth() -
            house.updatedAt.getMonth() +
            12 * (dateTo.getFullYear() - house.updatedAt.getFullYear()) <=
          preferences.durationLimit
        );
      }),
    ];

    return houses;
  };
}

export default HouseService;
