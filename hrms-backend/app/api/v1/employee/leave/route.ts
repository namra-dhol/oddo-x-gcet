import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { employee_id, type, start_date, end_date, reason } = body;

        if (!employee_id || !type || !start_date || !end_date) {
            return Response.json({ status: false, message: "Missing required fields" }, { status: 400 });
        }

        const leave = await prisma.leave_requests.create({
            data: {
                employee_id: Number(employee_id),
                type,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                reason,
                status: "pending",
            },
        });

        return Response.json({ status: true, message: "Leave request submitted", data: leave });

    } catch (error: any) {
        return Response.json({ status: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const employee_id = searchParams.get("employee_id");

        if (!employee_id) {
            return Response.json({ status: false, message: "employee_id required" }, { status: 400 });
        }

        const leaves = await prisma.leave_requests.findMany({
            where: { employee_id: Number(employee_id) },
            orderBy: { id: "desc" },
        });

        return Response.json({ status: true, data: leaves });
    } catch (error: any) {
        return Response.json({ status: false, error: error.message }, { status: 500 });
    }
}
