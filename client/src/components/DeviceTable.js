import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(() => ({
  head: {
    fontWeight: 900,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const DeviceTable = ({ devices }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Vendor Id</StyledTableCell>
            <StyledTableCell align="right">Product Id</StyledTableCell>
            <StyledTableCell align="right">String descriptor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <StyledTableRow key={device.deviceAddress}>
              <StyledTableCell component="th" scope="row">
                {device.deviceName}
              </StyledTableCell>
              <StyledTableCell align="right">{device.vendorId}</StyledTableCell>
              <StyledTableCell align="right">{device.productId}</StyledTableCell>
              <StyledTableCell align="right">{device?.stringDescriptor}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
