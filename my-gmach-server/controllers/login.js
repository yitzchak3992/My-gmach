const connection = require("../SQL_config/sql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // search for user by email
    const sqlQuery = `SELECT id, user_name, email, password, user_type FROM users WHERE email = ?`;
    const [result] = await connection.promise().execute(sqlQuery, [email]);

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email " });
    }

    const user = result[0];    

    // check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid  password" });
    }

    // create token
    const token = jwt.sign(
      { userId: user.id, userName: user.user_name, userType: user.user_type },
      TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .json({
        message: "User logged in successfully",
        token: token,
        userId: user.id,
        userName: user.user_name,
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { login };
