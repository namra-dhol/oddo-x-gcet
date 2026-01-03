import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { employee_id, month, year } = body;

        if (!employee_id || !month || !year) {
            return Response.json(
                { status: false, message: "Missing required fields: employee_id, month, year" },
                { status: 400 }
            );
        }

        const employee = await prisma.employees.findUnique({
            where: { id: Number(employee_id) },
        });

        const salary = await prisma.salary_config.findUnique({
            where: { employee_id: Number(employee_id) },
        });

        if (!employee) {
            return Response.json(
                { status: false, message: `Employee with ID ${employee_id} not found` },
                { status: 404 }
            );
        }

        if (!salary) {
            return Response.json(
                { status: false, message: `Salary configuration not found for employee ID ${employee_id}` },
                { status: 404 }
            );
        }

        // Basic receipt generation logic
        const basic = Number(salary.basic_salary) || 0;
        const hra = Number(salary.hra) || 0;
        const allowances = Number(salary.allowances) || 0;
        const profTax = Number(salary.professional_tax) || 0;

        const grossEarnings = basic + hra + allowances;
        const totalDeductions = profTax;
        const netPay = grossEarnings - totalDeductions;

        const receipt = {
            receipt_id: `PAY-${year}${month}-${employee_id}`,
            employee_id: employee.id,
            employee_name: employee.name,
            designation: employee.designation,
            month,
            year,
            earnings: {
                basic,
                hra,
                allowances,
                gross: grossEarnings,
            },
            deductions: {
                professional_tax: profTax,
                total: totalDeductions,
            },
            net_pay: netPay,
            generated_at: new Date(),
        };

        return Response.json({
            status: true,
            message: "Salary receipt generated",
            data: receipt,
        });
    } catch (error: any) {
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}
