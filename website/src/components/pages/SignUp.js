import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SignUp() {
  return(
    <>
    <h1 className='sign-up'>ЗАРЕЄСТРУВАТИСЬ</h1>;
    <br></br>
    <div className='about_page_container'> 
      <h1>Приєднатись до організації</h1>
      <Form className="form" size = '70%'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Прізвище, ім'я, по-батькові</Form.Label>
        <Form.Control type="text" placeholder="Введіть ПІБ" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Номер телефону</Form.Label>
        <Form.Control type="phone" placeholder="Введіть моб. телефон" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email-адреса</Form.Label>
        <Form.Control type="email" placeholder="Введіть email" />
      </Form.Group>
      <Form.Select aria-label="Default select example">
      <option>Стать</option>
      <option value="female">Жіноча</option>
      <option value="male">Чоловіча</option>
    </Form.Select>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Надіслати запрошення в телеграм-чат" />
      </Form.Group>
      <Button variant="dark" type="submit" >
         Надіслати 
      </Button>
    </Form>
      <br></br>
    </div>
    <Footer/>
    </>) 
}