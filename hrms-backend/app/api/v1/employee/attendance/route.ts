import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { employee_id, action } = body;
        // action: 'check_in' | 'check_out'

        if (!employee_id || !action) {
            return Response.json({ status: false, message: "Missing employee_id or action" }, { status: 400 });
        }

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        if (action === "check_in") {
            // Check if already checked in
            const existing = await prisma.attendance.findFirst({
                where: {
                    employee_id: Number(employee_id),
                    date: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            });

            if (existing) {
                return Response.json({ status: false, message: "Already checked in today" }, { status: 409 });
            }

            const attendance = await prisma.attendance.create({
                data: {
                    employee_id: Number(employee_id),
                    date: new Date(),
                    check_in_time: new Date(),
                    status: "present",
                },
            });

            return Response.json({ status: true, message: "Checked in successfully", data: attendance });
        }

        if (action === "check_out") {
            const attendance = await prisma.attendance.findFirst({
                where: {
                    employee_id: Number(employee_id),
                    date: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            });

            if (!attendance) {
                return Response.json({ status: false, message: "No check-in record found for today" }, { status: 404 });
            }

            if (attendance.check_out_time) {
                return Response.json({ status: false, message: "Already checked out" }, { status: 409 });
            }

            // Calculate total hours
            const checkOutTime = new Date();
            const checkInTime = new Date(attendance.check_in_time!); // we know it exists
            const diffMs = checkOutTime.getTime() - checkInTime.getTime();
            const totalHours = diffMs / (1000 * 60 * 60);

            const updated = await prisma.attendance.update({
                where: { id: attendance.id },
                data: {
                    check_out_time: checkOutTime,
                    total_hours: totalHours,
                },
            });

            return Response.json({ status: true, message: "Checked out successfully", data: updated });
        }

        return Response.json({ status: false, message: "Invalid action" }, { status: 400 });

    } catch (error: any) {
        return Response.json({ status: false, error: error.message }, { status: 500 });
    }
}
