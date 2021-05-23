import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectApprovedSolutions } from '../../../redux/solutions/solutions.selectors';
import {
  chartColors,
  CustomChart,
} from '../../dashboard/custom-chart.component';
import Button from '@material-ui/core/Button';
import { ArrowBackIos } from '@material-ui/icons';
import { selectAllEnquiries } from '../../../redux/enquiries/enquiries.selectors';
import EnquiriesList from '../enquiries-list/enquiries-list.component';

const SolutionsChart = ({ solutions, allEnquiries }) => {
  const [selectedSolution, setSelectedSolution] = React.useState(null);
  if (!selectedSolution) {
    const getFrequency = ({ id }) =>
      allEnquiries.reduce(
        (count, { serviceId }) => count + (serviceId === id ? 1 : 0),
        0,
      );
    const sortedSolutions = solutions.sort(
      (a, b) => getFrequency(a) > getFrequency(b),
    );
    const labels = sortedSolutions.map(({ solutionName }) => solutionName);
    const frequencies = sortedSolutions.map((solution) =>
      getFrequency(solution),
    );

    const onBarSelect = (index) => setSelectedSolution(sortedSolutions[index]);
    return (
      <div>
        <h4 style={{ textAlign: 'center' }}> Soluciones más consultadas </h4>
        <CustomChart
          labels={labels}
          frequencies={frequencies}
          onBarSelect={onBarSelect}
          preferredColor={chartColors[0]}
          itemName='consulta(s)'
        />
      </div>
    );
  }
  const { id, solutionName } = selectedSolution;
  const enquiries = allEnquiries.filter(({ serviceId }) => serviceId === id);

  return (
    <div>
      <Button
        style={{ marginLeft: '60px' }}
        onClick={() => setSelectedSolution(null)}
      >
        {' '}
        <ArrowBackIos /> Ver todas las soluciones
      </Button>
      <h4 style={{ textAlign: 'center' }}>
        {' '}
        Consultas a la solución <b>{solutionName}</b>{' '}
      </h4>
      <EnquiriesList enquiries={enquiries} displayTitle={false} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectApprovedSolutions,
  allEnquiries: selectAllEnquiries,
});

export default connect(mapStateToProps)(SolutionsChart);
