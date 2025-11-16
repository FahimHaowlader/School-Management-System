import { Router } from "express";


// students version 1 apies

const studentsRouter = Router();


// ----- define your routes here ----


studentsRouter.get('/', (req, res) => res.send('Parent route'));   



export default studentsRouter;



// when we will improve the students api then we can use this

// students version 2 apies

// const studentsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {studentsRouter2} ;