import React, { useState } from 'react';
import { Dropdown, Image, Table } from 'semantic-ui-react';
import Actions from '../Actions/Actions';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../features/config';

function UserRow(props) {
  const { data } = props;

  const [selectedStatus, setSelectedStatus] = useState(data.status);

  const options = [
    { key: 'active', text: 'Active', value: 'Active' },
    { key: 'inactive', text: 'Inactive', value: 'Inactive' },
  ];

  const handleStatusChange = (e, { value }) => {
    setSelectedStatus(value);

    // Make the update request here
    const updatedData = { status: value };
   
    fetch(`${API_BASE_URL}/users/status/${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('User status updated');
          return response.json();
        } else {
          throw new Error('Error updating user');
        }
      })
      .then((updatedUser) => {
        console.log('User updated:', updatedUser);
        // Handle the updated user data as needed
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        toast.error('Error updating user');
        // Handle the error as needed
      });
  };

  return (
    <Table.Row>
      <Table.Cell>{data._id}</Table.Cell>
      
      <Table.Cell>
        {data.firstName} {data.lastName}
      </Table.Cell>
      <Table.Cell>{data.email}</Table.Cell>
      <Table.Cell>{data.gender}</Table.Cell>
      <Table.Cell>
        <Dropdown
          button
          className="icon right labeled"
          floating
          labeled
          icon="caret down"
          iconPosition="right"
          options={options}
          text={selectedStatus ? selectedStatus : 'Select Status'}
          onChange={handleStatusChange}
          style={{ backgroundColor: '#9a4848', color: '#ffff' }}
        />
      </Table.Cell>
      <Table.Cell style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src={data.selectedFile ? data.selectedFile : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
          size="mini"
          circular
        />
      </Table.Cell>
      <Table.Cell>
        <Actions data={data} onDelete={props.onDelete} />
      </Table.Cell>
    </Table.Row>
  );
}

export default UserRow;
