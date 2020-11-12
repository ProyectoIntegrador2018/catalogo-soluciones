import React, { useEffect, useState } from 'react';
import { forwardRef } from 'react';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import CButton from '../elements/c-button/c-button.component';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Refresh from '@material-ui/icons/Refresh';
import { useHistory } from 'react-router-dom';

import './catalog-list.styles.scss';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const CatalogList = ({ data }) => {
  const [solutions, setSolutions] = useState();
  let history = useHistory();

  const shouldApplyEffect = (data) => {
    return data && data[0].imageUrl && !data[0].imageUrl.props;
  };

  useEffect(() => {
    if (shouldApplyEffect(data)) {
      data.forEach((i) => {
        i.imageUrl = <img src={i.imageUrl} width='50px' alt='logo' />;
      });
    }
    setSolutions(data);
  }, [data]);

  const goToSolutionInquiry = (data) => {
    history.push({
      pathname: 'solution-inquiry',
      state: {
        solutionName: data.solutionName,
        toEmail: data.email,
        orgName: data.organization,
      },
    });
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#E0663B',
      },
      secondary: {
        main: '#E0663B',
      },
    },
  });

  return (
    data && (
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title=''
          icons={tableIcons}
          columns={[
            {
              title: '',
              field: 'imageUrl',
              cellStyle: {
                width: '5%',
              },
              headerStyle: {
                width: '5%',
              },
            },
            { title: 'Organización', field: 'organization' },
            { title: 'Solución', field: 'solutionName' },
            { title: 'Categoría', field: 'category' },
            {
              title: 'Precio',
              field: 'price',
              type: 'currency',
              filterCellStyle: {
                textAlign: 'right',
              },
            },
          ]}
          data={solutions}
          detailPanel={(rowData) => {
            return (
              <>
                <h3 className='description-title'>Descripción del servicio</h3>
                <p className='description-body separate'>
                  {rowData.descriptionPitch}
                </p>
                <h3 className='description-title'>
                  Casos de éxito del servicio
                </h3>
                <p className='description-body separate'>
                  {rowData.descriptionSuccess}
                </p>
                <div className='inquiry-button separate'>
                  <CButton
                    text='Preguntar por este servicio'
                    color='orange'
                    onClick={() => goToSolutionInquiry(rowData)}
                  />
                </div>
              </>
            );
          }}
          actions={[
            {
              tooltip: 'Comparar soluciones',
              icon: () => <CompareArrowsIcon className='catalogo-icon' />,
              onClick: (e, selected) => {
                selected = selected.map((i) => {
                  i.tableData.checked = false;
                  return i;
                });
                setSolutions(selected);
              },
            },
            {
              tooltip: 'Refrescar',
              icon: () => <Refresh className='catalogo-icon' />,
              onClick: () => {
                setSolutions(data);
              },
              isFreeAction: true,
            },
          ]}
          localization={{
            toolbar: {
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar',
              nRowsSelected: '{0} selecciones',
            },
            body: {
              emptyDataSourceMessage: 'No hay información que mostrar',
              filterRow: {
                filterTooltip: 'Filtrar',
              },
            },
            pagination: {
              labelRowsSelect: 'filas',
              labelDisplayedRows: '{from}-{to} de {count}',
              firstTooltip: 'Primera página',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Siguiente página',
              lastTooltip: 'Última página',
            },
          }}
          options={{
            selection: true,
            showSelectAllCheckbox: false,
            emptyRowsWhenPaging: false,
            headerStyle: {
              fontWeight: 'bolder',
            },
          }}
        />
      </MuiThemeProvider>
    )
  );
};

export default CatalogList;
