import React, { useContext, useState } from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Redirect, useHistory } from "react-router";
import { SocketContext } from "../context/SocketContext";

const { Text, Title } = Typography;

export const Escritorio = () => {
  const [usuario] = useState(getUsuarioStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);
  const history = useHistory();
  useHideMenu(false);

  const salir = () => {
    localStorage.clear();
    //replace() s para que no pueda regresasr a la pantalla anterior
    history.replace("/ingresar");
  };

  const siguienteTicket = () => {
    // console.log(usuario);
    socket.emit("siguiente-ticket-trabajar", usuario, (ticket) => {
      // console.log(ticket);
      setTicket(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    return <Redirect to="/ingresar" />;
  }

  return (
    <>
      <Row span={20}>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" type="danger" onClick={salir}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket && (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket nro:</Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}
      <Row>
        <Col offset={18} span={6} alig="right">
          <Button onClick={siguienteTicket} shape="round" type="primary">
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
