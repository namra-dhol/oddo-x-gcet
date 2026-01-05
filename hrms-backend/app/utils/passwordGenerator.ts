
import { prisma } from "@/app/lib/prisma";

export async function generatePassword(firstName: string, lastName: string): Promise<string> {
    const COMPANY_NAME = "Oddo";

    // 1. Company Part (2 chars)
    const companyPart = COMPANY_NAME.substring(0, 2).toUpperCase();

    // 2. Name Part (4 chars: 2 first, 2 last)
    const f = (firstName && firstName.length >= 1 ? firstName : "XX").substring(0, 2).padEnd(2, 'X');
    const l = (lastName && lastName.length >= 1 ? lastName : "XX").substring(0, 2).padEnd(2, 'X');
    const namePart = (f + l).toUpperCase();

    // 3. Year Part (4 chars)
    const currentYear = new Date().getFullYear();
    const yearPart = currentYear.toString();

    // 4. Serial Part (4 chars)
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`);

    const count = await prisma.user.count({
        where: {
            created_at: {
                gte: startOfYear,
                lt: endOfYear
            }
        }
    });

    const serialNumber = count + 1;
    const serialPart = serialNumber.toString().padStart(4, '0');

    return `${companyPart}${namePart}${yearPart}${serialPart}`;
}
