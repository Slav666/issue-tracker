import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const in_progress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <LatestIssues />
      <IssueSummary open={open} inProgress={in_progress} closed={closed} />
    </div>
  );
}
