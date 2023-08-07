import { Card, Col, Row, Skeleton, Typography } from 'antd';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
import BtnAddAmountItem from './btn-addAmount-item.component';
import { PriceFormater } from '../../../helpers/priceFormater';
import '../../responsiveApp.css';

const styles = createUseStyles({
  container: {
    width: '100%',
    gap: '40px',
    flexWrap: 'nowrap',
    '@media(max-width:500px)': {
      flexWrap: 'nowrap',
      width: '100vw',
      gap: '20px',
      padding: '0 20px 5px 20px',
      overflowX: 'auto !important',
      '&::-webkit-scrollbar ': {
        width: '100% !important',
        height: '2px !important',
        background: 'transparent !important',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#5b72f2 !important',
        borderRadius: '10px !important',
      },
    },
  },
  card: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

export default function ProductInEmphasisComponent() {
  const { container, card } = styles();
  const { dataCompany, load, dataCart } = useContext(dataCompanyContext);
  const format = new PriceFormater();

  if (!dataCompany) return <Skeleton></Skeleton>;
  return (
    <>
      {load ? (
        <Skeleton
          active
          paragraph={{
            rows: 3,
            className: card,
          }}
        ></Skeleton>
      ) : (
        <Row className={container}>
          {dataCompany.Menu?.slice(0, 4).map(
            (item: (typeof dataCompany.Menu)[0], index: number) => {
              return (
                <div key={index}>
                  <Card bordered className={card}>
                    <Col>
                      <Row style={{ minHeight: '60px' }}>
                        <Typography.Title level={4}>
                          {item.title}
                        </Typography.Title>
                      </Row>
                      <Row>
                        <Typography.Text style={{ color: 'silver' }}>
                          {item.amount}
                        </Typography.Text>
                      </Row>
                      <Row>
                        <Typography.Text style={{ color: 'silver' }}>
                          serve até {item.weight} pessoa(s)
                        </Typography.Text>
                      </Row>
                      <Row>
                        <Typography.Text
                          style={{
                            color: 'green',
                            fontWeight: '600',
                            fontSize: '20px',
                          }}
                        >
                          {!dataCart.map((item) => item.order.qtd)[
                            dataCart.findIndex((i) => i.id === item.id)
                          ]
                            ? format.formater({ price: item.price })
                            : format.formater({
                                price: dataCart.map((item) => item.amoutMoney)[
                                  dataCart.findIndex((i) => i.id === item.id)
                                ],
                              })}
                        </Typography.Text>
                      </Row>
                      <BtnAddAmountItem
                        companyId={dataCompany.id}
                        index={index}
                        item={item}
                      ></BtnAddAmountItem>
                      <Row
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <Typography.Link
                          href={`/${dataCompany?.name_company}/detalhes/${item.id}`}
                        >
                          ver detalhes
                        </Typography.Link>
                      </Row>
                    </Col>
                  </Card>
                </div>
              );
            }
          )}
        </Row>
      )}
    </>
  );
}
