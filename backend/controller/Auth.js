import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    findUserByEmail,
    findUserByUsernameOrEmail,
    createUser,
} from "../model/Auth.js";


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  findUserByEmail(email, async (err, users) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (users.length > 0) {
      return res.status(409).json({
        message: "Email sudah digunakan",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(username,email,hashedPassword,(err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Gagal membuat akun",
          });
        }

        res.status(201).json({
          message: "Registrasi berhasil",
          userId: result.insertId,
        });
      }
    );
  });
};

export const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        // Validasi
        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email dan password wajib diisi",
            });
        }

        // Cari user
        findUserByEmail(
            email,
            async (err, results) => {
                if (err) {
                    console.error(
                        "Gagal mencari user:",
                        err
                    );

                    return res.status(500).json({
                        message:
                            "Gagal mencari user",
                    });
                }

                // User tidak ditemukan
                if (results.length === 0) {
                    return res.status(401).json({
                        message:
                            "Email atau password salah",
                    });
                }

                const user = results[0];

                // Cek password
                const passwordMatch =
                    await bcrypt.compare(
                        password,
                        user.password
                    );

                if (!passwordMatch) {
                    return res.status(401).json({
                        message:
                            "Email atau password salah",
                    });
                }

                // Buat JWT
                const token = jwt.sign(
                    {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );

                return res.status(200).json({
                    message: "Login berhasil",

                    token,

                    user: {
                        id: user.id,
                        username:
                            user.username,
                        email: user.email,
                    },
                });
            }
        );
    } catch (error) {
        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            message:
                "Terjadi kesalahan server",
        });
    }
};