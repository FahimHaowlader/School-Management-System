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
authsRouter.get("/students/login", studentLogin);
authsRouter.get("/guardians/login", guardianLogin);
authsRouter.get("/teachers/login", teacherLogin);
authsRouter.get("/staffs/login", staffLogin);

authsRouter.use(verifyUser);

// Registration routes
authsRouter.post("/students/register",
    upload.single( "picture"),
    studentRegistration);

authsRouter.post("/guardians/register",
    upload.single( "picture"),
    guardianRegistration);

authsRouter.post("/teachers/register",
    upload.single( "picture"),
    teacherRegistration);

authsRouter.post("/staffs/register",
    upload.single( "picture"),
    staffRegistration);


// Token refresh routes
authsRouter.post("/students/refresh-tokens", studentRefreshToken);
authsRouter.post("/guardians/refresh-tokens", guardianRefreshToken);
authsRouter.post("/teachers/refresh-tokens", teacherRefreshToken);
authsRouter.post("/staffs/refresh-tokens", staffRefreshToken);


// Logout routes
authsRouter.post("/students/logout", studentLogout);
authsRouter.post("/guardians/logout", guardianLogout);
authsRouter.post("/teachers/logout", teacherLogout);
authsRouter.post("/staffs/logout", staffLogout);


// Change password routes
authsRouter.put("/students/change-password", changeStudentPassword);
authsRouter.put("/guardians/change-password", changeGuardianPassword);
authsRouter.put("/teachers/change-password", changeTeacherPassword);
authsRouter.put("/staffs/change-password", changeStaffPassword);

export default authsRouter;

// when we will improve the auths api then we can use this

// auths version 2 apies

// const authsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));

// export {authsRouter2} ;
