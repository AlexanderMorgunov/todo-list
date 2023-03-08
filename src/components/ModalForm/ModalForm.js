import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  DatePicker,
  Modal,
} from "antd";

const ModalForm = ({ isOpenModal, handleCancel, title, handleClick }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={title}
      open={isOpenModal}
      onCancel={handleCancel}
      style={{ textAlign: "center" }}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          justifyContent: "center",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => handleClick(values)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Некорректный E-mail!",
            },
            {
              required: true,
              message: "Введите E-mail",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Введите пароль",
              min: 6,
              message: "Минимальная длина пароля - 6 символов.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {title}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
