import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import DeleteModal from './DeleteModal'
import ViewModel from './ViewModel'
import { useNavigate } from 'react-router-dom';

function Actions(props) {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/edituser/${props.data._id}`);
  };
 
  return (<>
    <Dropdown icon="ellipsis vertical" >
    <Dropdown.Menu>
      
      <ViewModel data ={props.data}></ViewModel>

      <Dropdown.Item onClick={navigateHandler} text='Edit' icon = "edit outline blue"  />
      <DeleteModal data={props.data} onDelete={props.onDelete}/>
    </Dropdown.Menu>
  </Dropdown>

 
  </>
  )
}

export default Actions