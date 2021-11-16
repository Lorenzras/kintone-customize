/* eslint-disable react/display-name */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Cell from './Cell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';
import Title from '../Headers/Title';
import Box from '@mui/system/Box';
import CellHeader from './CellHeader';
import SiteData from '../Cards/SiteData';
import './TableHankyo.css';

interface TableHankyoProps {
  title: string
  records: KintoneTypes.SavedData[]
}


const TableHankyo = ({title, records}: TableHankyoProps) => {
  const titleComponent = `【${title}】 売却サイト反響管理表`;

  return (
    <Box padding={1}>
      <Title>{titleComponent}</Title>

      <TableContainer sx={{width: '100%'}}>
        <Table sx={{width: '100%'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CellHeader >No.</CellHeader>
              <CellHeader padding="normal">店舗</CellHeader>
              <CellHeader >媒体<br />サイト</CellHeader>
              <CellHeader >反響日</CellHeader>
              <CellHeader>時間</CellHeader>
              <CellHeader>担当</CellHeader>
              <CellHeader>種別</CellHeader>
              <CellHeader>査定先<br />住所</CellHeader>
              <CellHeader>課金外対象<br />可否</CellHeader>
              <CellHeader>反響対応</CellHeader>
              <CellHeader>媒介獲得日</CellHeader>
              <CellHeader>その他<br />（中止等理由）</CellHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((row, idx) => (
              <TableRow
                key={row.$id.value}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <Cell>{idx}</Cell>
                <Cell width={100} component="th" scope="row">
                  {row.受付店舗.value}
                </Cell>
                <Cell >{row.媒体サイト.value}</Cell>
                <Cell>{row.反響受付日.value}</Cell>
                <Cell>{row.受付時刻.value}</Cell>
                <Cell>{row.営業担当.value}</Cell>
                <Cell>{row.種別.value}</Cell>
                <Cell>{row.査定先住所.value}</Cell>
                <Cell>{row.課金対象.value}</Cell>
                <Cell>{row.反響対応.value}</Cell>
                <Cell>{row.媒介獲得日.value}</Cell>
                <Cell />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow >
              <TableCell colSpan={5}>{titleComponent}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <SiteData {...{records}} />
      <footer className="page-break" />
    </Box>
  );
};

export default TableHankyo;
