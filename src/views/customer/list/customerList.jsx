import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import ClientList from '../../../components/customer/ClientList'

const CustomerList = () => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                        
                    <ClientList/>
                            
                     

                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CustomerList;
