import React from "react";
import { Card, Flex, Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Skeleton />
      <Flex gap="4" my="2">
        <Skeleton width="5" />
        <Skeleton width="4" />
      </Flex>
      <Card className="prose" mt="-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
