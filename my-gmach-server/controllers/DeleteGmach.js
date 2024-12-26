const connection = require("../SQL_config/sql");

// Function to run a query
const runQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to validate user authorization
const validateUserAuthorization = async (userId, userType, gmachID) => {
  if (userType === "admin") {
    const query = `SELECT * FROM users WHERE id = ? AND user_type = ?`;
    const results = await runQuery(query, [userId, userType]);
    if (results.length === 0) throw new Error("Unauthorized");
  } else if (userType === "gmach_manager") {
    const query = `
      SELECT gmach_list.id
      FROM gmach_list
      JOIN users ON gmach_list.created_by = users.id
      WHERE gmach_list.id = ? AND gmach_list.created_by = ? AND users.user_type = 'gmach_manager';
    `;
    const results = await runQuery(query, [gmachID, userId]);
    if (results.length === 0) throw new Error("Unauthorized");
  } else {
    throw new Error("Unauthorized");
  }
};

const DeleteGmach = async (req, res) => {
  try {
    console.log("DeleteGmach called");

    const { userId, userType } = req.user; // from the token
    const { gmachID } = req.body;

    if (!gmachID) {
      return res.status(400).json({ error: "Missing ID parameter" });
    }

    // check authorization
    await validateUserAuthorization(userId, userType, gmachID);

    // delete the gmach
    const query = `DELETE FROM gmach_list WHERE id = ?`;
    const results = await runQuery(query, [gmachID]);

    if (results.affectedRows === 0) {
      console.log("Gmach not found");
      return res.status(404).json({ error: "Gmach not found" });
    }

    res.json({ message: "Gmach deleted successfully" });
    console.log("Gmach deleted successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  DeleteGmach,
};
