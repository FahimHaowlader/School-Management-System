import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(helmet()); // Add helmet for security headers

const allowedOrigins = [
  process.env.CLIENT_URL_PROD,  // production domain
  process.env.CLIENT_URL_DEV,   // local development
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200 // for legacy browsers
}));

app.use(express.json({ limit: '1mb' })); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: '1mb' })); // Parse URL-encoded request bodies
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser()); // Parse cookies in request headers

// ================= ROUTES (v1) =================
// import route 
import parentsRouter from "./routes/parents.route.js";
import teachersRouter from "./routes/teachers.route.js";
import staffsRouter from "./routes/staffs.route.js";
import studentsRouter from "./routes/students.route.js";
import authsRouter from "./routes/auths.route.js";
import classesRouter from "./routes/classes.route.js";
import subjectsRouter from "./routes/subjects.route.js";
import attendancesRouter from "./routes/attendances.route.js";
import marksRouter from "./routes/marks.route.js";
import feesRouter from "./routes/fees.route.js";
import paymentsRouter from "./routes/payments.route.js";
import announcementsRouter from "./routes/announcements.route.js";
import eventsRouter from "./routes/events.route.js";
import librariesRouter from "./routes/libraries.route.js";
import examsRouter from "./routes/exams.route.js";

// Mount routes
app.use("/api/v1/parents", parentsRouter);
app.use("/api/v1/teachers", teachersRouter);
app.use("/api/v1/staffs", staffsRouter);
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/auths", authsRouter);
app.use("/api/v1/classes", classesRouter);
app.use("/api/v1/subjects", subjectsRouter);
app.use("/api/v1/attendances", attendancesRouter);
app.use("/api/v1/marks", marksRouter);
app.use("/api/v1/fees", feesRouter);
app.use("/api/v1/payments", paymentsRouter);
app.use("/api/v1/announcements", announcementsRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/libraries", librariesRouter);
app.use("/api/v1/exams", examsRouter);


app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API");
});
// ================= OPTIONAL (future v2) =================
// import route 
   // import { parentsRouter2 } from "./routes/parents.route.js";

// Mount routes
  // app.use("/api/v2/parents", parentsRouter2);

export default app;
