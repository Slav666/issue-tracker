"use client";

import React from "react";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This application will no longer be accessible and any
            existing sessions will be expired.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  await axios.delete("/api/issues/" + issueId);
                  router.push("/issues");
                  router.refresh();
                }}
              >
                Delete issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
