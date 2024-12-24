const connection = require("../SQL_config/sql");

const DeleteGmach = (req, res) => {

    console.log("DeleteGmach called");
    
    const { id } = req.body;
    console.log(id);
    
  if (!id) {
    return res.status(400).json({ error: "Missing ID parameter" });
  }

  const query = `DELETE FROM gmach_list WHERE id = ?`;

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error deleting gmach:", error);
      return res.status(500).json({ error: "Error deleting gmach from the server" });
    }

    if (results.affectedRows === 0) {
      console.log("Gmach not found");
      return res.status(404).json({ error: "Gmach not found" });
    }

    res.json({ message: "Gmach deleted successfully" });
    console.log("Gmach deleted successfully!");
  });
};

module.exports = {
    DeleteGmach
};
