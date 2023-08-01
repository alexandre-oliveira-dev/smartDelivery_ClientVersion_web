import { Button, Card, Col, Form, Input, Row, Select, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useContext, useState } from 'react';
import { dataCompanyContext } from '../../contexts/dataCompany.context';
import PixInformations from './pixInformations.component';

export default function FormPaymentComponent() {
  const { dataCompany } = useContext(dataCompanyContext);
  const [form] = Form.useForm();
  const [paymentType, setPaymentType] = useState('');
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
            <Button>Finalizar</Button>
          </Row>
        </Form>
      </Card>
    </>
  );
}
