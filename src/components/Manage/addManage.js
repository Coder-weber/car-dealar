import React from 'react';
import { Col, Row } from 'react-bootstrap';

const addManage = ({product}) => {
    return (
        <Row>
            <Col>Name</Col>
            <Col>Price</Col>
            <Col>Image</Col>
            <Col>Action</Col>
        </Row>
    );
};

export default addManage;