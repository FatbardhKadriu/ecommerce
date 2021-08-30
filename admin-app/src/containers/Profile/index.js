import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, FormLabel, Button } from 'react-bootstrap'
import Card from '../../components/UI/Card'
import profilePicture from '../../images/profile.jpeg'
import { generatePublicUrl } from '../../urlConfig'
import { getProfile, updateProfile } from '../../actions'
import { AiFillEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { userConstants } from '../../actions/constants'

const Profile = () => {

    const formatDate = (fullDate) => {
        if (fullDate) {
            const d = new Date(fullDate);
            let date = d.getDate()
            if (date >= 0 && date <= 9) date = "0" + date
            let month = d.getMonth() + 1
            if (month >= 0 && month <= 9) month = "0" + month
            return `${d.getFullYear()}-${month}-${date}`
        }
        return ""
    }

    const user = useSelector(state => state.user)
    const [firstName, setFirstName] = useState(user.profile.firstName)
    const [lastName, setLastName] = useState(user.profile.lastName)
    const [email, setEmail] = useState(user.profile.email)
    const [birthdate, setBirthdate] = useState(formatDate(user.profile.birthdate))
    const [gender, setGender] = useState(user.profile.gender)
    const [editForm, setEditForm] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    useEffect(() => {
        setFirstName(user.profile.firstName)
        setLastName(user.profile.lastName)
        setEmail(user.profile.email)
        setBirthdate(formatDate(user.profile.birthdate))
        setGender(user.profile.gender)
    }, [user.profile])

    useEffect(() => {
        if (user.updateSuccess) {
            toast.success(user.updateSuccess, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (user.updateError) {
            setEditForm(true)
            toast.error(user.updateError, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        dispatch({ type: userConstants.RESET_MESSAGES })
        
    }, [user.updateSuccess, user.updateError])

    const onProfileUpdate = () => {
        const user = {
            firstName,
            lastName,
            email,
            birthdate,
            gender
        }
        dispatch(updateProfile(user))
        setEditForm(false)
        toast.success(user.updateSuccess)
    }

    return (
        <Layout sidebar>
            <p style={{ fontWeight: '700', fontSize: '18px' }}>Profile</p>
            <div className="flexRow sb" style={{
                padding: '20px',
                display: 'flex',
            }}>
                <Card
                    style={{
                        width: '55%'
                    }}
                >
                    <Row>
                        <Col sm={4}></Col>
                        <Col sm={4}>
                            <img
                                alt=""
                                style={{
                                    borderRadius: '50%',
                                    width: '150px',
                                    maxWidth: '200px !important',
                                    marginTop: '10px',
                                    height: '150px'
                                }}

                                src={user.profile.profilePicture ? generatePublicUrl(user.profile.profilePicture) : profilePicture}>
                            </img>
                        </Col>
                        <Col sm={4}></Col>
                    </Row>
                    <Row>
                        <Col sm={4}></Col>
                        <Col sm={5}>
                            <p style={{ fontWeight: '600' }}>{user.profile.firstName}{' '}{user.profile.lastName}</p>
                        </Col>
                        <Col sm={4}></Col>
                    </Row>
                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                    }}>
                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={12}>Role</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{user.profile.role}</Col>
                        </Row>
                    </Row>
                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                    }}>
                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={12}>Username</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{user.profile.username}</Col>
                        </Row>
                    </Row>
                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                    }}>
                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={12}>Email</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{user.profile.email}</Col>
                        </Row>
                    </Row>
                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                    }}>
                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={10}>
                                Birthdate
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>
                                {formatDate(user.profile.birthdate)}
                            </Col>
                        </Row>
                    </Row>
                    <hr />
                    <Row style={{
                        marginLeft: '10px',
                        marginBottom: '10px'
                    }}>
                        <Row>
                            <Col style={{ fontSize: '11px' }} sm={10}>Gender</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{user.profile.gender}</Col>
                        </Row>
                    </Row>
                </Card>
                <Card
                    headerLeft={<h6>Admin profile</h6>}
                    headerRight={
                        <>
                            <Button onClick={() => editForm ? setEditForm(false) : setEditForm(true)}
                                style={{ background: 'white', color: 'blue' }}>
                                Edit <AiFillEdit />
                            </Button>
                        </>
                    }
                >
                    <Row style={{ margin: '20px' }}>
                        <Col sm={4}>
                            <FormLabel>
                                FirstName
                            </FormLabel>
                        </Col>
                        <Col sm={6}>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type="email"
                                value={firstName}
                                disabled={!editForm}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: '20px' }}>
                        <Col sm={4}>
                            <FormLabel>
                                LastName
                            </FormLabel>
                        </Col>
                        <Col sm={6}>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type="email"
                                value={lastName}
                                disabled={!editForm}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: '20px' }}>
                        <Col sm={4}>
                            <FormLabel>
                                Email
                            </FormLabel>
                        </Col>
                        <Col sm={6}>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type="email"
                                value={email}
                                disabled={!editForm}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row style={{ margin: '20px' }}>
                        <Col sm={4}>
                            <FormLabel>
                                Birthdate
                            </FormLabel>
                        </Col>
                        <Col sm={3}>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type="date"
                                readOnly={!editForm}
                                value={birthdate}
                                onChange={e => setBirthdate(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ margin: '20px' }}>
                        <Col sm={4}>
                            <FormLabel>
                                Gender
                            </FormLabel>
                        </Col>
                        <Col md={{ span: 2 }}>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="gender"
                                        value={'Male'}
                                        checked={gender === 'Male'}
                                        disabled={!editForm}
                                        onChange={e => setGender(e.target.value)}
                                    />
                                    Male
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="gender"
                                        value={'Female'}
                                        checked={gender === 'Female'}
                                        disabled={!editForm}
                                        onChange={e => setGender(e.target.value)}
                                    />
                                    Female
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ margin: '5px' }}>
                        <Col sm={9}>
                            <span style={{ color: 'red' }}>{user.updateError}</span>
                        </Col>
                        <Col sm={3}>
                            <Button
                                style={{ display: editForm ? 'block' : 'none' }}
                                onClick={() => onProfileUpdate()} variant="success">
                                Update profile
                            </Button>
                            <ToastContainer />
                        </Col>
                    </Row>
                </Card>
            </div>
        </Layout >
    )
}

export default Profile
