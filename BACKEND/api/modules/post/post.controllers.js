const { StatusCodes } = require("http-status-codes")
const { Post } = require("./post.model")
const expressAsyncHandler = require("express-async-handler")
const { shuffleArray } = require("../../utils/shuffleArray")

const postControllers = {
    getAllPost: expressAsyncHandler(async (req, res) => {
        try {
            const response = await Post.find()

            return res.status(StatusCodes.OK).json({
                message: "here all the post data",
                data: shuffleArray(response)
            })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: null
            })
        }
    }),

    getSinglePost: expressAsyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const singlePost = await Post.find({ _id: id });
            return res.status(StatusCodes.OK).json({
                message: "Single Post",
                status: StatusCodes.OK,
                data: singlePost
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "We can't give you a post information",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    }),

    createPost: expressAsyncHandler(async (req, res) => {
        try {
            const { caption, content, comment } = req.body

            if (!caption || !content) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "bad data given",
                    data: null
                })
            }

            const postObj = {
                user: req.user._id,
                caption: caption,
                content: content,
                comment: comment
            }

            const postCreateQuery = await Post.create(postObj)

            if (postCreateQuery) {
                return res.status(StatusCodes.CREATED).json({
                    messasge: "created the post successfuly",
                    data: postCreateQuery
                })
            }

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't create post right now",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    }),
    updatePost: expressAsyncHandler(async (req, res) => {
        try {
            const { caption } = req.body;
            const { id } = req.params;

            const post = await Post.find({ _id: id })

            if (!post) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "this post not found in our database",
                    status: StatusCodes.NOT_FOUND,
                    data: null
                })
            }

            if (post[0].user !== req.user._id) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "you can update is post",
                    data: null
                })
            }

            await Post.updateOne({ _id: id }, { caption: caption })
            return res.status(StatusCodes.OK).json({
                message: "updated successfuly",
                status: StatusCodes.OK,
                data: post
            })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't update post for now",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    }),

    deletePost: expressAsyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            await Post.deletOne({ _id: id });
            return res.status(StatusCodes.OK).json({
                messgage: "deleted success fully",
                status: StatusCodes.OK,
                data: await Post.find({ _id: id })
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't delete post for now",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    })
}

module.exports = { postControllers }
