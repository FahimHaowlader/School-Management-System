import { Router } from "express";


// classes version 1 apies

const classesRouter = Router();

classesRouter.get("/", (req, res) => res.send("classes route"));

// ----- define your routes here ----


// router.get('/', (req, res) => res.send('Parent route'));   



export default classesRouter;



// when we will improve the classes api then we can use this

// classes version 2 apies

// const classesRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {classesRouter2} ;