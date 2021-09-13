import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import { Redirect } from 'react-router-dom'
import { getAllAdmins } from '../../actions';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 160,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 160,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 160,
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 160,
    },
    {
        field: 'birthdate',
        headerName: 'Birthdate',
        width: 160,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 160,
    },
    {
        field: 'createdAt',
        headerName: 'Created at',
        width: 210,
    },
    {
        field: 'updatedAt',
        headerName: 'Updated at',
        width: 210,
    },

];

const Admins = () => {
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAdmins())
    }, [])

    if (auth.user.role !== 'super-admin') {
        return <Redirect to="/" />
    }

    return (
        <Layout sidebar>
            <div style={{ width: '100%' }}>
                {
                    user.admins?.length > 0 && (
                        <DataGrid
                            getRowId={row => row._id}
                            autoHeight
                            rows={user.admins}
                            columns={columns}
                            pageSize={9}
                            onCellClick={(e) => console.log(e)}
                            disableSelectionOnClick
                        />
                    )
                }
            </div>
        </Layout>
    )
}

export default Admins
