import { Col, Input, Row, Select, Skeleton, Typography } from 'antd';
import { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
import { FiSearch } from 'react-icons/fi';
import '../../responsiveApp.css';
import React from 'react';

const styles = createUseStyles({
  container: {
    width: '100%',
    height: '50px',
    backgroundColor: '#fff',
    padding: '0 0 0 100px',
    alignItems: 'center',
    gap: '30px',
    flexWrap: 'nowrap',
    '@media(max-width:500px)': {
      padding: '0',
      justifyContent: 'center',
      gap: '10px',
    },
  },
  selectstyles: {
    width: '200px',
    '@media(max-width:500px)': {
      width: '100px',
    },
  },
});

export default function FilterComponent() {
  const { container, selectstyles } = styles();
  const { dataCompany, load } = useContext(dataCompanyContext);

  const categorias = dataCompany?.Menu?.filter((item) => item);
  return (
    <>
      {load ? (
        <Skeleton
          active
          paragraph={{
            rows: 0,
            width: '100%',
          }}
        ></Skeleton>
      ) : (
        <Row className={container}>
          <Col>
            <Typography.Title className="responsivefiltrarPorText" level={4}>
              Filtrar por:
            </Typography.Title>
          </Col>
          <Col>
            <Row style={{ gap: '20px', flexWrap: 'nowrap' }}>
              <Col>
                <Select placeholder="Categoria" className={selectstyles}>
                  {categorias?.map(
                    (item: { categoria: string }, index: number) => {
                      return (
                        <option key={index} value={item.categoria}>
                          {item.categoria}
                        </option>
                      );
                    }
                  )}
                </Select>
              </Col>
              <Col>
                <Select placeholder="Preço" className={selectstyles}>
                  <option value="maior">Maior preço</option>
                  <option value="menor">Menor preço</option>
                </Select>
              </Col>
              <Col>
                <Input
                  className="responsiveinputfilter"
                  prefix={<FiSearch color="silver"></FiSearch>}
                  placeholder="Pesquisar"
                ></Input>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}
