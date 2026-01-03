import { prisma } from "@/app/lib/prisma";

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { leave_id, status } = body; // status: 'approved' | 'rejected'

        if (!leave_id || !status) {
            return Response.json({ status: false, message: "leave_id and status required" }, { status: 400 });
        }

        const updated = await prisma.leave_requests.update({
            where: { id: Number(leave_id) },
            data: { status },
        });

        // If approved, verify if we need to update attendance or just keep record.
        // For now, just update status.

        return Response.json({ status: true, message: `Leave ${status}`, data: updated });

    } catch (error: any) {
        return Response.json({ status: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        // Get all pending leaves
        const leaves = await prisma.leave_requests.findMany({
            include: {
                // ideally include employee name, but prisma requires relation setup.
                // Assuming implicit or manual relation isn't fully set up in schema posted earlier 
                // (schema had no relation fields on 'leave_requests' pointing to 'employees', just employee_id)
                // We will just fetch raw for now, or fetch employee details if needed.
            },
            orderBy: { id: "desc" }
        });

        // Fetch employee details manually since relation might not be defined in schema 
        // (Based on the schema provided, there were no explicit Relations defined like `employee employees @relation(...)`)
        // We can do a quick map if needed, or just return data.

        return Response.json({ status: true, data: leaves });

    } catch (error: any) {
        return Response.json({ status: false, error: error.message }, { status: 500 });
    }
}
