import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getConfig from '../utils/getConfig';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const token = localStorage.getItem("token")

    const submit = (data) => {
        axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/users/login`, data)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                navigate("/")
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert("Credenciales Incorrectas")
                }

            })
    };

    useEffect(() => {
        if (token) {
            axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/users/me`, getConfig())
                .then(res => setUser(res.data))
        }

    }, [])
    const logout = () => {
        localStorage.setItem("token", "")
        alert("Te esperamos pronto con mas productos increibles!")
        navigate("/")
    }

    return (
        <div className='form'>
            {token ?
                <div>
                    <Alert variant="success">
                        <Alert.Heading>Bienvenido</Alert.Heading>
                        <center><p>{user.firstName}, {user.lastName}</p>
                            {user.email} <br /><br />
                            <button className='logout' onClick={() => logout()}>Cerrar Sesión</button>
                        </center>
                        <hr />

                    </Alert>
                </div>
                :
                <>
                    <Alert variant="success">
                        <Alert.Heading>Usar las siguientes Credenciales</Alert.Heading>
                        <p>
                            Email: john@gmail.com <br />
                            Contraseña: john1234
                        </p>
                        <hr />
                    </Alert>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingresar email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                {...register("email")} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password"
                                placeholder="Password" value={password}
                                onChange={e => setPassword(e.target.value)}
                                {...register("password")} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Ingresar
                        </Button>
                    </Form>
                </>
            }
        </div>
    );
};

export default Login;