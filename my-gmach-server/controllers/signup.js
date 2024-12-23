const connection = require("../SQL_config/sql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // User name correctness check
    if (userName.length < 2) {
      return res
        .status(400)
        .json({ error: "User name must contain at least 2 characters" });
    }
    // Password correctness check
    if (password.length < 4) {
      return res
        .status(400)
        .json({ error: "Password must contain at least 4 characters" });
    }

    // Email correctness check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // User existence check
    const [existingUser] = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "This email already exists" });
    }

    // password encryption
    const hashedPassword = await bcrypt.hash(password, 9);

    // signing up user to the database
    const sqlQuery = `INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)`;
    const [result] = await connection
      .promise()
      .execute(sqlQuery, [userName, email, hashedPassword]);

      
    // create token
    const token = jwt.sign(
      { userId: result.insertId, userName: userName, userType: "user" },
      TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(201)
      .json({
        message: "User created successfully",
        token: token,
        userId: result.insertId,
        userName: userName,
        userType: result.user_type,
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = { signup };
