import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
    try {
        const employees = await prisma.employees.findMany({
            orderBy: { id: "asc" },
        });

        return Response.json({
            status: true,
            data: employees,
        });
    } catch (error: any) {
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, designation, mobile, basic_salary, hra } = body;

        if (!name || !email) {
            return Response.json(
                { status: false, message: "Name and email are required" },
                { status: 400 }
            );
        }

        // Check if exists
        const existing = await prisma.employees.findFirst({
            where: { email },
        });

        if (existing) {
            return Response.json(
                { status: false, message: "Employee identifying with this email already exists" },
                { status: 409 }
            );
        }

        // Create default password
        const hashedPassword = await bcrypt.hash("password123", 10);

        // Transaction to create employee and salary config
        const result = await prisma.$transaction(async (tx) => {
            const newEmployee = await tx.employees.create({
                data: {
                    name,
                    email,
                    designation,
                    mobile,
                    password_hash: hashedPassword,
                    status: "active",
                    role: "employee",
                },
            });

            // Create default or provided salary config
            const salary = await tx.salary_config.create({
                data: {
                    employee_id: newEmployee.id, // Fixed: using the property from the object
                    basic_salary: basic_salary || 50000,
                    hra: hra || 10000,
                    allowances: 5000,
                    professional_tax: 200,
                },
            });

            return { employee: newEmployee, salary };
        });

        return Response.json({
            status: true,
            message: "Employee created successfully with salary config",
            data: result,
        }, { status: 201 });

    } catch (error: any) {
        console.error("Create employee error:", error);
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}
