import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "@/app/ValidationSchema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 400 });

  const updateIssue = prisma.issue.update({
    where: { id: issue.id },
    data: { title: issue.title, description: issue.description },
  });

  return NextResponse.json(updateIssue);
}
