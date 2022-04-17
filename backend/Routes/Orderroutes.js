import express from 'express'
import Ordercontroller from '../Controller/Ordercontroller.js'
import Orderidcontroller from '../Controller/Orderidcontroller.js'
import paycontroller from '../Controller/Paycontroller.js'
import { isAuth } from '../Utils.js'

const Orderrouter = express.Router()


Orderrouter.post('/',isAuth,Ordercontroller)
Orderrouter.get('/:id',isAuth,Orderidcontroller)
Orderrouter.put('/:id/pay',isAuth,paycontroller)

export default Orderrouter