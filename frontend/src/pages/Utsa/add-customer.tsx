import { Button, Grid } from '@mui/material'
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import MyTextfield from '../../components/form-components/my-textfield'

export default function AddCustomer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return (
        <Grid container direction="row" spacing={10}>
            <Grid container item direction="row" spacing={10} justifyContent="space-around">
                <Grid item>
                    <MyTextfield
                        label="Full name"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                </Grid>
                <Grid item>
                    <MyTextfield
                        label="Email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </Grid>
            </Grid>
            <Grid container item direction="row" spacing={10} justifyContent="space-around">
                <Grid item >
                    <MyTextfield
                        label="Password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </Grid>
            </Grid>
            <Grid container item justifyContent='center' spacing={10}>
                <Grid item>
                    <Button variant='contained' onClick={event => {
                        axios.post('http://localhost:7982/add-customer', { name: name, email: email, password: password }).then(res => {
                            if (res.data) {
                                enqueueSnackbar('Customer added successfully', { variant: 'success' });
                                navigate('/dashboard/AddTodo',{state:res.data});
                            }
                            else {
                                enqueueSnackbar('Customer not added', { variant: 'error' });
                            }
                        })
                    }}>Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
