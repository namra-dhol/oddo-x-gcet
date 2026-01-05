import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { generatePassword } from "@/app/utils/passwordGenerator";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, useremail, userphone, roleid } = body;

        // Validate required fields
        if (!username || !useremail || !roleid) {
            return Response.json(
                { status: false, message: "Missing required fields: username, useremail, roleid" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { useremail },
        });

        if (existingUser) {
            return Response.json(
                { status: false, message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Generate Password
        const nameParts = username.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

        const generatedPassword = await generatePassword(firstName, lastName);

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(generatedPassword, saltRounds);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                username,
                useremail,
                userphone,
                password: hashedPassword,
                roleid: Number(roleid),
                istempary: true,
            },
        });

        // Remove password from response (security best practice, but returning the generated one explicitly for initial setup)
        const { password: _, ...userData } = newUser;

        return Response.json({
            status: true,
            message: "User registered successfully",
            data: { ...userData, generatedPassword }, // Return the generated password so it can be communicated to the user
        }, { status: 201 });

    } catch (err: any) {
        console.error("Registration error:", err);
        return Response.json(
            { status: false, error: err.message },
            { status: 500 }
        );
    }
}
