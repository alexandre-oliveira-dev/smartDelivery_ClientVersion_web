import React, {
  useState,
  createContext,
  useEffect,
  SetStateAction,
} from 'react';
import { useParams } from 'react-router-dom';
import { OrdersParams } from '../store/modules/cart.redux';
import { api } from '../service/api';
import { AsUserPropsTypes } from '../types';

interface PropsOfCompanys {
  dataCompany: AsUserPropsTypes;
  setLoad: React.Dispatch<SetStateAction<boolean>>;
  setCurrent: React.Dispatch<SetStateAction<any>>;
  setDataCart: React.Dispatch<SetStateAction<OrdersParams[]>>;
  load: boolean;
  current: any;
  dataCart: OrdersParams[];
}
interface UrlParams {
  name_company: string;
}

export const dataCompanyContext = createContext({} as PropsOfCompanys);

export function DataCompanyContextProvider({ children }: any) {
  const [dataCompany, setDataCompany] = useState<AsUserPropsTypes>(
    {} as AsUserPropsTypes
  );
  const [load, setLoad] = useState(false);
  const [dataCart, setDataCart] = useState<OrdersParams[]>([]);
  const { name_company } = useParams<UrlParams>();
  const [current, setCurrent] = useState<{
    item: string;
    index: number;
  }>({
    item: '',
    index: 0,
  });

  useEffect(() => {
    document.title = name_company;

    const localstorage: OrdersParams[] =
      JSON.parse(localStorage.getItem('@cart') as string) || [];
    setDataCart(localstorage);
    
    setLoad(true);
    async function LoadDataCompany() {
      await api.get(`/findbyname?name_company=${name_company}`).then((data) => {
        setDataCompany(data.data);
      });
    }

    Promise.all([LoadDataCompany()]).finally(() => {
      setLoad(false);
    });
  }, []);

  return (
    <dataCompanyContext.Provider
      value={{
        dataCompany,
        load,
        setLoad,
        dataCart,
        setDataCart,
        current,
        setCurrent,
      }}
    >
      {children}
    </dataCompanyContext.Provider>
  );
}
