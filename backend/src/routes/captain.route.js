import express from 'express'
import {body} from 'express-validator'
import {registerCaptain, loginCaptain, getCaptainProfile, captainLogout} from '../controllers/captain.controller.js'
import {authCaptain} from '../middlewares/auth.middleware.js'

const router = express.Router();

/**
 * @api {post} /api/captain/register Register a new captain
 * @apiName RegisterCaptain
 * @apiGroup Captain
 * 
 * @apiBody {String} email Email of the captain.
 * @apiBody {Object} fullName Full name of the captain.
 * @apiBody {String} fullName.firstName First name of the captain.
 * @apiBody {String} fullName.lastName Last name of the captain.
 * @apiBody {String} password Password of the captain.
 * @apiBody {Object} vehicle Vehicle details of the captain.
 * @apiBody {String} vehicle.color Color of the vehicle.
 * @apiBody {String} vehicle.plate Plate number of the vehicle.
 * @apiBody {Number} vehicle.capacity Capacity of the vehicle.
 * @apiBody {String} vehicle.vehicleType Type of the vehicle.
 * 
 * @apiSuccess {Object} captain Registered captain details.
 */
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],
registerCaptain
);

/**
 * @api {post} /api/captain/login Login a captain
 * @apiName LoginCaptain
 * @apiGroup Captain
 * 
 * @apiBody {String} email Email of the captain.
 * @apiBody {String} password Password of the captain.
 * 
 * @apiSuccess {String} token Authentication token.
 * @apiSuccess {Object} captain Logged in captain details.
 */
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], loginCaptain);

/**
 * @api {get} /api/captain/profile Get captain profile
 * @apiName GetCaptainProfile
 * @apiGroup Captain
 * 
 * @apiHeader {String} Authorization Bearer token.
 * 
 * @apiSuccess {Object} captain Captain profile details.
 */
router.get('/profile', authCaptain, getCaptainProfile);

/**
 * @api {get} /api/captain/logout Logout a captain
 * @apiName LogoutCaptain
 * @apiGroup Captain
 * 
 * @apiHeader {String} Authorization Bearer token.
 * 
 * @apiSuccess {String} message Logout success message.
 */
router.get('/logout', authCaptain, captainLogout);

export default router;