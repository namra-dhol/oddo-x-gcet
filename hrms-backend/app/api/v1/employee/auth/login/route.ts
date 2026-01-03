import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return Response.json(
                { status: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        const employee = await prisma.employees.findUnique({
            where: { email },
        });

        if (!employee) {
            return Response.json(
                { status: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, employee.password_hash);

        if (!validPassword) {
            return Response.json(
                { status: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate JWT Token
        const secret = process.env.JWT_SECRET || "default_secret";
        const token = jwt.sign(
            {
                id: employee.id,
                email: employee.email,
                role: employee.role,
            },
            secret,
            { expiresIn: "24h" }
        );

        // Remove password
        const { password_hash: _, ...employeeData } = employee;

        return Response.json({
            status: true,
            message: "Login successful",
            token,
            data: employeeData,
        });

    } catch (error: any) {
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}
