import { changeAdminPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
    };

    const result = await changeAdminPassword(
      String(body.currentPassword || request.headers.get("x-admin-password") || ""),
      String(body.newPassword || "")
    );

    return Response.json({ message: result.message }, { status: result.status });
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : "密码修改失败。",
      },
      { status: 400 }
    );
  }
}
