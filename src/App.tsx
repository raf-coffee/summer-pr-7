import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday: string;
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const passwordConfirm = watch("password", "");
  console.log(errors);
  const onSubmit: SubmitHandler<FormInputs> = (data) =>
    alert(JSON.stringify(data, null, 4));

  return (
    <main className="mt-5">
      <Container fluid="md">
        <Row className="justify-content-center">
          <Col xs={6}>
            <Form
              className="bg-white border border-2 border-dark rounded p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FloatingLabel className="mb-3" controlId="firstName" label="Имя">
                <Form.Control
                  type="text"
                  placeholder="Имя"
                  {...register("firstName", {
                    required: true,
                    maxLength: 30,
                    pattern: /[\p{Letter}\p{Mark}\s-]+/gu,
                  })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid" id="firstNameError">
                  Имя содержит недопустимые символы.
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="lastName"
                label="Фамилия"
              >
                <Form.Control
                  type="text"
                  placeholder="Фамилия"
                  {...register("lastName", {
                    required: true,
                    maxLength: 30,
                    pattern: /[\p{Letter}\p{Mark}\s-]+/gu,
                  })}
                  aria-invalid={errors.lastName ? "true" : "false"}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid" id="lastNameError">
                  Фамилия содержит недопустимые символы.
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="email"
                label="Эл. почта"
              >
                <Form.Control
                  type="email"
                  placeholder="Эл. почта"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" id="EmailError">
                  Введите корректный email.
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="password"
                label="Пароль"
              >
                <Form.Control
                  type="password"
                  placeholder="Пароль"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" id="Password">
                  Минимальная длина пароля - 8 символов.
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="passwordConfirm"
                label="Повторите пароль"
              >
                <Form.Control
                  type="password"
                  placeholder="Повторите пароль"
                  {...register("passwordConfirm", {
                    required: true,
                    validate: (value: string) =>
                      passwordConfirm === value || "Пароли должны совпадать",
                  })}
                  aria-invalid={errors.passwordConfirm ? "true" : "false"}
                  isInvalid={!!errors.passwordConfirm}
                />
                <Form.Control.Feedback type="invalid" id="passwordConfirm">
                  Пароли должны совпадать.
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="birthday"
                label="Дата рождения"
              >
                <Form.Control
                  type="date"
                  {...register("birthday", {
                    required: true,
                  })}
                  aria-invalid={errors.birthday ? "true" : "false"}
                  isInvalid={!!errors.birthday}
                />
                <Form.Control.Feedback type="invalid" id="birthdayError">
                  Выберите дату рождения.
                </Form.Control.Feedback>
              </FloatingLabel>
              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={Object.entries(errors).length !== 0}
                >
                  Отправить
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
export default App;
