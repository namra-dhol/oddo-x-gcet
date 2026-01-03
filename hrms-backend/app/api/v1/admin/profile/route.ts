import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userid");

        if (!userId) {
            return Response.json(
                { status: false, message: "User ID is required" },
                { status: 400 }
            );
        }

        const admin = await prisma.user.findUnique({
            where: { userid: Number(userId) },
            select: {
                userid: true,
                username: true,
                useremail: true,
                userphone: true,
                roleid: true,
                created_at: true,
            }
        });

        if (!admin) {
            return Response.json(
                { status: false, message: "Admin not found" },
                { status: 404 }
            );
        }

        return Response.json({
            status: true,
            data: admin,
        });
    } catch (error: any) {
        return Response.json(
            { status: false, error: error.message },
            { status: 500 }
        );
    }
}
