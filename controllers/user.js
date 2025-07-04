const userModel = require("../models/user");

const getAllUsers = async (req, res) => {
    const allusers = await userModel.find({})

    res.status(200).json({
        message: "all users fetched",
        allusers
    })
}

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
};

const createUser = async (req, res) => {
    const { first_name, last_name, email, gender } = req.body;
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        gender
    });

    await newUser.save();
    res.status(201).json({
        message: "User created successfully"
    })
}

const updateUser = async (req, res) => {
    const { first_name, last_name, email, gender } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
        email,
        gender
    }, { new: true });
    try {
        const updatedUser = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User updated successfully",
            updatedUser
        });
    }catch(e){
        res.status(500).json({
            message: "Error deleting user",
            error: e.message
        });
    }
    res.status(200).json({
        message: "User updated successfully",
        updatedUser
    });

}
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        });
    }catch(e){
        res.status(500).json({
            message: "Error deleting user",
            error: e.message
        });
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}