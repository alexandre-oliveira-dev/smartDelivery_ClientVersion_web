import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useContext, useState } from 'react';
import { dataCompanyContext } from '../../contexts/dataCompany.context';
import PixInformations from './pixInformations.component';
import { api } from '../../service/api';
import { toast } from 'react-toastify';

export default function FormPaymentComponent() {
  const { dataCompany, dataCart, totalMoney, isClosed } =
    useContext(dataCompanyContext);
  const [form] = Form.useForm();
  const [paymentType, setPaymentType] = useState('');
  const [load, setLoad] = useState(false);

  async function handleCreateOrder() {
    const fieldValues: {
      name: string;
      phone: string;
      email: string;
      address: string;
      paymentMethod: string;
    } = form.getFieldsValue();

    if (
      !fieldValues?.name ||
      !fieldValues?.email ||
      !fieldValues?.phone ||
      !fieldValues?.address ||
      !fieldValues?.paymentMethod
    ) {
      toast.info('Preencha todos os campos!');
      setLoad(false);
      return;
    }
    const hasPaymentVouncher: boolean =
      JSON.parse(localStorage.getItem('@@@') as any) || false;

    if (
      fieldValues?.paymentMethod === 'pix' ||
      (fieldValues?.paymentMethod === 'Pix' && !hasPaymentVouncher)
    ) {
      toast.info('Envie o comprovante para realizar o pedido!');
      return;
    }
    setLoad(true);
    await api
      .post('/clients', {
        name: fieldValues?.name,
        email: fieldValues?.email,
        address: fieldValues?.address,
        phone: fieldValues?.phone,
      })
      .then(async (response) => {
        await api
          .post('orders', {
            payment_method: fieldValues?.paymentMethod,
            companiesId: dataCompany?.id,
            clientsId: response?.data.id,
            address: fieldValues?.address,
            amoutMoney: totalMoney,
            status: 'preparando',
            order: dataCart.map((item) => item.order),
            paymentVoucher: '',
            amount: String(dataCart.length),
          })
          .then((data) => {
            setLoad(false);
            toast.success('Pedido realizado com sucesso!');
            localStorage.removeItem('@cart');
            localStorage.removeItem('@@@');
            localStorage.setItem(
              '@OrderId',
              JSON.stringify(String(data.data.id))
            );
            setTimeout(() => {
              window.location.href = `/${dataCompany?.name_company}/meusPedidos/${data.data.id}`;
            }, 2000);
          });
      })
      .catch(() => {
        toast.error('Ops, tente novamente! ou mande mensagem para nos!');
        setLoad(false);
      });
  }

  return (
    <>
      <Card bodyStyle={{ width: '100%' }}>
        <Form form={form}>
          <Row style={{ width: '100%', gap: '10px' }}>
            <FormItem style={{ flex: 1 }} name={'name'}>
              <Input
                style={{ background: '#F0F0F0', height: '40px' }}
                placeholder="Nome completo"
              ></Input>
            </FormItem>
            <FormItem style={{ flex: 1 }} name={'phone'}>
              <Input
                style={{ background: '#F0F0F0', height: '40px' }}
                placeholder="Telefone"
              ></Input>
            </FormItem>
          </Row>
          <Row style={{ width: '100%', gap: '10px' }}>
            <FormItem style={{ flex: 1 }} name={'email'}>
              <Input
                style={{ background: '#F0F0F0', height: '40px' }}
                placeholder="E-mail"
              ></Input>
            </FormItem>
          </Row>
          <Row style={{ width: '100%', gap: '10px' }}>
            <FormItem style={{ flex: 1 }} name={'address'}>
              <Input
                style={{ background: '#F0F0F0', height: '40px' }}
                placeholder="Endereço completo"
              ></Input>
            </FormItem>
          </Row>
          <Row style={{ width: '100%', gap: '10px' }}>
            <Typography.Title level={4}>Forma de pagamento</Typography.Title>
          </Row>
          <Row style={{ width: '100%', gap: '10px' }}>
            <Col style={{ width: '100%', gap: '10px' }}>
              <FormItem style={{ flex: 1 }} name={'paymentMethod'}>
                <Select
                  style={{ height: '40px' }}
                  placeholder="Selecione"
                  onChange={(e) => setPaymentType(e)}
                >
                  {dataCompany?.payments_methods?.map((item) => {
                    return (
                      <>
                        <Select.Option value={item}>{item}</Select.Option>
                      </>
                    );
                  })}
                </Select>
              </FormItem>
              {paymentType === 'pix' || paymentType === 'Pix' ? (
                <PixInformations></PixInformations>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Row>
            <Button disabled={isClosed} onClick={handleCreateOrder}>
              {load ? <Spin></Spin> : 'Finalizar'}
            </Button>
          </Row>
        </Form>
      </Card>
    </>
  );
}
