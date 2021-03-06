import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import './panel.styles.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className='panel-content max-width'
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PanelMenu({ items, ...otherProps }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className='panel-header' position='static' color='default'>
        <center><div className='max-width'>
          <Tabs
            className='tab-bar'
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
          >
            {Object.keys(items).map((title, index) => (
              <Tab
                key={index}
                label={title}
                icon={items[title].icon}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </div></center>
      </AppBar>
      {Object.values(items).map((content, index) => (
        <TabPanel value={value} index={index} key={index}>
          {content.component}
        </TabPanel>
      ))}
    </div>
  );
}
