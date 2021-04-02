import React from 'react';
import { Col, Container, ListGroup, Row, Tab } from 'react-bootstrap';
import AddCar from '../AddCar/AddCar';
import AddProduct from '../AddProduct/AddProduct';
import Manage from '../Manage/Manage';
import Orders from '../Orders/Orders';

const Admin = () => {

    return (
        <Container>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={3} style={{height:'550px',background:'gray'}}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Manage Product
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Add Product
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Edit Product
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <Manage></Manage>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
              <AddProduct></AddProduct>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
              <Orders></Orders>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </Container>


    );
};

export default Admin;