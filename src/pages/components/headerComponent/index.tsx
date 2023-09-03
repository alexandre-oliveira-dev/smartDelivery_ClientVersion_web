import { useContext, useState } from 'react';
import { Button, Col, Image, Row, Skeleton, Tag, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import { FiHelpCircle, FiMenu } from 'react-icons/fi';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
import '../../responsiveApp.css';
import './pulseAnimation.css';
import dayjs from 'dayjs';
import React from 'react';

const styles = createUseStyles({
  header: {
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 50px 0 50px',
  },
  logo: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
  containerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  hiddenNamecompany: {
    '@media(max-width:500px)': {
      display: 'none',
    },
  },
  responsiveboxmeuspedidosbtn: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: 'max-content',
    '@media(max-width:500px)': {
      display: 'none',
    },
  },
  navBarMenuMobile: {
    display: 'none',
    '@media(max-width:500px)': {
      display: 'block',
      width: '90%',
      height: '100vh',
      position: 'fixed',
      zIndex: '50000',
      boxShadow: '5px 5px 10px #000',
    },
  },
  btnMenu: {
    display: 'none',
    '@media(max-width:500px)': {
      display: 'flex',
      width: '30px',
      height: '30px',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      border: 0,
      background: 'transparent',
    },
  },
});
export default function Header() {
  const {
    header,
    logo,
    containerHeader,
    hiddenNamecompany,
    responsiveboxmeuspedidosbtn,
    navBarMenuMobile,
    btnMenu,
  } = styles();
  const { dataCompany, load, setIsClosed } = useContext(dataCompanyContext);
  const OrderId = JSON.parse(localStorage.getItem('@OrderId') as any);
  const toDay = dayjs().get('day');
  const [isOpenNavBarMenu, setIsOpenNavBarMenu] = useState(false);

  const indexToday = dataCompany?.daysOfWeeks?.findIndex(
    (item) => item.day.d === toDay
  ) as number;

  const openHors = dataCompany?.daysOfWeeks?.[indexToday]?.open?.slice(
    0,
    2
  ) as string;
  const closeHors = dataCompany?.daysOfWeeks?.[indexToday]?.close?.slice(
    0,
    2
  ) as string;

  const MenuMobile = () => {
    return (
      <>
        <nav
          className={navBarMenuMobile}
          style={{
            background: !dataCompany?.backgroundColor
              ? '#5B72F2'
              : dataCompany?.backgroundColor,
          }}
        >
          <Row
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              padding: '20px 20px 0 0',
            }}
          >
            <button
              style={{
                background: 'transparent',
                color: '#fff',
                fontSize: '20px',
              }}
              onClick={() => setIsOpenNavBarMenu(false)}
            >
              X
            </button>
          </Row>
          <Row
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Col
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                preview={false}
                className={logo}
                src={
                  dataCompany?.imgProfile
                    ? dataCompany?.imgProfile
                    : 'https://via.placeholder.com/150'
                }
                alt=""
              ></Image>
              <Typography.Title
                onClick={() =>
                  (window.location.href = `/${dataCompany?.name_company}`)
                }
                style={{ color: '#fff', cursor: 'pointer' }}
                level={3}
              >
                {dataCompany?.name_company}
              </Typography.Title>
            </Col>
          </Row>
          <Row
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
            }}
          >
            <Col>
              <Button
                style={{ color: '#fff', fontSize: '20px' }}
                type="link"
                href={`/${dataCompany?.name_company}`}
              >
                Meus Pedidos
              </Button>
              <Button
                style={{ color: '#fff', fontSize: '20px' }}
                type="link"
                href=""
              >
                Ajuda
              </Button>
            </Col>
          </Row>
        </nav>
      </>
    );
  };

  const MenuMobileBtn = () => {
    return (
      <>
        <Button
          type="default"
          className={btnMenu}
          onClick={() => setIsOpenNavBarMenu(true)}
        >
          <FiMenu color="#fff" size={20}></FiMenu>
        </Button>
      </>
    );
  };
  const currentHors = dayjs(new Date()).get('hour');
  const currentMin = dayjs(new Date()).get('minute');

  if (
    currentHors >= parseInt(closeHors) ||
    (currentHors < parseInt(openHors) && currentMin > 0)
  ) {
    setIsClosed(true);
  }
  const message = `Olá, preciso de ajuda!`;

  return (
    <>
      {isOpenNavBarMenu === true && <MenuMobile></MenuMobile>}

      <header
        style={{
          background: !dataCompany?.backgroundColor
            ? '#5B72F2'
            : dataCompany?.backgroundColor,
        }}
        className={header}
      >
        {load ? (
          <Skeleton
            active
            avatar
            paragraph={{
              rows: 0,
              width: '100%',
            }}
          ></Skeleton>
        ) : (
          <Row className={containerHeader}>
            <Col style={{ width: '100%' }}>
              <Row
                style={{
                  alignItems: 'center',
                  gap: '20px',
                  height: '100%',
                  width: '100%',
                  flexWrap: 'nowrap',
                }}
              >
                <Image
                  className={logo}
                  src={
                    dataCompany?.imgProfile
                      ? dataCompany?.imgProfile
                      : 'https://via.placeholder.com/150'
                  }
                  alt=""
                ></Image>
                <Typography.Title
                  className={hiddenNamecompany}
                  onClick={() =>
                    (window.location.href = `/${dataCompany?.name_company}`)
                  }
                  style={{ color: '#fff', cursor: 'pointer' }}
                  level={4}
                >
                  {dataCompany?.name_company}
                </Typography.Title>

                <Row>
                  {dataCompany?.daysOfWeeks?.[indexToday]?.day?.d === toDay &&
                  currentHors > parseInt(openHors) &&
                  currentHors < parseInt(closeHors) ? (
                    <Row style={{ gap: '10px', alignItems: 'center' }}>
                      {' '}
                      <span className="pulse"></span>
                      <Tag
                        color="green"
                        style={{ fontWeight: 'bold', whiteSpace: 'normal' }}
                      >
                        Estamos abertos!
                      </Tag>
                    </Row>
                  ) : (
                    <Row>
                      {currentHors >= parseInt(closeHors) && currentMin > 0 ? (
                        <Tag
                          color="red"
                          style={{ fontWeight: 'bold', whiteSpace: 'normal' }}
                        >
                          Estamos Fechado no momento Abre amanhâ as:{' '}
                          {
                            dataCompany?.daysOfWeeks?.[
                              indexToday === 6 ? 0 : indexToday + 1
                            ]?.open
                          }
                        </Tag>
                      ) : currentHors < parseInt(openHors) ? (
                        <Tag
                          color="red"
                          style={{ fontWeight: 'bold', whiteSpace: 'normal' }}
                        >
                          Estamos Fechado no momento Abriremos as:{' '}
                          {dataCompany?.daysOfWeeks?.[indexToday]?.open}
                        </Tag>
                      ) : (
                        !dataCompany?.daysOfWeeks?.[indexToday]?.day?.d &&
                        !dataCompany?.daysOfWeeks?.[indexToday]?.day?.name && (
                          <Tag
                            color="red"
                            style={{ fontWeight: 'bold', whiteSpace: 'normal' }}
                          >
                            Estamos Fechado no momento Abre amanhâ as:
                            {dataCompany?.daysOfWeeks?.[indexToday + 1]?.day
                              ?.d &&
                              dataCompany?.daysOfWeeks?.[indexToday + 1]?.day
                                ?.name &&
                              dataCompany?.daysOfWeeks?.[
                                indexToday === 6 ? 0 : indexToday + 1
                              ]?.open}
                          </Tag>
                        )
                      )}
                    </Row>
                  )}
                </Row>
              </Row>
            </Col>
            <Col>
              <Row
                className={responsiveboxmeuspedidosbtn}
                style={{ alignItems: 'center', gap: '10px', height: '100%' }}
              >
                <Row style={{ position: 'relative' }}>
                  <Typography.Link
                    className="responsivemeusPedidosBtn"
                    style={{ color: '#fff' }}
                    href={
                      OrderId &&
                      `/${dataCompany?.name_company}/meusPedidos/${OrderId}`
                    }
                  >
                    Meus pedidos
                  </Typography.Link>
                </Row>

                {window.screen.width > 500 ? (
                  <Button
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      gap: '10px',
                    }}
                    onClick={() =>
                      (window.location.href = `https://wa.me/55${dataCompany?.phone}?text=${message}`)
                    }
                  >
                    <Row>
                      <Typography.Text> Ajuda</Typography.Text>
                    </Row>
                    <Row>
                      <FiHelpCircle color="#000"></FiHelpCircle>
                    </Row>
                  </Button>
                ) : (
                  <Button
                    title="Ajuda"
                    type="text"
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <FiHelpCircle size={20} color="#fff"></FiHelpCircle>
                  </Button>
                )}
              </Row>
              <MenuMobileBtn></MenuMobileBtn>
            </Col>
          </Row>
        )}
      </header>
    </>
  );
}
