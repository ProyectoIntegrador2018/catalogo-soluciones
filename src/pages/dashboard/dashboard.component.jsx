import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectApprovedSolutions } from '../../redux/solutions/solutions.selectors';
import SOLUTION_CATEGORIES from '../../constants/solution-categories';
import {
  chartColors,
  CustomChart,
} from '../../components/dashboard/custom-chart.component';
import Button from '@material-ui/core/Button';
import { ArrowBackIos } from '@material-ui/icons';

const countMatches = (solutions, categories) => {
  var count = 0;
  solutions?.forEach((solution) => {
    if (categories.find((categ) => categ === solution.category)) count += 1;
  });
  return count;
};

const solutionCategoryNames = Object.keys(SOLUTION_CATEGORIES);
const solutionCategoryValues = Object.values(SOLUTION_CATEGORIES);

const Dashboard = ({ solutions }) => {
  const history = useHistory();
  const { categoryIndex } = useParams();

  const getChart = () => {
    if (!categoryIndex) {
      const frequencies = solutionCategoryValues.map((members) =>
        countMatches(solutions, members),
      );
      return (
        <CustomChart
          labels={solutionCategoryNames}
          frequencies={frequencies}
          onBarSelect={(index) => history.push(`/dashboard/${index}`)}
        />
      );
    } else {
      const labels = solutionCategoryValues[categoryIndex];
      const frequencies = labels.map((label) =>
        countMatches(solutions, [label]),
      );
      // TODO: Url parameter is a no-op for now. Implementation needed.
      const onBarSelect = (index) =>
        history.push(`/catalogo?category=${index}`);
      const preferredColor = chartColors[categoryIndex % chartColors.length];
      return (
        <div>
          <Button
            style={{ marginLeft: '20px' }}
            onClick={() => history.push('/dashboard')}
          >
            {' '}
            <ArrowBackIos /> Volver{' '}
          </Button>
          <CustomChart
            labels={labels}
            frequencies={frequencies}
            onBarSelect={onBarSelect}
            preferredColor={preferredColor}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}> Catálogo de Soluciones </h2>
      {getChart()}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectApprovedSolutions,
});

export default connect(mapStateToProps)(Dashboard);
