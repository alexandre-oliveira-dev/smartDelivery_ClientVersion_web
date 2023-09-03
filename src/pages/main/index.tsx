import MainPageComponent from './components/mainPageComoponent';
import { DataCompanyContextProvider } from '../../contexts/dataCompany.context';
import store from '../../store';
import { Provider } from 'react-redux';
import React from 'react';

export default function MainPageComponentIndex() {
  return (
    <>
      <Provider store={store}>
        <DataCompanyContextProvider>
          <MainPageComponent></MainPageComponent>
        </DataCompanyContextProvider>
      </Provider>
    </>
  );
}
