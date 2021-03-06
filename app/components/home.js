import React from "react";
import { Form, TextBox, Button } from 'react-form-elements'
import { navigate } from '@reach/router'
export default function Home() {
  return (
    <section>
      <Form
        name="user"
        onSubmit={(values) => {
          navigate(`\\${values.user}`)
        }}
        className="col s12"
      >
        <TextBox name="user" label="GitHub User" initialValue="" className="row" />

        <Button>See Stars</Button>

      </Form>
    </section>
  );
}
