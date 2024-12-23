const connection = require("../SQL_config/sql");

const getComments = async (req, res) => {
  
    const { gmach_id } = req.query
  try {
    const sqlQuery = ` SELECT
                    comment_id, users.user_name, gmach_id, parent_comment_id, content, created_at, is_deleted 
                    FROM comments JOIN users
                    ON comments.user_id = users.id
                    WHERE	
                    comments.gmach_id = ? 
                    AND
                    comments.is_deleted = 0`;
    connection.execute( sqlQuery, [gmach_id], (error, results) => {
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

module.exports = { getComments };



