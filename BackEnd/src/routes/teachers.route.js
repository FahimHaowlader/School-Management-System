import { Router } from "express";


// teachers version 1 apies

const teachersRouter = Router();

teachersRouter.get("/", (req, res) => res.send("teachers route"));

// ----- define your routes here ----


// router.get('/', (req, res) => res.send('Parent route'));   



export default teachersRouter;



// when we will improve the teachers api then we can use this

// teachers version 2 apies

// const teachersRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {teachersRouter2} ;