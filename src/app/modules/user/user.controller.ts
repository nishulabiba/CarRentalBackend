import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.sevice";

const createUser = catchAsync( async(req, res)=>{
    const payload = req.body;

    const result = await userServices.createUserIntoDB(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'User registered successfully',
        data: result,
      });
})
const getUsers = catchAsync( async(req, res)=>{
    

    const result = await userServices.getUsersFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Here are the users',
        data: result,
      });
})

export const userController ={
    createUser,
    getUsers
}