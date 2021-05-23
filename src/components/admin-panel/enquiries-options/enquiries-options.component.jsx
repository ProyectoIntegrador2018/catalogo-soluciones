import React from 'react';
import SolutionsChart from '../solutions-chart/solutions-chart.component';
import OrganizationsChart from '../organizations-chart/organizations-chart.component';
import Button from '@material-ui/core/Button';
import { ArrowBackIos } from '@material-ui/icons';
import EnquiriesList from '../enquiries-list/enquiries-list.component';

const EnquiriesOptions = ({ enquiries }) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const backButton = (
    <Button
      style={{ marginLeft: '20px' }}
      onClick={() => setSelectedOption('')}
    >
      <ArrowBackIos /> Ver todas las opciones
    </Button>
  );
  if (selectedOption === '') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2> Consultas de soluciones </h2>
        <Button
          onClick={() => setSelectedOption('normal')}
          style={{ border: '1px solid grey' }}
        >
          {' '}
          Ver todas las consultas{' '}
        </Button>
        <br />
        <Button
          onClick={() => setSelectedOption('by-solutions')}
          style={{ border: '1px solid grey' }}
        >
          {' '}
          Ver las soluciones más consultadas{' '}
        </Button>
        <br />
        <Button
          onClick={() => setSelectedOption('by-organizations')}
          style={{ border: '1px solid grey' }}
        >
          {' '}
          Ver las organizaciones más consultadas{' '}
        </Button>
        <br />
      </div>
    );
  }
  if (selectedOption === 'normal') {
    return (
      <div>
        {' '}
        {backButton} <EnquiriesList enquiries={enquiries} />
      </div>
    );
  }
  if (selectedOption === 'by-solutions') {
    return (
      <div>
        {' '}
        {backButton} <SolutionsChart />
      </div>
    );
  }
  if (selectedOption === 'by-organizations') {
    return (
      <div>
        {' '}
        {backButton} <OrganizationsChart />
      </div>
    );
  }
  return backButton;
};

export default EnquiriesOptions;
