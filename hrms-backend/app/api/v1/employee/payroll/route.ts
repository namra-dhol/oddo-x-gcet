import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const employee_id = searchParams.get("employee_id");

        if (!employee_id) {
            return Response.json({ status: false, message: "employee_id required" }, { status: 400 });
        }

        const salary = await prisma.salary_config.findUnique({
            where: { employee_id: Number(employee_id) },
        });

        if (!salary) {
            return Response.json({ status: false, message: "Salary config not found" }, { status: 404 });
        }

        return Response.json({ status: true, data: salary });

    } catch (error: any) {
        return Response.json({ status: false, error: error.message }, { status: 500 });
    }
}
