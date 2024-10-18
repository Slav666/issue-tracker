import React from "react";
import { TextField, TextArea, Button } from "@radix-ui/themes";

const NewIssuesPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuesPage;
