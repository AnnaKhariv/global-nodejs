import express from 'express';
export const router = express.Router();

import { saveUser } from '../services'

// router.get('/', function(req, res) {
//     res.send('Birds home page');
// });

// router.get('/about', function(req, res) {
//     res.send('About birds');
// });


router.post('/user', saveUser);
