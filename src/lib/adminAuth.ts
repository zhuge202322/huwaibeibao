import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

type AdminAuthSettings = {
  salt: string;
  passwordHash: string;
  updatedAt: string;
};

type PasswordChangeResult = {
  ok: boolean;
  status: number;
  message: string;
};

const rootDir = process.cwd();
const adminAuthPath = path.join(rootDir, "src", "data", "adminAuth.json");

function getInitialAdminPassword() {
  return process.env.ADMIN_PASSWORD || "huwaibeibao-admin";
}

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

function safeTextEqual(value: string, expected: string) {
  const valueHash = createHash("sha256").update(value).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(valueHash, expectedHash);
}

function safeHashEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (valueBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(valueBuffer, expectedBuffer);
}

async function readAdminAuthSettings(): Promise<AdminAuthSettings | null> {
  try {
    const content = await fs.readFile(adminAuthPath, "utf8");
    const settings = JSON.parse(content) as Partial<AdminAuthSettings>;
    if (!settings.salt || !settings.passwordHash) return null;

    return {
      salt: String(settings.salt),
      passwordHash: String(settings.passwordHash),
      updatedAt: String(settings.updatedAt || ""),
    };
  } catch {
    return null;
  }
}

async function writeAdminAuthSettings(settings: AdminAuthSettings) {
  await fs.mkdir(path.dirname(adminAuthPath), { recursive: true });
  await fs.writeFile(adminAuthPath, `${JSON.stringify(settings, null, 2)}\n`, "utf8");
}

function validateNewPassword(password: string) {
  if (password.length < 8) return "新密码至少需要 8 个字符。";
  if (password.length > 128) return "新密码不能超过 128 个字符。";
  return "";
}

export async function verifyAdminPassword(password: string) {
  if (!password) return false;

  const settings = await readAdminAuthSettings();
  if (!settings) return safeTextEqual(password, getInitialAdminPassword());

  const passwordHash = hashPassword(password, settings.salt);
  return safeHashEqual(passwordHash, settings.passwordHash);
}

export async function isAdminRequestAuthorized(request: Request) {
  return verifyAdminPassword(request.headers.get("x-admin-password") || "");
}

export async function changeAdminPassword(
  currentPassword: string,
  nextPassword: string
): Promise<PasswordChangeResult> {
  if (!(await verifyAdminPassword(currentPassword))) {
    return {
      ok: false,
      status: 401,
      message: "当前后台密码不正确。",
    };
  }

  const validationMessage = validateNewPassword(nextPassword);
  if (validationMessage) {
    return {
      ok: false,
      status: 400,
      message: validationMessage,
    };
  }

  const salt = randomBytes(16).toString("hex");
  await writeAdminAuthSettings({
    salt,
    passwordHash: hashPassword(nextPassword, salt),
    updatedAt: new Date().toISOString(),
  });

  return {
    ok: true,
    status: 200,
    message: "管理员密码已更新，请使用新密码登录后台。",
  };
}
