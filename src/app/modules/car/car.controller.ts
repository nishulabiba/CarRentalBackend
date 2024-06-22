import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const createCar = catchAsync( async(req, res)=>{
    const payload = req.body;

    const result = await CarServices.createCarIntoDB(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Car created successfully',
        data: result,
      });
})
const getCars = catchAsync( async(req, res)=>{
    

    const result = await CarServices.getCarsFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Cars retrieved successfully',
        data: result,
      });
})
const getSingleCar = catchAsync( async(req, res)=>{
    const {id} = req.params;
    

    const result = await CarServices.getSingleCarFromDB(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'A Car retrieved successfully',
        data: result,
      });
})
const updateCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const carData  = req.body;
    const result = await CarServices.updateCarIntoDB(id, carData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car updated successfully',
      data: result,
    });
  });
  const deleteAcar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.deleteCarFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car Deleted successfully',
      data: result,
    });
  });

export const CarController ={
    createCar, getCars, getSingleCar, updateCar, deleteAcar
}