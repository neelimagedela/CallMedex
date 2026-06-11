const db = require("../../config/db");

const getMouByRole = async (req, res) => {
    const { role } = req.params;

    const [rows] = await db.query(
        "SELECT * FROM mous WHERE role = ?",
        [role]
    );

    res.json(rows[0]);
};

const acceptMou = async (req, res) => {
    const { user_id, user_name, role } = req.body;

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

    const [existing] = await db.query(
        "SELECT * FROM mou_acceptances WHERE user_id = ?",
        [user_id]
    );

    if (existing.length > 0) {
        return res.status(400).json({ message: "Already accepted" });
    }

    await db.query(
        `INSERT INTO mou_acceptances 
         (user_id, user_name, role, ip_address) 
         VALUES (?, ?, ?, ?)`,
        [user_id, user_name, role, ip]
    );

    res.json({ success: true, message: "MOU accepted" });
};
const getMouAcceptances = async (req, res) => {
    const [rows] = await db.query(`
        SELECT 
            id,
            user_id,
            user_name,
            role,
            ip_address,
            accepted_at
        FROM mou_acceptances
        ORDER BY id DESC
    `);

    res.json(rows);
};

module.exports = {
    getMouByRole,
    acceptMou,
    getMouAcceptances
};