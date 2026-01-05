import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
    try {
        const attendanceRecords = await prisma.attendance.findMany({
            orderBy: { date: "desc" },
        });

        // Enrich with employee names
        const employees = await prisma.employees.findMany({
            select: { id: true, name: true }
        });

        const data = attendanceRecords.map(record => {
            const emp = employees.find(e => e.id === record.employee_id);
            return {
                ...record,
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
