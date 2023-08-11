export interface AsUserPropsTypes {
  backgroundColor: string;
  companyId: string;
  email: string;
  id: string;
  imgProfile: string;
  name_company: string;
  Menu: [
    {
      id: string;
      title: string;
      categoria: string;
      price: string;
      weight: string;
      description: string;
      amount: string;
    }
  ];
  payments_methods?: string[];
  phone?: string;
  paymentVouncher?: string;
  pixType?: string;
  pixKey?: string;
  daysOfWeeks?: [
    {
      day: {
        d: number;
        name: string;
      };
      open: string;
      close: string;
    }
  ];
}
