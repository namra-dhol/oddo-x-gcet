import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
    try {
        const salaries = await prisma.salary_config.findMany();

        // Since schema doesn't show explicit relation, we might want to fetch employee names separately if needed.
        // For efficiency, usually we'd use include, but I'll stick to the safe bet based on schema visibility.

        return Response.json({ status: true, data: salaries });

    } catch (error: any) {
        return Response.json({ status: false, error: error.message }, { status: 500 });
    }
}
