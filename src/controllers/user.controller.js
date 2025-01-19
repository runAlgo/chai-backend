import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    if ([fullName, email, username, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required!");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    let avatarLocalPath;
    if (req.files && req.files.avatar && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path; // Correct assignment to avatarLocalPath
    }

    let coverImageLocalPath;
    if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!");
    }

    try { // Wrap Cloudinary uploads in a try/catch
        const avatarResponse = await uploadOnCloudinary(avatarLocalPath); // Use a different variable name
        const coverImageResponse = await uploadOnCloudinary(coverImageLocalPath); // Use a different variable name

        if (!avatarResponse) {
            console.error("Cloudinary Upload Error (Avatar):", cloudinaryError.message); // Log specific error message
            throw new ApiError(500, "Avatar upload to Cloudinary failed!");
        }

        const user = await User.create({
            fullName,
            avatar: avatarResponse.url,
            coverImage: coverImageResponse?.url || "",
            email,
            password,
            username: username.toLowerCase(),
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"));
    } catch (cloudinaryError) { // Catch Cloudinary errors
        console.error("Cloudinary Error:", cloudinaryError);
        throw new ApiError(500, "Error during file upload or user registration.");
    }
});

export { registerUser };