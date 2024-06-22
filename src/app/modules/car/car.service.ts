import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCar } from './car.interface';
import Car from './car.model';

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car could not be created');
  }

  return result;
};
const getCarsFromDB = async () => {
  const result = await Car.find({ isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cars not found');
  }

  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  if (result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Car is deleted from DB');
  }
  return result;
};

const updateCarIntoDB = async (id: string, carData: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { $set: carData },
    { new: true }, // Ensure the updated document is returned
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  return result;
};

const deleteCarFromDB = async (id: string) => {
  const findCar = await Car.findById(id);
  if (findCar?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is already deleted from DB');
  }
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Car not found & could not be deleted',
    );
  }

  return result;
};

export const CarServices = {
  createCarIntoDB,
  getCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
};
