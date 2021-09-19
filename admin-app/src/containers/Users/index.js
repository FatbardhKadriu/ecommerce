import React, { useEffect } from 'react';
import Layout from '../../components/Layout'
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions';

const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
        field: 'fullName',
        headerName: 'Full Name',
        width: 160,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        width: 160,
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 160,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 125,
    },
    {
        field: 'birthdate',
        headerName: 'Birthdate',
        width: 134,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 160,
    },
    {
        field: 'createdAt',
        headerName: 'Created on',
        type: 'date',
        width: 150,
    },
    {
        field: 'updatedAt',
        headerName: 'Updated on',
        width: 180,
    },
];

const Users = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <Layout sidebar>
            <div style={{ width: '100%' }}>
                <DataGrid
                    loading={user.users?.length === 0}
                    density
                    getRowId={row => row._id}
                    autoHeight
                    rows={user.users}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    pageSize={9}
                    disableSelectionOnClick
                />
            </div>
        </Layout>
    )
}


export default Users