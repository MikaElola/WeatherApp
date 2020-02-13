import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../App.css';

const useStyles = makeStyles({
    root: {
        marginRight: '25vw',
        marginLeft: '25vw',
        borderRadius: '5px',
        borderWidth: '3px',
        borderColor: 'rgb(235, 117, 84)',
        borderStyle: 'solid',
    },
    tablecontainer: {
        backgroundColor: '#f5f5f5',
    },
    table: {
        
    },
    cityCell: {
      borderBottom: '0px none white'
    },
    tablecell: {
      padding: '0vw 1vw'  
    }
  });

const CityList = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TableContainer className={classes.tablecontainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cityCell}><h2>Kaupunki</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.userList.map((item, index) => (
            <TableRow key={index}>
              <TableCell data-testid='cityTest' className={classes.tablecell} component="th" scope="item">
                {item.city}
              </TableCell>
              <TableCell data-testid='tempTest' className={classes.tablecell} align="right">{item.temp}&#8451;</TableCell>
              <TableCell className={classes.tablecell} align="right"><img src={item.icon}/></TableCell>
              <TableCell className={classes.tablecell} align="right">
                <IconButton aria-label="delete" color="secondary" onClick={() => props.deleteItem(index)}>
                  <DeleteIcon />
                  </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      )
};

export default CityList;