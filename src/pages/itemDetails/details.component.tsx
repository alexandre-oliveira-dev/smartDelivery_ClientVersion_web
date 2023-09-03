import { useContext } from 'react';
import Header from '../components/headerComponent';
import { Card, Col, Row, Typography } from 'antd';
import {
  UrlParams,
  dataCompanyContext,
} from '../../contexts/dataCompany.context';
import '../responsiveApp.css';
import { createUseStyles } from 'react-jss';
import BtnAddAmountItem from '../main/components/btn-addAmount-item.component';
import { useHistory, useParams } from 'react-router-dom';
import { PriceFormater } from '../../helpers/priceFormater';
import ProductInEmphasisComponent from '../main/components/productsInEmphasis.component';
import { FiArrowLeft } from 'react-icons/fi';
import ButtonCart from '../common/buttonCartComponent';
import React from 'react';

const styles = createUseStyles({
  card: {
    width: '80%',
    marginTop: '2rem',
  },
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '2rem',
  },
});

export default function DetailsComponent() {
  const { dataCompany } = useContext(dataCompanyContext);
  const { card, container } = styles();
  const { id } = useParams<UrlParams>();
  const item = dataCompany?.Menu?.filter((item) => item.id === id)[0];
  const formater = new PriceFormater();
  const history = useHistory();

  return (
    <>
      <Header></Header>
      <div className={container}>
        <Row style={{ width: '80%', marginTop: '2rem' }}>
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
        </Row>
        <Card
          className={card}
          title={
            <Typography.Title style={{ textTransform: 'capitalize' }} level={3}>
              {item?.title}
            </Typography.Title>
          }
        >
          <Col>
            <Row>
              <Typography.Title level={5}>Descrição</Typography.Title>
            </Row>
            <Row>
              <Typography.Text style={{ color: 'silver' }}>
                {item?.description}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Title level={5}>Serve</Typography.Title>
            </Row>
            <Row>
              <Typography.Text style={{ color: 'silver' }}>
                {item?.weight}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Title level={5}>Peso/quantidade</Typography.Title>
            </Row>
            <Row>
              <Typography.Text style={{ color: 'silver' }}>
                {item?.weight}
              </Typography.Text>
            </Row>
          </Col>
          <Row
            style={{
              width: '100%',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Col>
              <Typography.Title style={{ color: 'green' }} level={2}>
                {formater.formater({ price: item?.price })}
              </Typography.Title>
            </Col>
            <Col style={{ position: 'absolute', right: '20px' }}>
              <BtnAddAmountItem item={item}></BtnAddAmountItem>
            </Col>
          </Row>
        </Card>
        <Row style={{ width: '80%', marginTop: '2rem' }}>
          <Typography.Title level={3}>Recomendados</Typography.Title>
        </Row>
        <Row style={{ width: '80%' }}>
          <ProductInEmphasisComponent></ProductInEmphasisComponent>
        </Row>
        <ButtonCart></ButtonCart>
      </div>
    </>
  );
}
