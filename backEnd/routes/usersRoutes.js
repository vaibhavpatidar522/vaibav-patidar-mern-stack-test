const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {getUser ,getUsers  , setUsers , exportUsersCsv ,  editUser , updateStatus ,deleteUser} = require('../controller/userController')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Images'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage }).single('selectedFile'); 
  
  router.route('/').get(getUsers).post(upload, setUsers);
  router.route('/csv').get(exportUsersCsv)
  router.route('/:id').get(getUser).put( upload, editUser).delete(deleteUser)
  router.route('/status/:id').put(updateStatus)
  
   


module.exports =    router