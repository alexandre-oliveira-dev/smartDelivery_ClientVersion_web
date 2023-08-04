import React, { useContext } from 'react';
import { dataCompanyContext } from '../../contexts/dataCompany.context';
import { createUseStyles } from 'react-jss';
import { Row, Typography } from 'antd';
import { FiShoppingCart } from 'react-icons/fi';

const style = createUseStyles({
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

export default function ButtonCart() {
  const { dataCompany, dataCart } = useContext(dataCompanyContext);
  const { buttonCart } = style();

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
}
