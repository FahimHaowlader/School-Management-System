import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

// auths version 1 apies

// import route handlers

import {
  studentLogin,
  studentRegistration,
  studentLogout,
  studentRefreshToken,
  changeStudentPassword,
} from "../controllers/authsControllers/student.controller.js";

import {
  guardianLogin,
  guardianRegistration,
  guardianRefreshToken,
  guardianLogout,
  changeGuardianPassword,
} from "../controllers/authsControllers/guardian.controller.js";

import {
  teacherLogin,
  teacherRegistration,
  teacherRefreshToken,
  teacherLogout,
  changeTeacherPassword,
} from "../controllers/authsControllers/teacher.controller.js";

import {
  staffLogin,
  staffRegistration,
  staffRefreshToken,
  staffLogout,
  changeStaffPassword,
} from "../controllers/authsControllers/staff.controller.js";

const authsRouter = Router();

// ----- define your routes here ----

// Check route
authsRouter.get("/", (req, res) => res.send("auths route"));

//Login routes
authsRouter.post("/student/login", studentLogin);
authsRouter.post("/guardian/login", guardianLogin);
authsRouter.post("/teacher/login", teacherLogin);
authsRouter.post("/staff/login", staffLogin);

authsRouter.use(verifyUser);

// Token refresh routes
authsRouter.post("/student/refresh-tokens", studentRefreshToken);
authsRouter.post("/guardian/refresh-tokens", guardianRefreshToken);
authsRouter.post("/teacher/refresh-tokens", teacherRefreshToken);
authsRouter.post("/staff/refresh-tokens", staffRefreshToken);


// Logout routes
authsRouter.post("/student/logout", studentLogout);
authsRouter.post("/guardian/logout", guardianLogout);
authsRouter.post("/teacher/logout", teacherLogout);
authsRouter.post("/staff/logout", staffLogout);


// Change password routes
authsRouter.put("/student/change-password", changeStudentPassword);
authsRouter.put("/guardian/change-password", changeGuardianPassword);
authsRouter.put("/teacher/change-password", changeTeacherPassword);
authsRouter.put("/staff/change-password", changeStaffPassword);

// have to check that is it should be technician or principal 

// Registration routes
authsRouter.post("/student/register",
    upload.single( "picture"),
    studentRegistration);

authsRouter.post("/guardian/register",
    upload.single( "picture"),
    guardianRegistration);

authsRouter.post("/teacher/register",
    upload.single( "picture"),
    teacherRegistration);

authsRouter.post("/staff/register",
    upload.single( "picture"),
    staffRegistration);

export default authsRouter;

// when we will improve the auths api then we can use this

// auths version 2 apies

// const authsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));

// export {authsRouter2} ;
