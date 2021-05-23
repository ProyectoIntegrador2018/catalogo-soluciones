import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectApprovedOrganizations } from '../../../redux/organizations/organizations.selectors';
import {
  chartColors,
  CustomChart,
} from '../../dashboard/custom-chart.component';
import Button from '@material-ui/core/Button';
import { ArrowBackIos } from '@material-ui/icons';
import { selectAllEnquiries } from '../../../redux/enquiries/enquiries.selectors';
import EnquiriesList from '../enquiries-list/enquiries-list.component';

const OrganizationsChart = ({ organizations, allEnquiries }) => {
  const [selectedOrg, setSelectedOrg] = React.useState(null);
  if (!selectedOrg) {
    const getFrequency = ({ id }) =>
      allEnquiries.reduce(
        (count, { organizationID }) => count + (organizationID === id ? 1 : 0),
        0,
      );
    const sortedOrgs = organizations.sort(
      (a, b) => getFrequency(a) > getFrequency(b),
    );
    const labels = sortedOrgs.map(({ displayName }) => displayName);
    const frequencies = sortedOrgs.map((org) => getFrequency(org));

    const onBarSelect = (index) => setSelectedOrg(sortedOrgs[index]);
    return (
      <div>
        <h4 style={{ textAlign: 'center' }}>
          {' '}
          Organizaciones más consultadas{' '}
        </h4>
        <CustomChart
          labels={labels}
          frequencies={frequencies}
          onBarSelect={onBarSelect}
          preferredColor={chartColors[1]}
          itemName='consulta(s)'
        />
      </div>
    );
  }
  const { id, displayName } = selectedOrg;
  const enquiries = allEnquiries.filter(
    ({ organizationID }) => organizationID === id,
  );

  return (
    <div>
      <Button
        style={{ marginLeft: '60px' }}
        onClick={() => setSelectedOrg(null)}
      >
        {' '}
        <ArrowBackIos /> Ver todas las organizaciones
      </Button>
      <h4 style={{ textAlign: 'center' }}>
        {' '}
        Consultas a la organización <b>{displayName}</b>{' '}
      </h4>
      <EnquiriesList enquiries={enquiries} displayTitle={false} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allEnquiries: selectAllEnquiries,
  organizations: selectApprovedOrganizations,
});

export default connect(mapStateToProps)(OrganizationsChart);
