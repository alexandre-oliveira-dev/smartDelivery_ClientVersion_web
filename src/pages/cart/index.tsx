import CartComponent from './cart.component';
import { DataCompanyContextProvider } from '../../contexts/dataCompany.context';
import Header from '../components/headerComponent';
import { Provider } from 'react-redux';
import store from '../../store';

export default function Cart() {
  return (
    <>
      <Provider store={store}>
        <DataCompanyContextProvider>
          <Header></Header>
          <CartComponent></CartComponent>
        </DataCompanyContextProvider>
      </Provider>
    </>
  );
}
