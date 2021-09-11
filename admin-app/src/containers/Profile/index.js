import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, FormLabel, Button, Form } from 'react-bootstrap'
import Card from '../../components/UI/Card'
import profilePicture from '../../images/profile.jpeg'
import { generatePublicUrl } from '../../urlConfig'
import { getProfile, updateProfile } from '../../actions'
import { AiFillEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { userConstants } from '../../actions/constants'

const ProfileData = (props) => {
    return (
        <Row style={{
            marginLeft: '10px',
            marginBottom: '3px'
        }}>
            <Row>
                <Col style={{ fontSize: '11px' }} sm={12}>{props.label}</Col>
            </Row>
            <Row>
                <Col style={{ fontSize: '12px', fontWeight: 'bold' }} sm={12}>{props.value}</Col>
            </Row>
        </Row>
    )
}

const InputData = (props) => {
    return (
        <Row style={{ margin: '10px', padding: '4px' }}>
            <Col sm={4}>
                <FormLabel>
                    {props.label}
                </FormLabel>
            </Col>
            <Col sm={props.type === 'date' ? 3 : props.type === 'tel' ? 3 : 6}>
                {
                    props.type !== 'tel' ? (
                        <>
                            <input
                                style={{ width: '90%' }}
                                className="form-control form-control-sm" type={props.type}
                                value={props.value}
                                disabled={props.disabled}
                                onChange={props.onChange}
                                required={props.required}
                            />
                            {props.errorMessage && props.errorMessage}
                        </>
                    ) : (
                        <>
                            <input
                                className="form-control form-control-sm"
                                type={props.type}
                                pattern="04[4-6 | 9]{1}-[0-9]{3}-[0-9]{3}"
                                value={props.value}
                                disabled={props.disabled}
                                onChange={props.onChange}
                            />
                            <small
                                style={{ fontSize: '11px' }}
                                class="form-text text-muted">
                                Format: 045-123-123
                            </small>
                        </>
                    )
                }
            </Col>
        </Row>
    )
}

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
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birthdate, setBirthdate] = useState(formatDate(user.profile.birthdate))
    const [gender, setGender] = useState(user.profile.gender)
    const [phoneNumber, setPhoneNumber] = useState(user.profile.phoneNumber)
    const [editForm, setEditForm] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [pwdError, setPwdError] = useState('')

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
        setPhoneNumber(user.profile.phoneNumber)
    }, [user.profile])

    useEffect(() => {
        if (user.success) {
            toast.success(user.success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
            setPwdError('')
            setEditPassword(false)
        }
        if (user.error) {
            setEditForm(true)
            toast.error(user.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
        }
        dispatch({ type: userConstants.RESET_MESSAGES })

    }, [user.success, user.error])

    const onProfileUpdate = (e) => {
        e.preventDefault()

        if (oldPassword !== '' && (password === '' || confirmPassword === '')) {
            setPwdError('New password is required')
            return
        }
        if (password !== confirmPassword) {
            setPwdError(`Passwords don't match`)
            return
        }
        const user = {
            firstName,
            lastName,
            email,
            birthdate,
            gender,
            phoneNumber,
        }
        if (oldPassword !== '') {
            user.oldPassword = oldPassword
            user.hash_password = password
        }
        dispatch(updateProfile(user))
        setEditForm(false)
    }

    return (
        <Layout sidebar>
            <p style={{ fontWeight: '700', fontSize: '18px' }}>Profile</p>
            <div className="flexRow sb" style={{
                padding: '12px',
                display: 'flex',
            }}>
                <Card
                    style={{
                        width: '55%'
                    }}
                >
                    <Row>
                        <Col sm={{ span: 8, offset: 4 }}>
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
                    </Row>
                    <Row>
                        <Col sm={{ span: 8, offset: 4 }}>
                            <p style={{ fontWeight: '600' }}>{user.profile.firstName}{' '}{user.profile.lastName}</p>
                        </Col>
                    </Row>
                    <hr />
                    <ProfileData
                        label={'Role'}
                        value={user.profile.role}
                    />
                    <hr />
                    <ProfileData
                        label={'Username'}
                        value={user.profile.username}
                    />
                    <hr />
                    <ProfileData
                        label={'Email'}
                        value={user.profile.email}
                    />
                    <hr />
                    <ProfileData
                        label={'Phone Number'}
                        value={user.profile.phoneNumber ? user.profile.phoneNumber : <span style={{ color: 'red' }}>Not specified</span>}
                    />
                    <hr />
                    <ProfileData
                        label={'Birthdate'}
                        value={user.profile.birthdate ? formatDate(user.profile.birthdate) : <span style={{ color: 'red' }}>Not specified</span>}
                    />
                    <hr />
                    <ProfileData
                        label={'Gender'}
                        value={user.profile.gender ? user.profile.gender : <span style={{ color: 'red' }}>Not specified</span>}
                    />

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
                    <Form onSubmit={onProfileUpdate}>
                        <InputData
                            label={'FirstName'}
                            type={'text'}
                            value={firstName}
                            disabled={!editForm}
                            onChange={(e) => setFirstName(e.target.value)}
                            required={true}
                        />
                        <InputData
                            label={'LastName'}
                            type={'text'}
                            value={lastName}
                            disabled={!editForm}
                            onChange={(e) => setLastName(e.target.value)}
                            required={true}
                        />
                        <InputData
                            label={'Email'}
                            type={'email'}
                            value={email}
                            disabled={!editForm}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                        <InputData
                            type={'tel'}
                            label={'Phone Number'}
                            disabled={!editForm}
                            placeholder={'044-123-456'}
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                        <InputData
                            label={'Birthdate'}
                            type={'date'}
                            disabled={!editForm}
                            value={birthdate}
                            onChange={e => setBirthdate(e.target.value)}
                        />

                        <Row style={{ margin: '10px', padding: '4px' }}>
                            <Col sm={4}>
                                <FormLabel>
                                    Gender
                                </FormLabel>
                            </Col>
                            <Col sm={{ span: 2 }}>
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
                        <Row style={{ margin: '10px', padding: '4px' }}>
                            <Col>
                                <Form.Check
                                    type={'checkbox'}
                                    label={`Change password`}
                                    onClick={() => {
                                        editPassword ? setEditPassword(false) : setEditPassword(true)
                                        setOldPassword('')
                                        setPassword('')
                                        setConfirmPassword('')
                                    }
                                    }
                                    checked={editPassword && editForm}
                                    disabled={!editForm}
                                />
                            </Col>

                        </Row>
                        {
                            editPassword && editForm && (
                                <>
                                    <InputData
                                        label={'Old password'}
                                        type={'password'}
                                        disabled={!editForm}
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value)}
                                    />
                                    <InputData
                                        label={'New password'}
                                        type={'password'}
                                        disabled={!editForm}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required={oldPassword !== ''}
                                    />
                                    <InputData
                                        label={'Confirm password'}
                                        type={'password'}
                                        disabled={!editForm}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required={oldPassword !== ''}
                                        errorMessage={<p style={{
                                            color: '#f02849',
                                            fontFamily: 'SFProText-Regular, Helvetica, Arial, sans-serif',
                                            fontSize: '13px',
                                            marginTop: '3px',
                                            lineHeight: '16px',
                                        }}>{pwdError}</p>}
                                    />

                                </>
                            )
                        }
                        <Row style={{ margin: '5px' }}>
                            <Col sm={9}>
                                <span style={{ color: 'red' }}>{user.updateError}</span>
                            </Col>
                            <Col sm={3}>
                                <Button
                                    type='submit'
                                    style={{ display: editForm ? 'block' : 'none' }}
                                    variant="success">
                                    Update profile
                                </Button>
                                <ToastContainer />
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </Layout >
    )
}

export default Profile
