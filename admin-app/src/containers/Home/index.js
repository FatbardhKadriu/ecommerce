import React from 'react'
import { Container } from 'react-bootstrap'
import Layout from '../../components/Layout'
import { Row, Col } from 'react-bootstrap'
import './style.css'

const Home = () => {

    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">Side bar</Col>
                    <Col md={10} style={{ marginLeft: 'auto'}}>Container</Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Home
