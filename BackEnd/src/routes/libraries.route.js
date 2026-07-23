import { Router } from "express";


// libraries version 1 apies

const librariesRouter = Router();

librariesRouter.get("/", (req, res) => res.send("libraries route"));

// ----- define your routes here ----


// router.get('/', (req, res) => res.send('Parent route'));   



export default librariesRouter;



// when we will improve the libraries api then we can use this

// libraries version 2 apies

// const librariesRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {librariesRouter2} ;