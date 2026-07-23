import { Router } from "express";


// parents version 1 apies

const parentsRouter = Router();

parentsRouter.get("/", (req, res) => res.send("parents route"));

// ----- define your routes here ----


// router.get('/', (req, res) => res.send('Parent route'));   



export default parentsRouter;



// when we will improve the parents api then we can use this

// parents version 2 apies

// const parentsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {parentsRouter2} ;