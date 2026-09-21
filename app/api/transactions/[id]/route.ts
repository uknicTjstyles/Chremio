import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import {
  parseTransaction,
    serializeTransaction,
      type TxDoc,
      } from "@/lib/transactions";
      import Transaction from "@/models/Transaction";

      type Ctx = { params: Promise<{ id: string }> };

      export async function PUT(req: Request, { params }: Ctx) {
        const session = await getSession();
          if (!session) {
              return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
                }

                  const { id } = await params;
                    if (!mongoose.isValidObjectId(id)) {
                        return NextResponse.json({ error: "Not found" }, { status: 404 });
                          }

                            const body = await req.json().catch(() => null);
                              const { data, error } = parseTransaction(body);
                                if (!data) {
                                    return NextResponse.json({ error }, { status: 400 });
                                      }

                                        await connectDB();
                                          const updated = (await Transaction.findOneAndUpdate(
                                              { _id: id, userId: session.userId },
                                                  data,
                                                      { new: true, runValidators: true }
                                                        ).lean()) as TxDoc | null;

                                                          if (!updated) {
                                                              return NextResponse.json({ error: "Not found" }, { status: 404 });
                                                                }
                                                                  return NextResponse.json({ transaction: serializeTransaction(updated) });
                                                                  }

                                                                  export async function DELETE(_req: Request, { params }: Ctx) {
                                                                    const session = await getSession();
                                                                      if (!session) {
                                                                          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
                                                                            }

                                                                              const { id } = await params;
                                                                                if (!mongoose.isValidObjectId(id)) {
                                                                                    return NextResponse.json({ error: "Not found" }, { status: 404 });
                                                                                      }

                                                                                        await connectDB();
                                                                                          const deleted = await Transaction.findOneAndDelete({
                                                                                              _id: id,
                                                                                                  userId: session.userId,
                                                                                                    });

                                                                                                      if (!deleted) {
                                                                                                          return NextResponse.json({ error: "Not found" }, { status: 404 });
                                                                                                            }
                                                                                                              return NextResponse.json({ ok: true });
                                                                                                              }