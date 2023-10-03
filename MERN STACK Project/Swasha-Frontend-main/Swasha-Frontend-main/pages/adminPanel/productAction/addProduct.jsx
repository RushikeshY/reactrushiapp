import React, { useState } from 'react'
import { addNewProduct, makeRequest } from '../../../util/ApiClient';
import Form from './form';
import New from './new'

const AddProduct = ({setCurrent}) => {

    return (
        <Form setCurrent={setCurrent} />
    )
}

export default AddProduct