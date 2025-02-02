import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const { code, input } = await req.json();
    if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

    console.log("📨 Received Code:", code);
    console.log("📨 Received Input:", input);

    // Create a temporary Python file
    const tempDir = path.join(process.cwd(), "tmp");
    await fs.mkdir(tempDir, { recursive: true });
    const tempFile = path.join(tempDir, `script_${Date.now()}.py`);

    // Generate Python script with input handling
    const modifiedCode = `
import sys
sys.stdin = open(0)
input_value = ${JSON.stringify(input)}

def custom_input(prompt=""):
    print(prompt, end="")
    return input_value

input = custom_input

try:
    ${code}
except Exception as e:
    print("Error:", e)
`;

    await fs.writeFile(tempFile, modifiedCode);

    console.log("✅ Temporary Python file created:", tempFile);

    // Execute the Python script
    try {
      const { stdout, stderr } = await execAsync(`python3 "${tempFile}"`);
      console.log("📤 Python Execution Output:", stdout);
      console.log("❌ Python Execution Error (if any):", stderr);

      // Clean up the temporary file
      await fs.unlink(tempFile);

      return NextResponse.json({ output: stdout || stderr });
    } catch (execError) {
      console.error("❌ Execution Error:", execError);
      await fs.unlink(tempFile);
      return NextResponse.json({ error: execError.message }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
