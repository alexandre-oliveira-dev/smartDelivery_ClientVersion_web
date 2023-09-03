import { DataCompanyContextProvider } from '../../contexts/dataCompany.context';
import DetailsComponent from './details.component';
import { Provider } from 'react-redux';
import store from '../../store';
import React from 'react';

export default function DetailsPage() {
  return (
    <>
      <Provider store={store}>
        <DataCompanyContextProvider>
          <DetailsComponent></DetailsComponent>
        </DataCompanyContextProvider>
      </Provider>
    </>
  );
}
