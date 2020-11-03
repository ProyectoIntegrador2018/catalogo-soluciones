import React, { useState } from 'react';

import { Button, Modal, Tooltip } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import SolutionForm from '../../solution-form/solution-form.component';
import { removeSolution } from '../../../redux/solutions/solutions.actions';
import { deleteUserSolution } from '../../../firebase/user-panel';

import './solutions-list.styles.scss';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const HoverInfo = ({ label, icon, message }) => (
  <Tooltip className='tooltip header-block-small' title={message}>
    <Button>
      {label} &nbsp; {icon}
    </Button>
  </Tooltip>
);

const SolutionList = ({ solutions, ...otherProps }) => {
  const [state, setState] = useState({
    open: otherProps.open,
    solution: null,
  });

  const removeItem = (solution) => {
    deleteUserSolution(solution.id);
    removeSolution(solution.id);
  };

  const modifyItem = (solution) => {
    setState({ open: true, solution });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '30%' }}>SOLUCIÓN</TableCell>
              <TableCell align='right'>
                <HoverInfo
                  label='Publicada'
                  icon={<InfoOutlinedIcon />}
                  message='Si deseas puedes elegir no publicar una solución en el catálogo, si aun no esta lista o no deseas mostrarla.'
                />
              </TableCell>
              <TableCell align='right'>
                <HoverInfo
                  label='Aprobado'
                  icon={<InfoOutlinedIcon />}
                  message='Se refiere a si la solución ha sido aprobada o no para aparecer en el catálogo. Si no lo ha sido, no se mostrará.'
                />
              </TableCell>
              <TableCell align='right'>OPCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solutions.map((solution, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {solution.solutionName}
                </TableCell>
                <TableCell align='right'>
                  <Checkbox
                    color='primary'
                    checked={solution.published ? true : false}
                    disabled={solution.approved ? false : true}
                  />
                </TableCell>
                <TableCell align='right'>
                  {solution.approved ? (
                    <CheckIcon style={{ fill: 'green' }} />
                  ) : (
                    <ClearIcon style={{ fill: 'red' }} />
                  )}
                </TableCell>
                <TableCell align='right'>
                  <span className='action-buttons'>
                    <Button
                      className='modify'
                      onClick={() => modifyItem(solution)}
                    >
                      Ver / Editar
                    </Button>
                    <Button
                      className='delete'
                      onClick={() => removeItem(solution)}
                    >
                      Borrar
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        className='modal'
        open={state.open}
        onClose={handleClose}
        closeAfterTransition
      >
        <SolutionForm {...state} />
      </Modal>
    </div>
  );
};

export default SolutionList;
