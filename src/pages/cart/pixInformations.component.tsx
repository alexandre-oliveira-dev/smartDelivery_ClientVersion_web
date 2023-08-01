import { Button, Col, Input, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { dataCompanyContext } from '../../contexts/dataCompany.context';
import { MdPix } from 'react-icons/md';
import { FiKey } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function PixInformations() {
  const { dataCompany } = useContext(dataCompanyContext);
  return (
    <>
      <Col>
        <Row>
          <Typography.Title level={4}>
            Chave Pix {dataCompany?.name_company}
          </Typography.Title>
        </Row>
        <Row style={{ width: '100%', gap: '30px' }}>
          <Col>
            <Row>
              <MdPix></MdPix>
              <Typography.Title level={5}>
                Tipo: {dataCompany?.pixType}
              </Typography.Title>
            </Row>
          </Col>
          <Col>
            <Row>
              <FiKey></FiKey>
              <Row>
                <Typography.Title level={5} copyable>
                  {dataCompany?.pixKey}
                </Typography.Title>
              </Row>
            </Row>
          </Col>
          <Col>
            <Row style={{ flexWrap: 'nowrap', gap: '20px' }}>
              <Input type="file" placeholder="Anexar comprovante"></Input>
              Ou
              <Button>
                Enviar <IoLogoWhatsapp></IoLogoWhatsapp>
              </Button>
            </Row>
          </Col>
        </Row>
        <Col style={{ width: '100%' ,marginTop:"20px"}}>
          <Typography.Title level={5}>Atenção</Typography.Title>
          <Typography.Text>
            O pedido só será realizado mediante o envio ou anexo do comprovante
            !
          </Typography.Text>
        </Col>
      </Col>
    </>
  );
}
