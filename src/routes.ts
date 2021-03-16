import {Router} from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMaillController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

const sendMailController = new SendMaillController();

const npsController = new NpsController();

const answerController = new AnswerController();

router.post("/users", userController.create);
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendMail", sendMailController.execute)

router.get("/answers/:value", answerController.execute);

router.get("/nps", npsController.execute);

export { router };