import { asyncHandler } from "../utils/asyncHandler.js";

const sentMessage = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Hi Kalu Don"
    })
})

export default sentMessage;