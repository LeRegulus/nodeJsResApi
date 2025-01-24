const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(users)//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const { email } = req.params;
  const user = users.find(user => user.email === email);
  if (!user) {
      return res.status(404).json({ message: "User not found" });
  }
  res.json(user)
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  const { firstName, lastName, email, DOB } = req.body;
  if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: "User with this email already exists." });
  }
  const newUser = { firstName, lastName, email, DOB };
  users.push(newUser);
  res.status(201).json({ message: "User created successfully", user: newUser });
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const { email } = req.params;
  const { firstName, lastName, DOB } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
      return res.status(404).json({ message: "User not found" });
  }

  // Update user fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (DOB) user.DOB = DOB;

  res.json({ message: "User updated successfully", user });
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const { email } = req.params;
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1); // Remove user from the array
  res.json({ message: "User deleted successfully" });
});

module.exports=router;
