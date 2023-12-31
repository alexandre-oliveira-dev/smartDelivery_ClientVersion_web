/* eslint-disable @typescript-eslint/no-unused-vars */
import { Divider, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
import ProductInEmphasisComponent from './productsInEmphasis.component';
import TabCategoria from './tabs-categorias';
import '../../responsiveApp.css';
import ButtonCart from '../../common/buttonCartComponent';

const styles = createUseStyles({
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function ContainerMain() {
  const { container } = styles();
  const { dataCompany, isClosed } = useContext(dataCompanyContext);

  return (
    <>
      {isClosed && (
        <span
          style={{
            width: '100%',
            height: '100vh',
            background: '#00000041',
            backdropFilter: 'blur(10px)',
            position: 'absolute',
            zIndex: '10000',
          }}
        ></span>
      )}
      <Row className={container}>
        <Row
          className="responsivetitleEmDestaque"
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
        <Row
          className="responsivetabcategorias"
          style={{ width: '80%', marginBottom: '30px' }}
        >
          <TabCategoria></TabCategoria>
        </Row>
        <ButtonCart></ButtonCart>
      </Row>
    </>
  );
}
