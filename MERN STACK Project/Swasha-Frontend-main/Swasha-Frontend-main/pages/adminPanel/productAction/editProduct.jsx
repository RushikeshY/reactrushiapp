import React from 'react'
import Form from './form'

const EditProduct = ({prodId, setCurrent}) => {
  return (
    <div>
      <Form prodId={prodId} setCurrent={setCurrent} />
    </div>
  )
}

export default EditProduct