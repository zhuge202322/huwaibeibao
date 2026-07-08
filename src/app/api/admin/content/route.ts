import { readAdminContent, writeAdminContent } from "@/lib/adminContent";
import type { AdminContent } from "@/types/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const password = process.env.ADMIN_PASSWORD || "huwaibeibao-admin";
  return request.headers.get("x-admin-password") === password;
}

function unauthorized() {
  return Response.json(
    { message: "Unauthorized. Please provide the admin password." },
    { status: 401 }
  );
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  const content = await readAdminContent();
  return Response.json(content);
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const body = (await request.json()) as AdminContent;
    const content = await writeAdminContent(body);
    return Response.json(content);
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : "Failed to save admin content.",
      },
      { status: 400 }
    );
  }
}
