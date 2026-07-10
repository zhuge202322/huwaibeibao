import { readAdminContent, writeAdminContent } from "@/lib/adminContent";
import { isAdminRequestAuthorized } from "@/lib/adminAuth";
import type { AdminContent } from "@/types/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return Response.json(
    { message: "Unauthorized. Please provide the admin password." },
    { status: 401 }
  );
}

export async function GET(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) return unauthorized();
  const content = await readAdminContent();
  return Response.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminRequestAuthorized(request))) return unauthorized();

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
