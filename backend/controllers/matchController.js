const con = require("../db");

exports.likeuser = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { target_user_id } = req.body;

        const currentTimestamp = new Date().toISOString();

        if (!user_id || !target_user_id) {
            return res.status(400).json({ error: "Missing required user IDs" });
        }
        if (user_id === target_user_id) {
            return res.status(400).json({ error: "Cannot send a friend request to yourself" });
        }

        const checkFriendQuery = `SELECT * FROM friend_requests 
                                      WHERE (sender_id = $1 AND receiver_id = $2) 
                                      OR (sender_id = $2 AND receiver_id = $1) 
                                      AND status = 'accepted'`;

        const checkFriendResult = await con.query(checkFriendQuery, [user_id, target_user_id]);

        if (checkFriendResult.rows.length > 0) {
            return res.status(400).json({ error: "You are already friends" });
        }

        const checkRequestQuery = `SELECT * FROM friend_requests 
                                   WHERE sender_id = $1 
                                   AND receiver_id = $2`;

        const checkRequestResult = await con.query(checkRequestQuery, [target_user_id, user_id]);

        if (checkRequestResult.rows.length > 0) {
            const existingRequest = checkRequestResult.rows[0];

            if (existingRequest.status === "accepted") {
                return res.status(400).json({ error: "Friend request already accepted" });
            }

            const updateQuery = `UPDATE friend_requests 
                                 SET status = $1, created_at = $2
                                 WHERE id = $3
                                 RETURNING *`;

            const { rows } = await con.query(updateQuery, ["accepted", currentTimestamp, existingRequest.id]);

            return res.status(200).json({
                message: "Friend request accepted successfully",
                friendRequest: rows[0]
            });
        } else {
            const insertQuery = `INSERT INTO friend_requests (sender_id, receiver_id, status, created_at) 
                                 VALUES ($1, $2, $3, $4) 
                                 RETURNING *`;

            const { rows } = await con.query(insertQuery, [user_id, target_user_id, "pending", currentTimestamp]);

            return res.status(200).json({
                message: "Friend request sent successfully",
                friendRequest: rows[0]
            });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
};


exports.unlikeuser = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { target_user_id } = req.body;

        if (!user_id || !target_user_id) {
            return res.status(400).json({ error: "Missing required user IDs" });
        }
        if (user_id === target_user_id) {
            return res.status(400).json({ error: "Cannot remove friend request to yourself" });
        }

        const query = `DELETE FROM friend_requests 
                       WHERE sender_id = $1 
                       AND receiver_id = $2 
                       AND status = 'pending' 
                       RETURNING *`;
        
        const { rows } = await con.query(query, [target_user_id , user_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "No pending friend request found" });
        }

        return res.status(200).json({
            message: "Friend request removed successfully",
            deletedRequest: rows[0]
        });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
};


exports.findpendinguser = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const query = `SELECT users.* 
                        FROM friend_requests 
                        JOIN users ON users.user_id = friend_requests.sender_id 
                        WHERE friend_requests.receiver_id = $1`;

        const { rows } = await con.query(query, [user_id]);

        if (rows.length > 0) {
            return res.status(200).json({
                message: "Users who have sent you a friend request",
                users: rows
            });
        } else {
            return res.status(404).json({
                message: "No pending friend requests found"
            });
        }

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
};