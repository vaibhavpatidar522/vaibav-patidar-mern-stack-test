const asyncHandler = require("express-async-handler");
const excelJs = require("exceljs");

const Users = require("../models/usersModel"); // schema

// @desc Get users
// @route GET /api/users/
//@access Public
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;
  let search = "";

  if (req.query.search) {
    search = req.query.search;
  }

    const users = await Users.find({
      $or: [
        { firstName: { $regex: ".*" + search + ".*" } },
        { lastName: { $regex: ".*" + search + ".*" } },
        { email: { $regex: ".*" + search + ".*" } },
        { mobile: { $regex: ".*" + search + ".*" } },
      ],
    })
      .skip(skip)
      .limit(size);
      if(users){

        const usersWithImageURLs = users.map((user) => {
          return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            gender: user.gender,
            status: user.status,
            selectedFile: `${req.protocol}://${req.get("host")}/images/${
              user.selectedFile
            }`,
            location: user.location,
          };
        });
        
        res.status(200).json(usersWithImageURLs);
      }else{
        res.status(500);
        throw new Error("Error fetching users");
      }
        
  
});

// @desc Set users
// @route POST /api/users/
//@access Public
const setUsers = asyncHandler(async (req, res) => {
  const {
    email,
    firstName,
    gender,
    lastName,
    location,
    mobile,
    status,
  } = req.body;

  const selectedFile = req.file.filename;

  if (
    !email ||
    !firstName ||
    !gender ||
    !lastName ||
    !location ||
    !mobile ||
    !status ||
    !req.file.filename
  ) {
    res.status(400);
    throw new Error("Pleas add all fields");
  }

  // check if user is already registered
  const userExists = await Users.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already registered");
  }

  const user = await Users.create({
    email,
    firstName,
    gender,
    lastName,
    location,
    mobile,
    status,
    selectedFile,
  });

  if (user) {
    res.status(201).json({
      message: "user registered successfully",
      _id: user.id,
      firstName: user.firstName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalide user");
  }
});


// @desc Export Csv
// @route GET /api/users/csv
//@access Public
const exportUsersCsv = asyncHandler(async (req, res) => {
  const workbook = new excelJs.Workbook();
  const worksheet = workbook.addWorksheet("All Users");

  worksheet.columns = [
    { header: "s_no", key: "s_no" },
    { header: "First_Name", key: "firstName" },
    { header: "Last_Name", key: "lastName" },
    { header: "Mobile", key: "mobile" },
    { header: "Gender", key: "gender" },
    { header: "Status", key: "status" },
    { header: "Location", key: "location" },
    { header: "Profile", key: "profile" },
    { header: "Email", key: "email" },
  ];

  let counter = 1;
  const usersData = await Users.find({});

  usersData.forEach((user) => {
    user.s_no = counter;

    worksheet.addRow(user);

    counter++;
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
  );

  res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

  return workbook.xlsx.write(res).then(() => {
    res.status(200);
  });
});


// @desc Get a user
// @route GET /api/users/:id'
//@access Public
const getUser = asyncHandler(async (req, res) => {
  
    const user = await Users.findById(req.params.id);
    if (user){

      res
      .status(200)
      .json({
        ...user._doc,
        selectedFile: `${req.protocol}://${req.get("host")}/images/${
          user.selectedFile
        }`,
      });
    }  else {
    res.status(500)
    throw new Error("Error fetching users" );
  }
});

// @desc Delete a user from the database
// @route DELETE /api/users/:id'
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id);
  
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
  
    await user.deleteOne();
  
    res.status(200).json({ id: req.params.id });
  });

// @desc Edit user information 
// @route PUT /api/users/:id'
//@access Public
const editUser = asyncHandler(async (req, res) => {
  const data = req.body;

  // Find the user in the database
  const user = await Users.findById(req.params.id);

  const changedData = {};
  for (const key in data) {
    if (data[key] !== user[key]) {
      changedData[key] = data[key];
    }
  }

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // Update the user fields with the changedData

  if (changedData.selectedFile == undefined) {
    changedData.selectedFile = req.file.filename;
    
  }

  if (changedData.selectedFile.includes("/images/")) {
    delete changedData.selectedFile;
  }

  Object.keys(changedData).forEach((key) => {
    user[key] = changedData[key];
  });

 

  
  const updatedUser = await user.save();

  res.json(updatedUser);
});


// @desc Edit only status of a user
// @route PUT /api/users/:id'
//@access Public
const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  // Find the user in the database
  const user = await Users.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // Update the status
  user.status = status;

  // Save the updated user
  const updatedUser = await user.save();

  res.json(updatedUser);
});



module.exports = {
  getUser,
  getUsers,
  setUsers,
  exportUsersCsv,
  updateStatus,
  deleteUser,
  editUser,
};
