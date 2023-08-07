import React, { useContext } from 'react';
import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { dataCompanyContext } from '../../contexts/dataCompany.context';
import { createUseStyles } from 'react-jss';
import BtnAddAmountItem from '../main/components/btn-addAmount-item.component';
import { PriceFormater } from '../../helpers/priceFormater';
import { FiArrowLeft, FiShoppingCart, FiTrash } from 'react-icons/fi';
import FormPaymentComponent from './formPayment.component';
import { useHistory } from 'react-router-dom';
import '../responsiveApp.css'

const styles = createUseStyles({
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '2rem',
  },
  contentItems: {
    width: '90%',
  },
  card: {
    width: '100% !important',
    marginTop: '10px',
    transition: '0.3s ease',
    '@media(max-width:500px)': {
      
    }
  },
  contentCard: {
    width: '100% !important',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    '@media(max-width:500px)': {
      height: "auto",
      flexDirection: "column",
      alignItems: "start",
      gap:"10px"
    }
  },
  cardTotal: {
    width: '100% !important',
    marginTop: '20px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
  },
});

export default function CartComponent() {
  const { dataCompany, dataCart, setTotalMoney } =
    useContext(dataCompanyContext);
  const { container, contentItems, card, contentCard, cardTotal } = styles();
  const format = new PriceFormater();
  const history = useHistory();

  const valores = dataCart.map((item) => item.amoutMoney);
  let soma = 0;
  for (let i = 0; i < valores.length; i++) {
    soma += valores[i];
  }
  const total = soma.toString();
  setTotalMoney(total);

  function handleDeleteItem(id: string) {
    const arrayFilter = dataCart.filter((item) => item.id !== id);
    localStorage.setItem('@cart', JSON.stringify(arrayFilter));
    window.location.reload();
  }

  return (
    <>
      <Row className={container}>
        <Row
          className="responsiveboxtitlecart"
          style={{
            margin: '2rem 0 2rem 0',
            height: 'min-content',
            alignItems: 'center',
            gap: '10px',
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <button
            className="responsivebtnback"
            onClick={() => history.goBack()}
            style={{
              position: 'absolute',
              left: 70,
            }}
          >
            <FiArrowLeft
              color={dataCompany?.backgroundColor}
              size={30}
            ></FiArrowLeft>
          </button>
          <Typography.Title
            className="responsivetextmeucarrinho"
            level={2}
            style={{ color: dataCompany?.backgroundColor }}
          >
            Meu Carrinho
          </Typography.Title>
          <FiShoppingCart
            size={25}
            color={dataCompany?.backgroundColor}
          ></FiShoppingCart>
        </Row>
        <Col className={contentItems}>
          <Row>
            <Typography.Title level={3}>Itens</Typography.Title>
          </Row>
          <Col>
            {dataCart.length === 0 ? (
              <Typography.Title level={2}>Carrinho vazio! </Typography.Title>
            ) : (
              ''
            )}
            {dataCart.map((item, index) => {
              return (
                <>
                  <Row
                    key={item.id}
                    style={{ position: 'relative', alignItems: 'center' }}
                  >
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
                            level={5}
                            style={{ textTransform: 'capitalize' }}
                          >
                            {item.order?.item}
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
                            <Typography.Text style={{ color: '#121212' }}>
                              {' '}
                              Descrição:{' '}
                            </Typography.Text>
                            <Typography.Text style={{ color: 'silver' }}>
                              {item.itemDetails?.item?.description}
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
                            item={item.itemDetails.item}
                          ></BtnAddAmountItem>
                        </Col>
                        <Row
                          style={{ flex: '1', gap: '30px' }}
                          className="responsiveboxAmountvalue"
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
                          {
                            <Col
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <Typography.Title
                                level={5}
                                style={{ color: '#04B400' }}
                              >
                                {!dataCart.map((item) => item.order?.qtd)[
                                  dataCart.findIndex((i) => i.id === item.id)
                                ]
                                  ? format.formater({
                                      price: item.itemDetails.item?.price,
                                    })
                                  : format.formater({
                                      price: dataCart.map(
                                        (item) => item.amoutMoney
                                      )[
                                        dataCart.findIndex(
                                          (i) => i.id === item.id
                                        )
                                      ],
                                    })}
                              </Typography.Title>
                            </Col>
                          }
                        </Row>
                      </Row>
                    </Card>
                    <Button
                      onClick={() => handleDeleteItem(item.id)}
                      type="text"
                      style={{
                        position: 'absolute',
                        right: 50,
                      }}
                    >
                      <FiTrash color="red"></FiTrash>
                    </Button>
                  </Row>
                </>
              );
            })}
          </Col>
          <Card bodyStyle={{ width: '100%' }} className={cardTotal}>
            <Row
              style={{
                width: '100% !important',
                justifyContent: 'space-between',
              }}
            >
              <Col>
                <Typography.Title level={4}>Total:</Typography.Title>
              </Col>
              <Col>
                <Typography.Text
                  style={{
                    color: 'green',
                    fontSize: '25px',
                    fontWeight: '600',
                  }}
                >
                  {' '}
                  {format.formater({
                    price: total,
                  })}
                </Typography.Text>
              </Col>
            </Row>
          </Card>
          <Divider dashed></Divider>
          <Row
            style={{
              margin: '2rem 0 2rem 0',
              height: 'min-content',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Typography.Title
              className="responsivetitlecartpage"
              level={2}
              style={{ color: dataCompany?.backgroundColor }}
            >
              Dados para Pagamento e entrega
            </Typography.Title>
          </Row>
          <FormPaymentComponent></FormPaymentComponent>
        </Col>
      </Row>
    </>
  );
}
