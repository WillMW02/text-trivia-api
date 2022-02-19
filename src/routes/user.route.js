import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

router.post("/", UserController.getUser)

})

router.get("/:id", (req, res, next) => {
    const id = req.params.id
    // Code here finds the details of the user with the id sent through the parameter.
})
// router.get('/example', UserController.method);

export default router;
