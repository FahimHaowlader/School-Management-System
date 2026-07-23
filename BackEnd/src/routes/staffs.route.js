import { Router } from "express";


// staffs version 1 apies

const staffsRouter = Router();

staffsRouter.get("/", (req, res) => res.send("staffs route"));

// ----- define your routes here ----


// router.get('/', (req, res) => res.send('Parent route'));   



export default staffsRouter;



// when we will improve the staffs api then we can use this

// staffs version 2 apies

// const staffsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {staffsRouter2} ;