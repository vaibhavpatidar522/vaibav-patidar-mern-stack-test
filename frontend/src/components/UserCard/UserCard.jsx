import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

function UserCard(props) {
    const {data} = props
  return (
    <Card color='red' > 
    <Image src={data.selectedFile} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{data.firstName} {data.lastName}</Card.Header>
      <Card.Meta>{data.mobile} , {data.status}</Card.Meta>
      <Card.Description>
        {data.email}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>

    <Button
      color='red'
      icon='user'
      label={{ basic: true, color: 'red', pointing: 'left', content: `${data.gender}` }}
    />
    </Card.Content>
  </Card>
  )
}

export default UserCard