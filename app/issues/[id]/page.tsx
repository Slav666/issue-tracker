// import React from "react";
import prisma from "@/prisma/client";
import { Grid, Box, Flex } from "@radix-ui/themes";
import IssueDetail from "./IssueDetail";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  // Ensure id is parsed correctly and is a valid number
  const issueId = parseInt(params.id, 10);
  if (isNaN(issueId)) {
    console.error("Invalid issue ID:", params.id);
    notFound();
  }

  // Fetch the issue from the database
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
