import { TCar } from "./car.interface";
import Car from "./car.model";

const createCarIntoDB = async(payload: TCar)=>{


    
    const result= await Car.create(payload)

    return result;

}
const getCarsFromDB = async()=>{


    
    const result= await Car.find()

    return result;

}
const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id)
    return result;
  };

const updateCarIntoDB = async(id: string, carData: Partial<TCar>)=>{
    const result = await Car.findByIdAndUpdate(
        id,
        {
          _id: id,
          $addToSet: { car: { $each: carData } },
        },
        {
          upsert: true,
          new: true,
        },
      );;
      return result;
}
export const CarServices = { createCarIntoDB, getCarsFromDB, getSingleCarFromDB, updateCarIntoDB}