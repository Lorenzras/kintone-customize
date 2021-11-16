import TableCell, {TableCellProps} from '@mui/material/TableCell';


const Cell = (props : TableCellProps) => {
  return (
    <TableCell
      width={props.width}
      sx={{
        padding: 1,
      }}
      {...props}
    >
      {props.children}
    </TableCell>);
};

export default Cell;