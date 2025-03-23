const con = require("../db");
const bcrypt = require("bcryptjs");
const axios = require("axios");

exports.registerUser = async (req, res) => {
    const { name, email, phonenumber, password, birthdate, gender, mbti } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (email, phone, password, name, gender, birth_date, mbti)
                       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`;

        const values = [
            email,
            phonenumber,
            hashedPassword,
            name,
            gender,
            birthdate,
            mbti,
        ];

        const { rows } = await con.query(query, values);
        res.json({ message: "User registered successfully", userId: rows[0].id });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Database query failed" });
    }
};
