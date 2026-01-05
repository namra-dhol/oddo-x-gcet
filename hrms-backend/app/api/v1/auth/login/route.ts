import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { useremail, password } = body;

        if (!useremail || !password) {
            return Response.json(
                { status: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { useremail },
        });

        if (!user) {
            return Response.json(
                { status: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return Response.json(
                { status: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate JWT Token
        // "solt key should 128" interpreted as a request for a strong secret or specific configuration.
        // Using JWT_SECRET from env or a default fallback for development.
        const secret = process.env.JWT_SECRET || "default_secret_128";

        const token = jwt.sign(
            {
                userid: user.userid,
                username: user.username,
                roleid: user.roleid
            },
            secret,
            { expiresIn: "24h" } // Standard expiration
        );

        // Remove password from response
        const { password: _, ...userData } = user;

        return Response.json({
            status: true,
            message: "Login successful",
            token,
            data: userData,
        }, { status: 200 });

    } catch (error: any) {
        console.error("Login error:", error);
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}
