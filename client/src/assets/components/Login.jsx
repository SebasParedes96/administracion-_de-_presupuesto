import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button";
import { useAuthContext } from "../../context/authContext";
import 'bootstrap/dist/css/bootstrap.min.css';


function Login () {

const [formDataLogin, setFormDataLogin] = useState({
    email:'',
    password:''
})
const [validatedLogin, setValidatedLogin] = useState(false);
const {login} = useAuthContext()
const [errors, setErrors] = useState({});


const onChangeLogin = (e) => setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value })


const validateLogin = () => {
    setErrors({})
    if (formDataLogin.email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formDataLogin.email) ) {
        setErrors({
            ...errors,
            name: 'monto es requerido'
        });
        return false;
    } else if (formDataLogin.password === "") {
        setErrors({
            ...errors,
            date: 'password es requerida'
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
    } setValidatedLogin(true);

    if (validateLogin()) {
        login(formDataLogin)
        }else{
            alert('credenciales invalidas!')
        }
};

return (
    <Card style={{ width: '18rem' }}>
    <Card.Body >

        <Card.Title>Login</Card.Title>
        <Form noValidate validated={validatedLogin} >
            <Form.Group className="mb-3" >
                <Form.Label> Monto</Form.Label>
                <Form.Control onChange={(e) => onChangeLogin(e)} name='email' type="email" placeholder="example@gmail.com" required />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese un correo valido.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label> Monto</Form.Label>
                <Form.Control onChange={(e) => onChangeLogin(e)} name='password' type="password" placeholder="Example01" required />
                <Form.Control.Feedback type="invalid">
                    Por favor ingrese una Contraseña.
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="button" onClick={handleSubmit}  variant="primary">Log in</Button>
        </Form>
    </Card.Body>
</Card>
)

}

export default Login