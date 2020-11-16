import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CButton from '../../elements/c-button/c-button.component';
import CModal from '../../elements/c-modal/c-modal.component';
import CTooltip from '../../elements/c-tooltip/c-tooltip.component';

import SolutionForm from '../solution-form/solution-form.component';
import { removeSolution } from '../../../redux/solutions/solutions.actions';
import { deleteUserSolution } from '../../../firebase/user-panel';

import './solutions-list.styles.scss';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const SolutionList = ({ solutions }) => {
  const [state, setState] = React.useState({
    open: false,
  });

  if (solutions.length == 0) {

  }

  const removeItem = (solution, index) => {
    deleteUserSolution(solution.id);
    removeSolution(solution.id);
    solutions.splice(index, 1)
    setState({ solutions });
  };

  const modifyItem = (solution) => {
    setState({ open: true, solution });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  return (
    <div>
      {
        solutions.length > 0 ?
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '50%' }}>SOLUCIÓN</TableCell>
                  <TableCell align='right'>
                    <CTooltip
                      label='Aprobado'
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
                      {solution.approved ? (
                        <CheckIcon style={{ fill: 'green' }} />
                      ) : (
                        <ClearIcon style={{ fill: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell align='right'>
                        <CButton
                          text='Ver / Editar'
                          onClick={() => modifyItem(solution)}
                          color='blue'
                        />
                        &nbsp;&nbsp;
                        <CButton
                          text='Borrar'
                          onClick={() => removeItem(solution, index)}
                          alertMessage='¿Seguro que quieres eliminar la solución?'
                          color='red'
                        />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        :
          <center><h2>
            Cuando agregues soluciones se mostraran aquí.
          </h2></center>
      }
      <CModal
        open={state.open}
        onClose={handleClose}
      >
        <SolutionForm {...state} />
      </CModal>
    </div>
  );
};

export default SolutionList;
