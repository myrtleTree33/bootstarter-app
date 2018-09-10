import React from 'react';
import './ClassicLogin.less';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

export default ({ onLoginSuccess, onLoginFailure }) => {
  function handleLogin(e) {
    e.preventDefault();
    onLoginSuccess();
  }

  return (
    <div>
      <Form onSubmit={this.handleSubmit} className="ClassicLogin">
        <FormItem>
          <Input
            size="large"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        </FormItem>
        <FormItem>
          <Input
            size="large"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            block
          >
            Login
          </Button>
        </FormItem>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <a className="form-forgot" href="">
            Forgot password
          </a>
        </FormItem>
      </Form>
      {/* <form onSubmit={e => handleLogin(e)}> */}
      {/* <Field>
          <Control>
            <Input type="text" name="email" placeholder="email" />
          </Control>
        </Field>
        <Field>
          <Control>
            <Input type="password" name="password" placeholder="password" />
          </Control>
        </Field>
        <Field isGrouped>
          <Control>
            <Button isColor="primary" type="submit">
              Login
            </Button>
          </Control>
        </Field> */}
      {/* </form> */}
    </div>
  );
};
