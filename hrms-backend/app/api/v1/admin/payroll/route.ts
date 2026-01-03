import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
    try {
        // Payroll logic: combination of salary config and potentially attendance logic
        // For now, listing basic payroll definitions.
        const payrollData = await prisma.salary_config.findMany();

        const employees = await prisma.employees.findMany({
            select: { id: true, name: true, designation: true }
        });

        const data = payrollData.map(p => {
            const emp = employees.find(e => e.id === p.employee_id);
            return {
                ...p,
                employee_name: emp?.name,
                designation: emp?.designation,
                // Example calculation: Monthly Gross
                monthly_gross: (Number(p.basic_salary) || 0) + (Number(p.hra) || 0) + (Number(p.allowances) || 0)
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
