"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";

type Blog = {
  createdAt: string;
  id: string;
  title: string;
};

export type BlogProps = {
  blogList: Blog[];
};

export default function Blog({ blogList }: BlogProps): JSX.Element {
  const columnHelper = createColumnHelper<Blog>();
  const columns = [
    columnHelper.accessor("id", {
      cell: () => null,
      header: () => null,
    }),
    columnHelper.accessor("createdAt", {
      cell: ({
        getValue,
        row: {
          original: { id },
        },
      }) => <Link href={`/blog/${id}`}>{getValue()}</Link>,
      header: () => "作成日",
    }),
    columnHelper.accessor("title", {
      cell: ({
        getValue,
        row: {
          original: { id },
        },
      }) => <Link href={`/blog/${id}`}>{getValue()}</Link>,
      header: () => "タイトル",
    }),
  ];
  const table = useReactTable({
    columns,
    data: blogList.map(({ createdAt, id, title }) => ({
      createdAt: dayjs(createdAt).format("YYYY-MM-DD"),
      id,
      title,
    })),
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(({ headers, id }) => (
            <tr className={styles.tr} key={id}>
              {headers.map(
                ({
                  column: {
                    columnDef: { header },
                  },
                  getContext,
                  id,
                  isPlaceholder,
                }) => (
                  <th className={styles.td} key={id}>
                    {isPlaceholder ? null : flexRender(header, getContext())}
                  </th>
                ),
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.map(({ getVisibleCells, id, renderValue }) => (
              <tr
                className={styles.tr}
                key={id}
                onClick={(): void => {
                  const id = renderValue("id");

                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  router.push(`/blog/${id}/edit`);
                }}
              >
                {getVisibleCells().map(
                  ({
                    column: {
                      columnDef: { cell },
                    },
                    getContext,
                    id,
                  }) => (
                    <td className={styles.td} key={id}>
                      {flexRender(cell, getContext())}
                    </td>
                  ),
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
