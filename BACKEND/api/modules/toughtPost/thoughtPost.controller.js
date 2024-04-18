const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { ThoughtPost } = require("./thoughtPost.model");
const thoughPostControllers = {
    getAllTherThouhtPosts: expressAsyncHandler(async (req, res) => {
        try {
            const data = await ThoughtPost.find({});
            return res.status(StatusCodes.OK).json({
                message: "here all the thought post",
                status: StatusCodes.OK,
                data: data
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),

    getSingleThoughtPostData: expressAsyncHandler(async (req, res) => {
        try {
            const { thoughtPostId } = req.params;
            const data = await ThoughtPost.find({ _id: thoughtPostId });
            return res.status(StatusCodes.OK).json({
                message: "here your thought post",
                status: StatusCodes.OK,
                data: data
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error(error.message);
        }
    }),

    createThoughtPost: expressAsyncHandler(async (req, res) => {
        try {
            const { thought } = req.body;
            const loggedUser = req.user._id;

            if (!thought) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "invalid data give",
                    status: StatusCodes.CONFLICT,
                    data: null
                })
            }

            const newThoughtObject = {
                user: loggedUser,
                thought: thought
            }

            await ThoughtPost.create(newThoughtObject);
            return res.status(StatusCodes.CREATED).json({
                message: "Thought Post Created Successfully",
                status: StatusCodes.CREATED,
                data: newThoughtObject
            })

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),

    updateTheThoughtPost: expressAsyncHandler(async (req, res) => {
        try {
            const { thoughtPostId } = req.params;
            const { thought } = req.body;
            const loggedUser = req.user._id;

            const thoughtPostDoesExist = await ThoughtPost.find({ _id: thoughtPostId });

            if (!thoughtPostDoesExist) {
                res.status(StatusCodes.NOT_FOUND);
                throw new Error("this thought post doesn't exist");
            }

            const updatedThoughtPost = {
                user: loggedUser,
                thought: thought
            }

            await ThoughtPost.updateOne({ _id: thoughtPostId }, updatedThoughtPost);

            return res.status(StatusCodes.CREATED).json({
                message: "updated successfully",
                status: StatusCodes.CREATED,
                data: updatedThoughtPost
            })

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),

    deleteThoughtPost: expressAsyncHandler(async (req, res) => { })
}

module.exports = { thoughPostControllers }