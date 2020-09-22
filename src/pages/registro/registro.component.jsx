import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';

import './registro.styles.scss';

const Registro = () => (
  <Box className="registro">
    <Typography variant="h4">Registro</Typography>
    <Box m={3}>
      <FormControl required className={'input'}>
        <InputLabel htmlFor="correo">Correo</InputLabel>
        <Input
          type="email"
          id="correo"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
    <Box m={3}>
      <FormControl required className={'input'}>
        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <Input
          type="password"
          id="password"
          startAdornment={
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
    <Button variant="contained" color="primary">
      Registrar
    </Button>
  </Box>
);

export default Registro;
