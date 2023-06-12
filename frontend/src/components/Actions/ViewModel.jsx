import React from 'react'
import {   Dropdown,  Modal } from 'semantic-ui-react'
import UserCard from '../UserCard/UserCard'

function ViewModel(props) {
    
  
    const [open, setOpen] = React.useState(false)
  return (
    <>
    <Modal
    basic
    size='mini'
    open={open}
    trigger={<Dropdown.Item text='View' icon = "eye green" />}
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    >
   <UserCard data={props.data}/> 
  </Modal>

      </>
  )
}

export default ViewModel