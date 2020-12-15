import { Restaurant } from "../../model";
import { restaurantValidation } from "./validation";
import {
  getFieldsForUpdate,
  validateFields,
  validateEntireSchema,
  editObjectType,
} from "../../utils";
import { UserInvalidInputError } from "../errors/UserInvalidInputError";
import { NoArgumentsProvidedError } from "../errors/NoArgumentsProvidedError";
import { ObjectDoesNotExist } from "../errors/ObjectDoesNotExist";

const UserService = {
  getAllRestaurants: () => {
    return Restaurant.find({isDeleted: false});
  },

  getRestaurantById: (id) => {
    return Restaurant.findById(id);
  },

  addRestaurant: async ({ name,
    address,
    number,
    imageUrl,
    details,
    tags,
    latitude,
    longitude, }) => {
    const restaurant = new Restaurant({
      name,
        address,
        number,
        imageUrl,
        details,
        tags,
        latitude,
        longitude,
      isDeleted: false,
    });

    // Checks for invalid input
    // const errors = await validateEntireSchema(restaurantValidation, restaurant);
    // if (Object.keys(errors).length !== 0)
    //   throw new UserInvalidInputError(errors);

    return await restaurant.save();
  },

  editRestaurant: async ({ name,
    address,
    number,
    imageUrl,
    details,
    tags,
    latitude,
    longitude, }) => {
    const updates = getFieldsForUpdate({ name,
      address,
      number,
      imageUrl,
      details,
      tags,
      latitude,
      longitude, });

    // Checks if it exists
    if (!(await Restaurant.findById(id).select("_id").lean()))
      throw new NonExistentObjectUpdateError();

    // Checks if updates were provided
    if (Object.keys(updates).length === 0) throw new NoArgumentsProvidedError();

    // Validates data against the schema
    const errors = await validateFields(restaurantValidation, updates);
    if (Object.keys(errors).length > 0) throw new UserInvalidInputError(errors);

    return editObjectType(id, updates, Restaurant);
  },

  deleteRestaurant: async (id) => {
    // Checks if it exists
    if (!(await Restaurant.findById(id).select("_id").lean()))
      throw new ObjectDoesNotExist();

    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true, useFindAndModify: false }
    );


    return restaurant;
  },
};

module.exports = UserService;
 