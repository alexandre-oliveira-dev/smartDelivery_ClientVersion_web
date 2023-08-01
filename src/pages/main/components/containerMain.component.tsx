import { Divider, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
import ProductInEmphasisComponent from './productsInEmphasis.component';
import TabCategoria from './tabs-categorias';
import { FiShoppingCart } from 'react-icons/fi';

const styles = createUseStyles({
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonCart: {
    position: 'fixed',
    bottom: '50px',
    width: '200px',
    height: '40px',
    color: '#fff',
    fontSize: '20px',
    borderRadius: '10px',
    gap: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s ease',
    '&:hover': {
      padding: '10px',
    },
  },
});

export default function ContainerMain() {
  const { container, buttonCart } = styles();
  const { dataCompany, dataCart } = useContext(dataCompanyContext);
  const ButtonCart = () => {
    return (
      <>
        <button
          onClick={() =>
            (window.location.href = `/${dataCompany?.name_company}/meu carrinho`)
          }
          className={buttonCart}
          style={{
            background: !dataCompany.backgroundColor
              ? '#5b72f2'
              : dataCompany.backgroundColor,
          }}
        >
          <Typography.Text style={{ color: '#fff', fontSize: '20px' }}>
            Carrinho
          </Typography.Text>

          <Row
            style={{
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <FiShoppingCart size={20} color="#fff"></FiShoppingCart>
            <Typography.Text style={{ color: '#fff', fontSize: '15px' }}>
              {dataCart.length}
            </Typography.Text>
          </Row>
        </button>
      </>
    );
  };

  return (
    <>
      <Row className={container}>
        <Row
          style={{
            margin: '2rem 0 2rem 0',
            height: 'min-content',
          }}
        >
          <Typography.Title
            level={2}
            style={{ color: dataCompany?.backgroundColor }}
          >
            Em destaque
          </Typography.Title>
        </Row>
        <Row>
          <ProductInEmphasisComponent></ProductInEmphasisComponent>
        </Row>
        <Row style={{ width: '80%' }}>
          <Divider dashed></Divider>
        </Row>
        <Row style={{ width: '80%', marginBottom: '30px' }}>
          <TabCategoria></TabCategoria>
        </Row>
        <ButtonCart></ButtonCart>
      </Row>
    </>
  );
}
