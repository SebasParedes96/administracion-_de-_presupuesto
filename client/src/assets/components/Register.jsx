import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


function Register() {

    const [formDataRegister, setFormDataRegister] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [validatedRegister, setValidatedRegister] = useState(false);
    const [errors, setErrors] = useState({});


    const onChangeRegister = (e) => setFormDataRegister({ ...formDataRegister, [e.target.name]: e.target.value })

    const validateRegister = () => {
        setErrors({})
        if (formDataRegister.email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formDataRegister.email)) {
            setErrors({
                ...errors,
                email: 'email es requerido'
            });
            return false;
        } else if (formDataRegister.password === "") {
            setErrors({
                ...errors,
                password: 'password es requerida'
            });
            return false;
        }
        else if (formDataRegister.name === "") {
            setErrors({
                ...errors,
                name: 'nombre es requerido'
            });
            return false;
        }
        else if (formDataRegister.lastName === "") {
            setErrors({
                ...errors,
                lastName: 'apellido es requerida'
            });
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } setValidatedRegister(true);

        if (validateRegister()) {
            axios.post('http://localhost:3000/api/register', formDataRegister)
                .then((response) => {
                    console.log(response);
                    alert('Se creo un usuario, inicia sesion!')
                })
                .catch((error) => {
                    console.log(error);
                    alert('¡ups! algo fallo, vuelve a intentarlo!')
                })
        } else {
            console.log('faltan datos')
        }
    };


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body >

                <Card.Title>Register</Card.Title>
                <Form noValidate validated={validatedRegister} >
                    <Form.Group className="mb-3" >
                        <Form.Label> Nombre</Form.Label>
                        <Form.Control onChange={(e) => onChangeRegister(e)} name='name' type="text" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese su nombre.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label> Apellido</Form.Label>
                        <Form.Control onChange={(e) => onChangeRegister(e)} name='lastName' type="text" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese su apellido.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label> E-mail</Form.Label>
                        <Form.Control onChange={(e) => onChangeRegister(e)} name='email' type="email" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese un email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label> Password</Form.Label>
                        <Form.Control onChange={(e) => onChangeRegister(e)} name='password' type="password" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese una contraseña.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type='button' onClick={handleSubmit} variant="primary">Register</Button>
                </Form>
            </Card.Body>
        </Card>
    )

}

export default Register