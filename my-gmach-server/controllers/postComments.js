const connection = require("../SQL_config/sql");

const postComments = async (req, res) => {
  
    const { gmach_id, parent_comment_id, content } = req.body
    const {userId} = req.user // getting the user ID from the token

      //  Checking if all mandatory fields exist
  if (!userId || !gmach_id || !content) {
    // console.log("Missing required fields !!!");    
    
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const sqlQuery = ` INSERT INTO comments (user_id, gmach_id, parent_comment_id, content) VALUES (?, ?, ?, ?)`;
    connection.execute( sqlQuery, [userId, gmach_id, parent_comment_id || null, content,], (error, results) => {
      if (error) {
        console.error("Error retrieving data:", error);
        res
          .status(500)
          .json({ error: "Error retrieving data from the server" });
        return;
      }
      res.json(results);
      console.log("Data sent successfully!");
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { postComments };



