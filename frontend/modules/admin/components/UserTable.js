import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { Modal } from 'react-bootstrap'
import UserActions from '../actions/UserActions'
import { Input, Alert, TextArea, Checkbox } from '../../common/form/FormComponents'

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUser: this.props.activeUser || '',
      users: this.props.users || '',
      errors: this.props.errors || false,
      showModal: this.props.showModal || false,
    };

    this.new = this.new.bind(this);
    this.open = this.open.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.close = this.close.bind(this);
    this.update = this.update.bind(this);
    this.getErrors = this.getErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({users: nextProps.users});
  }

  open(user) {
    // Get a deep copy of the filter state
    let newUser = JSON.parse(JSON.stringify(user));
    this.setState({
      activeUser: newUser || {},
      showModal: true,
    });
  }

  new(e) {
    e.preventDefault();
    this.setState({
      activeUser: {},
      showModal: true,
    });
  }

  save(e) {
    e.preventDefault();
    UserActions.setUser(this.state.activeUser);
    this.close();
  }

  close() {
    this.setState({ showModal: false });
  }

  delete(e) {
    e.preventDefault();
    // TODO: This logic might be better in the store.
    if (confirm("Are you sure you want to delete this?")) {
      UserActions.deleteUser(this.state.activeUser.id);
      this.close();
    }
  }

  update(name, value) {
    let newActiveUser = this.state.activeUser;
    newActiveUser[name] = value;
    this.setState({ activeUser: newActiveUser })
  }

  getErrors(name) {
    return false
    // return (
    //   this.state.errors !== false && name in this.state.errors
    // ) ? this.state.errors[name] : false ;
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      modelHeader: {
        id: 'admin.user.modelHeader',
        description: 'Edit a user',
        defaultMessage: 'Edit a user',
      },
      username: {
        id: 'admin.user.username',
        description: 'Username',
        defaultMessage: 'Username',
      },
      firstname: {
        id: 'admin.user.firstname',
        description: 'firstname',
        defaultMessage: 'First name',
      },
      lastname: {
        id: 'admin.user.lastname',
        description: 'lastname',
        defaultMessage: 'Last name',
      },
      oldPassword: {
        id: 'admin.user.oldPassword',
        description: 'oldPassword',
        defaultMessage: 'Old Password',
      },
      newPassword: {
        id: 'admin.user.newPassword',
        description: 'newPassword',
        defaultMessage: 'New Password',
      },
      confirmPassword: {
        id: 'admin.user.confirmPassword',
        description: 'confirmPassword',
        defaultMessage: 'Confirm Password',
      },
      note: {
        id: 'admin.user.note',
        description: 'note',
        defaultMessage: 'NOTE',
      },
      noteMessage: {
        id: 'admin.user.noteMessage',
        description: 'noteMessage',
        defaultMessage: 'Leaving the password fields blank will not update them.',
      },
      isAdmin: {
        id: 'admin.user.isAdmin',
        description: 'isAdmin',
        defaultMessage: 'Super User',
      },
      new_user: {
        id: 'admin.user.new_user',
        description: 'New User',
        defaultMessage: 'New User',
      },
      delete: {
        id: 'admin.user.delete',
        description: 'Delete',
        defaultMessage: 'Delete',
      },
      cancel: {
        id: 'admin.user.cancel',
        description: 'Cancel',
        defaultMessage: 'Cancel',
      },
      submit: {
        id: 'admin.user.submit',
        description: 'Submit',
        defaultMessage: 'Submit',
      },
    });

    let table = '';
    if (this.state.users.length > 0) {
      table = this.state.users.map((user) => {
        return (
          <tr key={ user.username } onClick={ () => this.open(user) }>
            <td>{ user.username }</td>
            <td>{ user.first_name }</td>
            <td>{ user.last_name }</td>
            <td> { user.is_superuser ?
                <span className="glyphicon glyphicon-ok" aria-hidden="true"/> :
                <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
              }
            </td>
          </tr>
        )
      }, this);
    }

    return (
      <div className="user-form">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>{ formatMessage(messages.username) }</th>
                <th>{ formatMessage(messages.firstname) }</th>
                <th>{ formatMessage(messages.lastname) }</th>
                <th>{ formatMessage(messages.isAdmin) }</th>
              </tr>
            </thead>
            <tbody>
            { table }
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary"
          onClick={ this.new }>
            { formatMessage(messages.new_user) }
        </button>

        <Modal show={ this.state.showModal } onHide={ this.close }>
          <Modal.Header closeButton>
            <Modal.Title>{ formatMessage(messages.modelHeader) }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.errors !== false ? ( <Alert/> ) : ''}
            <Input
              name="username"
              type="text"
              label={ formatMessage(messages.username) }
              placeholder={ formatMessage(messages.username) }
              change={ this.update }
              value={ this.state.activeUser.username }
              errors={ this.getErrors('title') } />
            <Input
              name="first_name"
              type="text"
              label={ formatMessage(messages.firstname) }
              placeholder={ formatMessage(messages.firstname) }
              change={ this.update }
              value={ this.state.activeUser.first_name }
              errors={ this.getErrors('title') } />
            <Input
              name="last_name"
              type="text"
              label={ formatMessage(messages.lastname) }
              placeholder={ formatMessage(messages.lastname) }
              change={ this.update }
              value={ this.state.activeUser.last_name }
              errors={ this.getErrors('info') } />
            <hr/>
            <p className="note">
              <b>{ formatMessage(messages.note) }</b>:&nbsp;
              { formatMessage(messages.noteMessage) }
            </p>
            <Input
              name="oldPassword"
              type="text"
              label={ formatMessage(messages.oldPassword) }
              placeholder={ formatMessage(messages.oldPassword) }
              change={ this.update }
              errors={ this.getErrors('oldPassword') } />
            <Input
              name="newPassword"
              type="text"
              label={ formatMessage(messages.newPassword) }
              placeholder={ formatMessage(messages.newPassword) }
              change={ this.update }
              errors={ this.getErrors('newPassword') } />
            <Input
              name="confirmPassword"
              type="text"
              label={ formatMessage(messages.confirmPassword) }
              placeholder={ formatMessage(messages.confirmPassword) }
              change={ this.update }
              errors={ this.getErrors('confirmPassword') } />
            <hr/>
            <Checkbox
              name="is_superuser"
              type="text"
              label={ formatMessage(messages.isAdmin) }
              placeholder={ formatMessage(messages.isAdmin) }
              change={ this.update }
              checked={ this.state.activeUser.is_superuser }
              errors={ this.getErrors('source') } />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={ this.delete }>
                { formatMessage(messages.delete) }
            </button>
            <button
              className="btn btn-success"
              onClick={ this.save }>
                { formatMessage(messages.submit) }
            </button>
            <button
              className="btn btn-primary"
              onClick={ this.close }>
                { formatMessage(messages.cancel) }
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

module.exports.UserTable = injectIntl(UserTable);