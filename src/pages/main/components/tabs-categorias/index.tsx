import { Card, Col, Row, Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { dataCompanyContext } from '../../../../contexts/dataCompany.context';
import { createUseStyles } from 'react-jss';
import BtnAddAmountItem from '../btn-addAmount-item.component';
import Tab from './tab.component';
import { PriceFormater } from '../../../../helpers/priceFormater';
import '../../../responsiveApp.css';

const style = createUseStyles({
  card: {
    width: '100%',
    marginTop: '10px',
    transition: '0.3s ease',
  },
  contentCard: {
    width: '100% !important',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    '@media(max-width:500px)': {
      height: 'auto',
    },
  },
});

export default function TabCategoria() {
  const { dataCompany, dataCart, current, setCurrent } =
    useContext(dataCompanyContext);
  const { card, contentCard } = style();

  const format = new PriceFormater();

  useMemo(() => {
    setCurrent({
      index: 0,
      item: dataCompany?.Menu?.map((item) => item.categoria)[0],
    });
  }, [dataCompany?.Menu, setCurrent]);

  return (
    <>
      <Tab></Tab>
      <Row
        style={{ width: '100%', alignItems: 'center', transition: '0.3s ease' }}
      >
        {dataCompany?.Menu?.filter((item) => {
          return item.categoria === current.item;
        }).map((item, index) => {
          return (
            <div style={{ width: '100%' }} key={index}>
              <Card className={card}>
                <Row className={contentCard}>
                  <Col
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography.Title
                      className="responsivetitleitemtab"
                      level={5}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {item.title}
                    </Typography.Title>
                  </Col>
                  <Col
                    className="responsiveremovedescription"
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Row style={{ gap: 10 }}>
                      <Typography.Text
                        style={{ color: '#121212' }}
                        className="responsivedescriptiontext"
                      >
                        {' '}
                        Acompanhamentos:{' '}
                      </Typography.Text>
                      <Typography.Text
                        style={{ color: 'silver' }}
                        className="responsivedescriptiontext"
                      >
                        {item.description}
                      </Typography.Text>
                    </Row>
                  </Col>
                  <Col
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <BtnAddAmountItem
                      companyId={dataCompany.id}
                      index={index}
                      item={item}
                    ></BtnAddAmountItem>
                  </Col>
                  <Row
                    style={{ flex: '1', gap: '30px' }}
                    className="responsivepriceandDetailsbtn"
                  >
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography.Link
                        style={{
                          color: dataCompany.backgroundColor,
                          textDecoration: 'underline',
                        }}
                        href={`/${dataCompany?.name_company}/detalhes/${item.id}`}
                      >
                        Detalhes
                      </Typography.Link>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography.Title level={5} style={{ color: '#04B400' }}>
                        {!dataCart.map((item) => item.order.qtd)[
                          dataCart.findIndex((i) => i.id === item.id)
                        ]
                          ? format.formater({ price: item.price })
                          : format.formater({
                              price: dataCart.map((item) => item.amoutMoney)[
                                dataCart.findIndex((i) => i.id === item.id)
                              ],
                            })}
                      </Typography.Title>
                    </Col>
                  </Row>
                </Row>
              </Card>
            </div>
          );
        })}
      </Row>
    </>
  );
}
