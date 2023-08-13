import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DataCompanyContextProvider,
  UrlParams,
  dataCompanyContext,
} from '../../contexts/dataCompany.context';
import { api } from '../../service/api';
import { Provider } from 'react-redux';
import store from '../../store';
import Header from '../components/headerComponent';
import { Button, Card, Col, Divider, Row, Spin, Tag, Typography } from 'antd';
import { PriceFormater } from '../../helpers/priceFormater';
import dayjs from 'dayjs';
import { BiTimeFive } from 'react-icons/bi';

type OrderType = {
  address: string;
  amount: string;
  amoutMoney: string;
  client: { name: string; email: string; phone: string };
  clientsId: string;
  companiesId: string;
  created_at: string;
  id: string;
  order: [{ qtd: number; item: string }];
  paymentVoucher: null | string;
  payment_method: string;
  status: string;
};

export default function OrdersComponent() {
  const { id } = useParams<UrlParams>();
  const [data, setData] = useState<OrderType[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const { dataCompany } = useContext(dataCompanyContext);
  const status = data.map((status) => status.status);
  const format = new PriceFormater();

  useEffect(() => {
    async function loadOrder() {
      await api.get(`/findorders?id=${id}`).then((data) => {
        setData(data.data);
      });
    }
    loadOrder();
  }, [id, status]);

  async function handleUpdateStatus(id: string) {
    setLoad(true);

    await api
      .put(`/orders/${id}`, {
        status: 'finalizado',
      })
      .then(() => setLoad(false));
  }

  return (
    <>
      <Provider store={store}>
        <DataCompanyContextProvider>
          <Header></Header>
          {data?.map((item: OrderType) => {
            return (
              <>
                <Col
                  style={{
                    width: '100%',
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                    backgroundColor: '#f0f0f0',
                    alignItems: 'start',
                    paddingTop: '2rem',
                  }}
                >
                  <Typography.Title level={2}>Meu Pedido</Typography.Title>
                  <Row style={{ width: '90%' }}>
                    <Card
                      title={
                        <Col
                          style={{
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                          }}
                        >
                          <Typography.Title level={4}>
                            Detalhes
                          </Typography.Title>
                          <Row
                            style={{
                              alignItems: 'center',
                              gap: '10px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <Typography.Text style={{ color: 'silver' }}>
                                Data do pedido:
                              </Typography.Text>
                            </div>
                            <Row style={{ gap: '10px' }}>
                              <div>
                                <Typography.Text>
                                  {dayjs(item.created_at).format('DD/MM/YYYY')}{' '}
                                </Typography.Text>
                              </div>
                              as
                              <div>
                                <Typography.Text>
                                  {dayjs(item.created_at).get('hour')}:
                                  {dayjs(item.created_at).get('minutes')}
                                  <BiTimeFive></BiTimeFive>
                                </Typography.Text>
                              </div>
                            </Row>
                          </Row>
                          <Row
                            style={{
                              alignItems: 'center',
                              gap: '10px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <Typography.Text style={{ color: 'silver' }}>
                                Nome:
                              </Typography.Text>
                            </div>
                            <div>
                              <Typography.Text>
                                {item?.client?.name}
                              </Typography.Text>
                            </div>
                          </Row>
                          <Row
                            style={{
                              alignItems: 'center',
                              gap: '10px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <Typography.Text style={{ color: 'silver' }}>
                                Endereço:
                              </Typography.Text>
                            </div>
                            <div>
                              <Typography.Text>{item?.address}</Typography.Text>
                            </div>
                          </Row>
                          <Row
                            style={{
                              alignItems: 'center',
                              gap: '10px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <Typography.Text style={{ color: 'silver' }}>
                                Metodo de pagamento:
                              </Typography.Text>
                            </div>
                            <div>
                              <Tag color="green"> {item?.payment_method}</Tag>
                            </div>
                          </Row>
                          <Row
                            style={{
                              alignItems: 'center',
                              gap: '10px',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <Typography.Text style={{ color: 'silver' }}>
                                Status:
                              </Typography.Text>
                            </div>
                            <div>
                              {item.status === 'preparando' ? (
                                <Tag color="green">
                                  {' '}
                                  {item?.status} <Spin size="small"></Spin>
                                </Tag>
                              ) : item.status === 'finalizado' ? (
                                <Tag color="purple">{item?.status}</Tag>
                              ) : item.status === 'cancelado' ? (
                                <Tag color="red">{item?.status}</Tag>
                              ) : (
                                item.status === 'entrega' && (
                                  <Tag color="blue">
                                    Pedido em rota de entrga{' '}
                                    <Spin size="small"></Spin>
                                  </Tag>
                                )
                              )}
                            </div>
                          </Row>
                        </Col>
                      }
                      style={{ width: '100%' }}
                    >
                      <Col>
                        {item.order.map((order) => {
                          return (
                            <>
                              <Row style={{ justifyContent: 'space-between' }}>
                                <Typography.Text
                                  style={{ color: 'silver', fontSize: '20px' }}
                                >
                                  {order?.qtd}x{' '}
                                </Typography.Text>
                                <Typography.Text style={{ fontWeight: '600' }}>
                                  {order?.item}
                                </Typography.Text>
                              </Row>
                              <Divider></Divider>
                            </>
                          );
                        })}
                        <Row
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography.Title level={3}>Total:</Typography.Title>
                          <Typography.Title level={2}>
                            {format.formater({ price: item?.amoutMoney })}
                          </Typography.Title>
                        </Row>
                        {status[0] !== 'finalizado' && (
                          <Button
                            onClick={() => handleUpdateStatus(item.id)}
                            style={{
                              width: '200px',
                              background: !dataCompany?.backgroundColor
                                ? '#5B72F2'
                                : dataCompany?.backgroundColor,
                              color: '#fff',
                            }}
                          >
                            {load ? <Spin></Spin> : ' Recebi meu pedido'}
                          </Button>
                        )}
                      </Col>
                    </Card>
                  </Row>
                </Col>
              </>
            );
          })}
        </DataCompanyContextProvider>
      </Provider>
    </>
  );
}
