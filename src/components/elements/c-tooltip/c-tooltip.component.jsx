import React from 'react';

import { Button, Tooltip } from '@material-ui/core';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const CTooltip = ({ label,  message }) => (
  <Tooltip title={message}>
    <Button>
      {label} &nbsp; <InfoOutlinedIcon />
    </Button>
  </Tooltip>
);

export default CTooltip;