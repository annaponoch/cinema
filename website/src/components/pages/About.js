import React, { useState } from 'react';
import Footer from '../Footer';
import '../../App.css';
import HeroSection from '../HeroSection';
import { Form, Button, Alert } from 'react-bootstrap';

export default function About() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(true);
    event.target.reset();
  };

  return(
    
    <>
    <HeroSection/>
    <div className='about_page'>
      <div className='about_container'> 
      <header>
        <h1>Про нас</h1>
      </header>

      <section>
        <h2>Хто ми?</h2>
        <p>Кінотеатр "Зіронька" - це місце, де кожен може насолоджуватися найкращими фільмами у затишній та сучасній
          атмосфері. Ми прагнемо створювати незабутні враження для кожного глядача та надаємо широкий вибір фільмів у
          різних жанрах.</p>
      </section>

      <section>
        <h2>Наша історія</h2>
        <p>Кінотеатр "Зіронька" успішно працює на ринку кінопоказу вже протягом 10 років. Протягом цього часу ми
          отримали велику кількість позитивних відгуків від наших відвідувачів і стали одним із найпопулярніших
          кінотеатрів у Києві.</p>
      </section>

      <section>
        <h2>Наші послуги</h2>
        <ul>
          <li>Сучасні кінозали з комфортними місцями та високоякісним обладнанням.</li>
          <li>Широкий вибір фільмів у всіх жанрах.</li>
          <li>Атмосферні кав'ярні та лаунж-зони для відпочинку перед або після сеансу.</li>
          <li>Організація корпоративних заходів та прем'єрних показів.</li>
        </ul>
      </section>

      <section>
        <h2>Контактна інформація</h2>
        <p>Ми завжди раді вам допомогти! Звертайтеся до нас за наступними контактними даними:</p>
        <p>Адреса: вул. Шевченківська, 12, Київ, Україна</p>
        <p>Телефон: +380 66 123 45 67</p>
        <p>Електронна пошта: <a href="mailto:info@zironka-cinema.com">info@zironka-cinema.com</a></p>
      </section>

      <section>
            <h1>Зв'яжіться з нами</h1>
            <div className="form_cont">
              <Form className="form" size='70%' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Прізвище, ім'я</Form.Label>
                  <Form.Control type="text" placeholder="Введіть ПІ" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email-адреса</Form.Label>
                  <Form.Control type="email" placeholder="Введіть email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Повідомлення, скарга чи пропозиція</Form.Label>
                  <Form.Control type="text" placeholder="Введіть повідомлення" />
                </Form.Group>
                <div className="button_contr">
                  <Button className="button_user" variant="dark" type="submit">
                    Надіслати
                  </Button>
                </div>
              </Form>
            </div>
            <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
              Повідомлення надіслано!
            </Alert>
          </section>
      </div>
    </div>
 
    <Footer/>
    </>
  ) 
}