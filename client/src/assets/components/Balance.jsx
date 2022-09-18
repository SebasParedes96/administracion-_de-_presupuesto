import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Operations from "./Operaciones";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useAuthContext } from "../../context/authContext";


function Balance(props) {
    const {idUser} = useAuthContext()
    const [formData, setFormData] = useState({
        concept: "",
        amount: "",
        date: "",
        category: "1",
        type: "1",
        usser: idUser
    });
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [balance, setBalance] = useState(0);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        // get categories
        axios.get('http://localhost:3000/api/categories')
            .then((response) => {
                console.log(response);
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        // get balance
        axios.get(`http://localhost:3000/api/${idUser}`)
            .then((response) => {
                console.log(response);
                setBalance((response.data[0].balance == null ? balance:response.data[0].balance));
            })
            .catch((error) => {
                console.log(error);
            })

            // get types
        axios.get('http://localhost:3000/api/types')
            .then((response) => {
                console.log(response);
                setTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [loading]);

    // set FormData
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    // form validation


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } setValidated(true);

        addOperation();

    };

    const validate = () => {
        setErrors({})
        if (formData.amount === "") {
            setErrors({
                ...errors,
                name: 'monto es requerido'
            });
            return false;
        } else if (formData.date === "") {
            setErrors({
                ...errors,
                date: 'fecha es requerida'
            });
            return false;
        }
        if (formData.concept === "") {
            setErrors({
                ...errors,
                password: 'el concepto es requerido'
            });
            return false;
        }

        return true;
    };

    const addOperation = () => {
        if (validate()) {
            axios.post('http://localhost:3000/api/', formData)
                .then(function (response) {
                    console.log(response);
                    setLoading(!loading);
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log('enviado')
        } else {
            console.log('faltan datos')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Card style={{ width: '18rem', height: '92vh' }}>
            <Card.Body >
                <Card.Title style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >Balance</Card.Title>

                <Card.Text style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}  >
                    <span>{balance}</span>
                </Card.Text>

                <Card.Title>Agregar Operacion</Card.Title>
                <Form noValidate validated={validated} >
                    <Form.Group className="mb-3" >
                        <Form.Label> Monto</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name='amount' type="number" placeholder="1000" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese un monto.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Detalle</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name='concept' as="textarea" rows={2} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese un detalle.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Fecha</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} name='date' type='date' required />
                        <Form.Control.Feedback type="invalid">
                            Por favor seleccione una fecha.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> tipo de Operacion</Form.Label>
                        <Form.Select onChange={(e) => onChange(e)} name='type' >
                            {
                                types.map(elemento => (
                                    <option key={elemento.id} value={elemento.id}>{elemento.description}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Clasificacion</Form.Label>
                        <Form.Select onChange={(e) => onChange(e)} name='category' >
                            {
                                categories.map(elemento => (
                                    <option key={elemento.id} value={elemento.id}>{elemento.description}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Button type="button" onClick={handleSubmit} variant="primary">Agregar Operacion</Button>
                </Form>
            </Card.Body>
        </Card>
        <div style={{ paddingTop: 50, 
            paddingLeft: 10, 
            paddingRight: 10,
            width: '100vh' }}>
            <Operations key={loading} parentCallback = { function reload(){setLoading(!loading)}} />
        </div>
        </div>
    );
}

export default Balance;