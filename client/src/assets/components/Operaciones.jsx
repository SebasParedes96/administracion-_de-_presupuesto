import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useAuthContext } from "../../context/authContext";

function Operations() {

    const {idUser} = useAuthContext()
    const [Operations, setOperations] = useState([])
    const [categories, setCategories] = useState([]);
    const [validated, setValidated] = useState(false);
    const [modalEdit, setModalEdit] = useState(false)
    const [errors, setErrors] = useState({});
    const [formDataEdit, setFormDataEdit] = useState({
        concept: "",
        amount: "",
        date: "",
        id_category: "",
        id: idUser
    })
    

    const [loading, setLoading] = useState(false)

    const selectOperation = (element, action) => {
        console.log(element)
        setFormDataEdit(element);
        (action == 'edit') && setModalEdit(true)
    }

    const onChange = (e) => setFormDataEdit({ ...formDataEdit, [e.target.name]: e.target.value })

    const handleClose = () => setModalEdit(false);
    useEffect(() => {
        // get operations
        axios.get(`http://localhost:3000/api/${idUser}/operations`)
            .then((response) => {
                console.log(response);
                setOperations(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        // get categories
        axios.get('http://localhost:3000/api/categories')
            .then((response) => {
                console.log(response);
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [loading]);

    //delete operations

    const deleteOperation = (id) => {
        axios.delete(`http://localhost:3000/api/${id}`)
            .then(function (response) {
                console.log(response);
                setLoading(!loading);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } setValidated(true);

        editOperation()

    };

    const validate = () => {
        setErrors({})
        if (formDataEdit.amount === "") {
            setErrors({
                ...errors,
                name: 'monto es requerido'
            });
            return false;
        } else if (formDataEdit.date === "") {
            setErrors({
                ...errors,
                date: 'fecha es requerida'
            });
            return false;
        }
        if (formDataEdit.concept === "") {
            setErrors({
                ...errors,
                password: 'el concepto es requerido'
            });
            return false;
        }

        return true;
    };

    const editOperation = () => {
        console.log(formDataEdit)
        if (validate()) {
            axios.put(`http://localhost:3000/api/${formDataEdit.id}`, formDataEdit)
                .then(function (response) {
                    console.log(response);
                    handleClose();
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
        <React.Fragment>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>tipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Operations.map(elemento => (
                                <tr key={elemento.id}>
                                    <td>{elemento.date}</td>
                                    <td>{elemento.amount}</td>
                                    <td>{elemento.type}</td>
                                    <td>
                                        <Button onClick={() => selectOperation(elemento, 'edit')} >Editar</Button>
                                        <Button onClick={() => deleteOperation(elemento.id)} >Borrar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Modal show={modalEdit} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modificar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} >
                            <Form.Group className="mb-3" >
                                <Form.Label> Monto</Form.Label>
                                <Form.Control onChange={(e) => onChange(e)} value={formDataEdit.amount} name='amount' type="number" placeholder="1000" required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un monto.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> Detalle</Form.Label>
                                <Form.Control onChange={(e) => onChange(e)} value={formDataEdit.concept} name='concept' as="textarea" rows={2} required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un detalle.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> Fecha</Form.Label>
                                <Form.Control onChange={(e) => onChange(e)} value={formDataEdit.date} name='date' type='date' required />
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione una fecha.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> Clasificacion</Form.Label>
                                <Form.Select onChange={(e) => onChange(e)} value={formDataEdit.id_category} name='category' >
                                    {
                                        categories.map(elemento => (
                                            <option value={elemento.id}>{elemento.description}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button type="button" onClick={handleSubmit} variant="primary">Modificar</Button>

                    </Modal.Footer>
                </Modal>
                </React.Fragment>
    )
}

export default Operations