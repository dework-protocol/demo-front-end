import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';
import React, { useState, useEffect } from 'react';
import { Container, Dimmer, Loader, Menu, Input, Label, Header, Button, Checkbox, Icon, Table } from 'semantic-ui-react';

//import Balances from './Balances';
import AccountInfo from './AccoutInfo';
import NodeInfo from './NodeInfo';
import Transfer from './Transfer';
import CreateSubject from './createSubject';
import 'semantic-ui-css/semantic.min.css'

export default function App() {
  const [api, setApi] = useState();
  const [apiReady, setApiReady] = useState();
  const [accountLoaded, setaccountLoaded] = useState(false);
  const WS_PROVIDER = 'ws://127.0.0.1:9944';
  //const WS_PROVIDER = 'wss://dev-node.substrate.dev:9944';

  useEffect(() => {
    const provider = new WsProvider(WS_PROVIDER);

    ApiPromise.create({ provider })
      .then((api) => {
        setApi(api);
        api.isReady.then(() => setApiReady(true));
      })
      .catch((e) => console.error(e));
  }, []);

  // new hook to get injected accounts
  useEffect(() => {
    web3Enable('substrate-front-end-tutorial')
      .then((extensions) => {
        // web3Accounts promise returns an array of accounts
        // or an empty array if our user doesn't have an extension or hasn't given the
        // access to any of their account.
        web3Accounts()
          .then((accounts) => {
            // add the source to the name to avoid confusion
            return accounts.map(({ address, meta }) => ({
              address,
              meta: {
                ...meta,
                name: `${meta.name} (${meta.source})`
              }
            }));
          })
          // load our keyring with the newly injected accounts
          .then((injectedAccounts) => {
            loadAccounts(injectedAccounts);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  const loadAccounts = (injectedAccounts) => {
    keyring.loadAll({
      isDevelopment: true
    }, injectedAccounts);
    setaccountLoaded(true);
  };

  const loader = function (text) {
    return (
      <Dimmer active>
        <Loader size='small'>{text}</Loader>
      </Dimmer>
    );
  };

  if (!apiReady) {
    return loader('Connecting to the blockchain')
  }

  if (!accountLoaded) {
    return loader('Loading accounts (please review any extension\'s authorization)');
  }
  return (
    <>
      <p></p>
      <Header size='huge' textAlign='center'>Caliburn - Web 3.0 Oriented Collaboration Platform</Header>
      <p></p>

      <Menu >
        <Menu.Item
          name='all'
        >
          <Label color='teal'>1</Label>
          All
        </Menu.Item>

        <Menu.Item
          name='software'
        >
          <Label>51</Label>
          Software
        </Menu.Item>

        <Menu.Item
          name='design'
        >
          <Label>1</Label>
          Design

        </Menu.Item>

        <Menu.Item
          name='sales'
        >
          <Label>10</Label>
          Sales

        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search task...' />
        </Menu.Item>
      </Menu>

      <p></p>

      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Minimal Reputation</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Reward</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>Coding for xxx</Table.Cell>
            <Table.Cell>750</Table.Cell>
            <Table.Cell>well done</Table.Cell>
            <Table.Cell>$1000</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>Coding for xxx</Table.Cell>
            <Table.Cell>750</Table.Cell>
            <Table.Cell>well done</Table.Cell>
            <Table.Cell>$1000</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>Coding for xxx</Table.Cell>
            <Table.Cell>750</Table.Cell>
            <Table.Cell>well done</Table.Cell>
            <Table.Cell>$1000</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>Design for xxx</Table.Cell>
            <Table.Cell>800</Table.Cell>
            <Table.Cell>well done</Table.Cell>
            <Table.Cell>$2000</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell collapsing>
              <Checkbox slider />
            </Table.Cell>
            <Table.Cell>Sales for xxx </Table.Cell>
            <Table.Cell>900</Table.Cell>
            <Table.Cell>well done</Table.Cell>
            <Table.Cell>$5000</Table.Cell>
          </Table.Row>

        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>
              <Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
              >
                <Icon name='caret square right' /> Claim Selected
          </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <Container>
        <NodeInfo
          api={api}
        />
        <AccountInfo
          keyring={keyring}
          api={api}
        />
        <Transfer
          api={api}
          keyring={keyring}
        />
        <CreateSubject
          api={api}
          keyring={keyring}
        />
      </Container>


    </>
  );
}


