import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, handlePayment }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirmPayment = () => {
    // Валідація даних картки
    const cardNumberPattern = /^\d{16}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const cvvPattern = /^\d{3}$/;

    if (!cardNumberPattern.test(cardNumber)) {
      setErrorMessage('Номер картки має містити 16 цифр');
    } else if (!expiryDatePattern.test(expiryDate)) {
      setErrorMessage('Неправильний формат дати закінчення');
    } else if (!cvvPattern.test(cvv)) {
      setErrorMessage('CVV має містити 3 цифри');
    } else {
      setErrorMessage('');
      // Якщо дані введено правильно, викликаємо функцію handlePayment з введеними даними картки
      handlePayment();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Оплата онлайн</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Номер картки</Form.Label>
            <Form.Control type="text" placeholder="Введіть 16 цифр номеру картки" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Дата закінчення</Form.Label>
            <Form.Control type="text" placeholder="MM/YYYY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" placeholder="Введіть 3 цифри CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </Form.Group>
        </Form>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрити
        </Button>
        <Button variant="primary" onClick={handleConfirmPayment}>
          Оплатити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
