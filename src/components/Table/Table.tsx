import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "carbon-components-react";
import React, { FunctionComponent } from "react";
import { Movie } from "../Content/Content";

interface data {
  [key: string]: string | number;
}

interface BasicTableProps {
  headers: string[];
  dataList: Movie[];
}

const BasicTable: FunctionComponent<BasicTableProps> = ({
  headers,
  dataList,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataList.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.movieName}</TableCell>
            <TableCell>{data.director}</TableCell>
            <TableCell>{data.yearReleased}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BasicTable;
