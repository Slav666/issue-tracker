import React from "react";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <LatestIssues />
    </div>
  );
}
