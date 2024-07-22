const { createTokenAndSaveCookie } = require("../jwt/genrateToken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { uploadImageToCloudinary } = require("../utils/imageUploader");




//sendOTP


exports.signup = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;

        if (!fullname || !email || !password || !confirmPassword ) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        if (password != confirmPassword) {
            return res.status(400).josn({
                error: "Password do not match"
            })
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                error: "user already registered"
            })
        }

        
        //hashing the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in Hashing Password'
            });
        }


        const newUser = await new User({
            fullname,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${fullname}`
        })
        await newUser.save()
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res)
            res.status(200).json({
                message: "user created successfully",
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                image: newUser.image,
                bio: newUser.bio,
                dateOfBirth: newUser.dateOfBirth

            })
        }









    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Something went wrong"
        })

    }

}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully "
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "user is not registered"
            })
        }


        //verify password & generate a JWT token 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                sucess: false,
                message: "user password not matched"
            })
        }
        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({
            message: "user logged in successfully",
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            image: user.image,
            bio: user.bio,
            dateOfBirth: user.dateOfBirth
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: 'Login Faliure'
        })

    }


}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("harshcookie")
        res.status(200).json({
            message: "user logged out successfully"

        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        })

    }
}

exports.allUsers = async (req, res) => {
    try {
        const logggedInUser = req.user._id;
        const allUser = await User.find({ _id: { $ne: logggedInUser } }).select("-password")
        res.status(200).json(allUser)
    }
    catch (error) {
        console.log('Error in allUsers Controller:' + error)


    }
}

exports.deleteAccount = async (req, res) => {
    try {

        const id = req.body.authUserId;
        // console.log("ye dekhle bhai zaar",id)

        //validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }



        //delete user
        await User.findByIdAndDelete({ _id: id });

        //return response
        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully'
        })






    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully"
        })

    }


}

exports.updateDisplayPicture = async (req, res) => {
    try {
        // console.log("ye dekhle bhai ", req.files.displayPicture)
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({ 
                success: false,
                message: "No image file uploaded",
            });
        }


        const displayPicture = req.files.displayPicture;
        const userId = req.body.authUserId;

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        );

        res.send({
            success: true,
            message: "Image updated successfully",
            data: updatedProfile,
        });
    } catch (error) {
        console.error("Error updating profile picture:", error);

        res.status(500).json({
            success: false,
            message: "Error updating profile picture: " + error.message,
        });
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
     if(!displayPicture ){
        return res.status(500).json({
            success: false,
            message: 'disply pitcure nhi h ',
            
          })
     }
      const userId = req.body.authUserId;
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
        
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

 
  exports.updateProfile = async (req, res) => {
    try {
        const {
            FullName,
            dateOfBirth,
            bio
        } = req.body.data;
        const id = req.body.Id;

        const user = await User.findByIdAndUpdate(id, {
            fullname: FullName,
            dateOfBirth,
            bio
        }, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
