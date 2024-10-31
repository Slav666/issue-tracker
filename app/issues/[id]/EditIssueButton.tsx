import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
