import React from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input'

const Signup = () => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        type="text"
                                        label="First Name"
                                        placeholder="First Name"
                                        value=""
                                        onChange={() => { }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        type="text"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value=""
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Email"
                                value=""
                                onChange={() => { }}
                            />
                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                value=""
                                onChange={() => { }}
                            />
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup
