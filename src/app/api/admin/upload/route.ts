import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".ico"]);

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

function safeSegment(value: FormDataEntryValue | null) {
  const raw = typeof value === "string" ? value : "general";
  return raw.replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "general";
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return Response.json({ message: "Please upload a valid image file." }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase() || ".png";
  if (!allowedExtensions.has(ext)) {
    return Response.json({ message: "Unsupported image type." }, { status: 400 });
  }

  const target = safeSegment(formData.get("target"));
  const uploadDir = path.join(process.cwd(), "public", "uploads", target);
  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${randomUUID()}${ext}`;
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return Response.json({ url: `/uploads/${target}/${fileName}` });
}
