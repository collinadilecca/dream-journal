import express, { Router } from 'express';
import { Dream, DreamType } from '../models/dream';

// Defining an express router
const router: Router = Router();

// Get all the types of dreams
router.get('/', (req, res) => {
    const typesOfDream:String[] = Object.keys(DreamType);
    // console.log(typesOfDream);
    return res.status(200).json(typesOfDream);
})

// Exposing the controller functions to the application
export default router;
