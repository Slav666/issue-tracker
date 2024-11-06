import React from "react";
import { Table, Flex, Avatar, Card, Heading } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./components/IssueStatusBadge";
import { Issue, User } from "@prisma/client";
interface LatestIssuesProps {
  issues: (Issue & { assignedToUser: User | null })[];
}
const LatestIssues: React.FC<LatestIssuesProps> = ({ issues }) => {
  return (
    <Card>
      <Heading align="center">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image || ""}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
export default LatestIssues;
