import { prisma } from "@/app/lib/prisma";

// GET: List all time off records (leave_requests)
export async function GET(req: Request) {
    try {
        const requests = await prisma.leave_requests.findMany({
            orderBy: { start_date: "desc" },
        });

        const employees = await prisma.employees.findMany({
            select: { id: true, name: true }
        });

        const data = requests.map(r => {
            const emp = employees.find(e => e.id === r.employee_id);
            return {
                ...r,
                employee_name: emp?.name
            };
        });

        return Response.json({
            status: true,
            data: data,
        });
    } catch (error: any) {
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}

// PUT: Approve / Reject time off
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, status } = body; // status should be 'approved' or 'rejected'

        if (!id || !status) {
            return Response.json(
                { status: false, message: "Missing required fields: id, status" },
                { status: 400 }
            );
        }

        const allowedStatuses = ["pending", "approved", "rejected"];
        if (!allowedStatuses.includes(status)) {
            return Response.json(
                { status: false, message: "Invalid status" },
                { status: 400 }
            );
        }

        const updatedRequest = await prisma.leave_requests.update({
            where: { id: Number(id) },
            data: { status: status },
        });

        return Response.json({
            status: true,
            message: `Time off request ${status}`,
            data: updatedRequest,
        });
    } catch (error: any) {
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}
