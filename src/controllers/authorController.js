const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");




const createAuthor = async function (req, res) {
  try {
    var data = req.body
    if(Object.keys(data).length==0){
    res.status(400).send({status:false, msg:" BAD REQUEST"})
    }
    let savedData = await authorModel.create(data)
    if (data) {
      res.status(201).send({ status: true, message: "Success", data: savedData })
    }
    else {
      res.status(400).send({ status: false, msg: " Please provid valid data" })
    }

  } catch (error) {
    res.status(500).send({ status: "failed", message: error.message })
  }


}

//login author(phase 2)

const loginAuthor = async function (req, res) {
  try {
    let userName = req.body.email;
    let password = req.body.password;

    let user = await authorModel.findOne({ email: userName, password: password });
    if (!user)
      res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });
    let token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "Prachi11-thorium"
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: token });
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ status: "failed", message: err.message })
  }

};
// Once the login is successful, create the jwt token with sign function
// Sign function has 2 inputs:
// Input 1 is the payload or the object containing data to be set in token
// The decision about what data to put in token depends on the business requirement
// Input 2 is the secret
// The same secret will be used to decode tokens
// let token = jwt.sign(
//     {
//         authorId: user._id.toString(),
//         batch: "thorium",
//         organisation: "FUnctionUp",
//     },
//     "functionup-thorium"

// )

// res.setHeader("x-auth-token", token);
// res.send({ status: true, data: token });




module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor