import React, { useState, useEffect } from 'react'
import { ListGroup, Form, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import AddContact from '../components/AddContact'
import EditAddress from '../components/EditAddress'

function AddressBook() {
  const [addressList, setAddressList] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  function setModal() {
    console.log('addd true')
    setShowAdd(true)
  }
  async function getAllAddress() {
    try {
      let resp = await axios.get(
        `${process.env.REACT_APP_API}/addressbook/alladdress`
      )
      console.log(resp.data)
      setAddressList(resp.data.addressList)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getAllAddress()
  }, [])
  //pass down as array because data is an object

  async function deleteAddress(id) {
    try {
      let resp = await axios.delete(
        `${process.env.REACT_APP_API}/addressbook/deleteaddress/${id}`
      )
      setAddressList(resp.data.addressList)
    } catch (error) {
      console.error(error)
    }
  }

  function editAddress(index) {
    setEditIndex(index)
    setShowEdit(true)
  }
  return (
    <div>
      <Button onClick={setModal}>Add Contact</Button>
      <AddContact
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        setAddressList={setAddressList}
      />
      <EditAddress
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        setAddressList={setAddressList}
        address={addressList[editIndex]}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Home Phone</th>
            <th>Mobile Phone</th>
            <th>Email</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {addressList.map((address, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{address.name}</td>
              <td>{address.homephone}</td>
              <td>{address.mobilephone}</td>
              <td>{address.email}</td>
              <Button
                variant='danger'
                onClick={() => deleteAddress(address._id)}
              >
                Delete
              </Button>
              <Button variant='primary' onClick={() => editAddress(index)}>
                Edit
              </Button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AddressBook
