import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getSummary } from "@/lib/summary";

export async function GET() {
  const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }
            return NextResponse.json(await getSummary(session.userId));
            }