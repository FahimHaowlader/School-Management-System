import { Router } from "express";


// payments version 1 apies

const paymentsRouter = Router();

paymentsRouter.get("/", (req, res) => res.send("payments route"));

// ----- define your routes here ----


// router.get('/', (req, res) => res.send('Parent route'));   



export default paymentsRouter;



// when we will improve the payments api then we can use this

// payments version 2 apies

// const paymentsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {paymentsRouter2} ;