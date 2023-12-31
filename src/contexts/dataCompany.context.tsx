import React, {
  useState,
  createContext,
  useEffect,
  SetStateAction,
} from 'react';
import { useParams } from 'react-router-dom';
import { OrdersParams } from '../store/modules/cart.redux';
import { api } from '../../../../src/services/api';
import { AsUserPropsTypes } from '../types';

interface PropsOfCompanys {
  dataCompany: AsUserPropsTypes;
  setLoad: React.Dispatch<SetStateAction<boolean>>;
  setTotalMoney: React.Dispatch<SetStateAction<string>>;
  setCurrent: React.Dispatch<SetStateAction<any>>;
  setIsClosed: React.Dispatch<SetStateAction<boolean>>;
  setDataCart: React.Dispatch<SetStateAction<OrdersParams[]>>;
  load: boolean;
  isClosed: boolean;
  totalMoney: string;
  current: any;
  dataCart: OrdersParams[];
}
export interface UrlParams {
  name_company: string;
  id: string;
}

export const dataCompanyContext = createContext({} as PropsOfCompanys);

export function DataCompanyContextProvider({ children }: any) {
  const [dataCompany, setDataCompany] = useState<AsUserPropsTypes>(
    {} as AsUserPropsTypes
  );
  const [load, setLoad] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [dataCart, setDataCart] = useState<OrdersParams[]>([]);
  const { name_company } = useParams<UrlParams>();
  const [totalMoney, setTotalMoney] = useState<string>('0');
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
  }, [name_company]);

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
        setTotalMoney,
        totalMoney,
        isClosed,
        setIsClosed,
      }}
    >
      {children}
    </dataCompanyContext.Provider>
  );
}
