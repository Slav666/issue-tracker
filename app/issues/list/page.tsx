// import React from "react";
// import { Table } from "@radix-ui/themes";
// import prisma from "@/prisma/client";
// import IssueStatusBadge from "../../components/IssueStatusBadge";
// import IssueActions from "./IssueActions";
// import CustomLink from "../../components/CustomLink";
// import { Status, Issue } from "@prisma/client";
// import Link from "next/link";

// const IssuesPage = async ({
//   searchParams,
// }: {
//   searchParams: { status: Status; orderBy: keyof Issue };
// }) => {
//   const columns: { label: string; value: keyof Issue; className?: string }[] = [
//     { label: "Issue", value: "title" },
//     { label: "Status", value: "status", className: "hidden md:table-cell" },
//     { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
//   ];

//   const statuses = Object.values(Status);
//   const status = statuses.includes(searchParams.status)
//     ? searchParams.status
//     : undefined;

//   const orderBy = searchParams.orderBy
//     ? { [searchParams.orderBy]: "asc" }
//     : undefined;

//   const issues = await prisma.issue.findMany({
//     where: { status },
//     orderBy,
//   });
//   return (
//     <div>
//       <IssueActions />
//       <Table.Root variant="surface">
//         <Table.Header>
//           <Table.Row>
//             {columns.map((column) => (
//               <Table.ColumnHeaderCell key={column.value}>
//                 <Link
//                   href={{ query: { ...searchParams, orderedBy: column.value } }}
//                 >
//                   {column.label}
//                 </Link>
//                 {column.value === searchParams.orderBy}
//               </Table.ColumnHeaderCell>
//             ))}
//           </Table.Row>
//         </Table.Header>

//         <Table.Body>
//           {issues.map((issue) => (
//             <Table.Row key={issue.id}>
//               <Table.Cell>
//                 <CustomLink href={`/issues/${issue.id}`}>
//                   {issue.title}
//                 </CustomLink>
//                 <div className="block md:hidden">
//                   <IssueStatusBadge status={issue.status} />
//                 </div>
//               </Table.Cell>

//               <Table.Cell className="hidden md:table-cell ">
//                 <IssueStatusBadge status={issue.status} />
//               </Table.Cell>
//               <Table.Cell className="hidden md:table-cell ">
//                 {issue.updatedAt.toDateString()}
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>
//     </div>
//   );
// };

// export default IssuesPage;
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";


interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};


export default IssuesPage;
