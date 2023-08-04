import React, { useContext } from 'react';
import { dataCompanyContext } from '../../../../contexts/dataCompany.context';
import { createUseStyles } from 'react-jss';
import { Col, Row, Typography } from 'antd';
import '../../../responsiveApp.css';

const style = createUseStyles({
  tab: {
    width: '100%',
    height: '60px',
    background: '#fff',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '10px 0 10px 0',
    '@media(max-width:500px)': {
      width: '100vw',
      overflowX: 'auto',
      padding: '0 20px 0 20px',
      justifyContent: 'flex-start',
      gap: '10px',
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
  btntab: {
    background: 'transparent',
    border: '0',
    fontWeight: '600',
    fontSize: '17px',
    boxShadow: 'none',
    color: '#121212',
    textTransform: 'capitalize',
    padding: '5px',
    transition: '0.3s ease',
    '&:hover': {
      background: '#F0F0F0',
      padding: '5px',
      borderRadius: '4px',
    },
    '@media(max-width:500px)': {
      textAlign: 'center',
      width: 'max-content',
    },
  },
  responsiveColTab: {
    '@media(max-width:500px)': {
      flex: 1,
    },
  },
});

export default function Tab() {
  const { dataCompany, current, setCurrent } = useContext(dataCompanyContext);
  const { tab, btntab, responsiveColTab } = style();
  const cat = dataCompany?.Menu?.map(
    (item: { categoria: string }) => item.categoria
  ) as [];

  return (
    <>
      <Row className={tab}>
        {cat
          ?.filter((item, index) => {
            return cat.indexOf(item) === index;
          })
          .map((item: any, index) => {
            return (
              <>
                <Col key={index} className={responsiveColTab}>
                  <button
                    className={btntab}
                    onClick={() => {
                      setCurrent({ item: item, index: index });
                    }}
                  >
                    <Typography.Text>{item}</Typography.Text>
                  </button>
                  <span
                    style={
                      current.index === index
                        ? {
                            background: !dataCompany.backgroundColor
                              ? '#5b72f2'
                              : dataCompany.backgroundColor,
                            height: '2px',
                            display: 'grid',
                            placeItems: 'center',
                            transition: '0.3s ease',
                          }
                        : {
                            color: !dataCompany.backgroundColor
                              ? '#5b72f2'
                              : dataCompany.backgroundColor,
                          }
                    }
                  ></span>
                </Col>
              </>
            );
          })}
      </Row>
    </>
  );
}
