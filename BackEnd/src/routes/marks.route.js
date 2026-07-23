import { Router } from "express";


// marks version 1 apies

const marksRouter = Router();

marksRouter.get("/", (req, res) => res.send("marks route"));

// ----- define your routes here ----


// router.get('/', (req, res) => res.send('Parent route'));   



export default marksRouter;



// when we will improve the marks api then we can use this

// marks version 2 apies

// const marksRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {marksRouter2} ;