const express=require("express");

const router=express.Router();

const users=require("../data/users");
const validateRegister=require("../middleware/validate");

const attempts={};

router.post("/register", (req, res) => {
  const { username, password }=req.body;

  const error=validateRegister(
    username,
    password,
    users
  );

  if (error) {
    return res.status(400).json({
      success:false,
      message:error
    });
  }

  users.push({
    username,
    password
  });

  res.json({
    success:true,
    message:"registration successful"
  });
});

router.post("/login", (req, res) => {
  const { username, password }= req.body;

  if (!attempts[username]) {
    attempts[username]=0;
  }

  if (attempts[username]>=3) {
    return res.status(403).json({
      success:false,
      message: "account temporarily locked"
    });
  }

  const foundUser = users.find(
    user =>
      user.username===username &&
      user.password===password
  );

  if (!foundUser) {
    attempts[username]++;

    return res.status(401).json({
      success:false,
      message:`wrong password (${attempts[username]}/3)`
    });
  }

  attempts[username]=0;

  res.json({
    success:true,
    message: "login successful"
  });
});

module.exports = router;