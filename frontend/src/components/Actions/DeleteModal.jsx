import React from 'react'
import { toast } from 'react-toastify';
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react'
import API_BASE_URL from '../../features/config';

function DeleteModal(props) {
    const [open, setOpen] = React.useState(false)


    const handleDelete = () => {
       
        fetch(`${API_BASE_URL}/users/${props.data._id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: props.data.id, 
            }),
        })
        .then((response) => response.json())
        .then(() => {
          toast.success('User deleted successfully')
          props.onDelete()
        })
        .catch((error) => {
          // Handle the error as needed
          console.error('Error updating user:', error);
          toast.error('Error updating user:', error.message);
        });
        
        setOpen(false); 
    };

  return (
    <Modal
    closeIcon
    open={open}
    size='mini'
    trigger={<Dropdown.Item text='Delete' icon = "trash red" 
      />}
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
  >
    <Header icon='archive' content='Confirm User Deletion' />
    <Modal.Content>
      <p>
      Are you sure you want to delete {props.data.name} ?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={() => setOpen(false)}>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' onClick={() => handleDelete()}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
  )
}

export default DeleteModal