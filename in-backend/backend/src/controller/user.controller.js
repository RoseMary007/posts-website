import { User } from "../models/usermodel.js";

/// ✅ REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "USERNAME OR EMAIL ALREADY EXISTS" });
    }

    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
    });

    res.status(201).json({
      message: "USER REGISTERED SUCCESSFULLY",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
};

/// ✅ LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "INVALID EMAIL OR PASSWORD" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "INVALID EMAIL OR PASSWORD" });
    }

    user.loggedIn = true;
    await user.save();

    res.status(200).json({
      message: "USER LOGGED IN SUCCESSFULLY",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
};

const logoutUser = async (req, res) => {
    try{
        const{email}=req.body;
        const user=await User.findOne({email:email.toLowerCase()});

        if(!user){
            return res.status(400).json({message:"USER NOT FOUND"});
        }
        user.loggedIn = false;
        await user.save();
        res.status(200).json({message:"USER LOGGED OUT SUCCESSFULLY"});
    } catch (error) {
        res
            .status(500)
            .json({ message: "INTERNAL SERVER ERROR", error: error.message });

    }};
export { registerUser, loginUser, logoutUser };