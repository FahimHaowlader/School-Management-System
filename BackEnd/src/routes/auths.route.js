import { Router } from "express";


// auths version 1 apies

const authsRouter = Router();


// ----- define your routes here ----


authsRouter.get('/', (req, res) => res.send('auths route'));
authsRouter.get('/login', (req, res) => res.send('login route'));
authsRouter.post('/register', (req, res) => res.send('register route'));   



export default authsRouter;



// when we will improve the auths api then we can use this

// auths version 2 apies

// const authsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {authsRouter2} ;