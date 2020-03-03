import React, { useState } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

import TxButton from './TxButton';

export default function CreateSubject(props) {
  const { api, keyring } = props;
  const [status, setStatus] = useState('');
  const initialState = {
    addressFrom: '',
    addressTo: '',
    amount: 0
  };
  const [formState, setFormState] = useState(initialState);
  const { addressFrom } = formState;
  const fromPair = !!addressFrom && keyring.getPair(addressFrom);

  // get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map((account) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase()
  }));

  const onChange = (_, data) => {
    setFormState(formState => {
      return {
        ...formState,
        [data.state]: data.value
      };
    });
  };

  return (
    <>
      <h1>Create Subject</h1>
      <Form>
        <Form.Field>
          <Dropdown
            placeholder='Select from  your accounts'
            fluid
            label="From"
            onChange={onChange}
            search
            selection
            state='addressFrom'
            options={keyringOptions}
          />
        </Form.Field>
        <Form.Field>
          <TxButton
            api={api}
            fromPair={fromPair}
            label={'createSubject'}
            params={[]}
            setStatus={setStatus}
            tx={api.tx.caliburn.createSubject}
          />
          {status}
        </Form.Field>
      </Form>
    </>
  );
}
