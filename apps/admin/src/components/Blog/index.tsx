"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
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
    }),
    columnHelper.accessor("createdAt", {
      cell: ({
        getValue,
        row: {
          original: { id },
        },
      }) => <Link href={`/blog/${id}`}>{getValue()}</Link>,
    }),
    columnHelper.accessor("title", {
      cell: ({
        getValue,
        row: {
          original: { id },
        },
      }) => <Link href={`/blog/${id}`}>{getValue()}</Link>,
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

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <tbody>
          {table.getRowModel().rows.map(({ getVisibleCells, id }) => (
            <tr className={styles.tr} key={id}>
              {getVisibleCells().map(
                ({
                  column: {
                    columnDef: { cell },
                  },
                  getContext,
                  id,
                }) => (
                  <td key={id}>{flexRender(cell, getContext())}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
