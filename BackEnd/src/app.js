import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";



const app = express();

app.use(helmet()); // Add helmet for security headers

const allowedOrigins = [
  process.env.CLIENT_URL_PROD,  // production domain
  process.env.CLIENT_URL_DEV,  // local development
];


app.use(cors({
    origin: function(origin, callback) {
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




// import routes for different endpoints of the version 1 apis
import parentsRouter from "./routes/parents.route";
import teachersRouter from "./routes/teachers.route";
import staffsRouter from "./routes/staffs.route";
import studentsRouter from "./routes/students.route";
import authsRouter from "./routes/auths.route";
import classesRouter from "./routes/classes.route";
import subjectsRouter from "./routes/subjects.route";
import attendanceRouter from "./routes/attendance.route";
import marksRouter from "./routes/marks.route";
import feesRouter from "./routes/fees.route";
import paymentsRouter from "./routes/payments.route";
import announcementsRouter from "./routes/announcements.route";
import eventsRouter from "./routes/events.route";
import librariesRouter from "./routes/libraries.route";
import examsRouter from "./routes/exams.route";


// Use routes for different endpoints of the version 1 apis
app.use("/api/v1/parents", parentsRouter);
app.use("/api/v1/teachers", teachersRouter);
app.use("/api/v1/staffs", staffsRouter);
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/auths", authsRouter);
app.use("/api/v1/classes", classesRouter);
app.use("/api/v1/subjects", subjectsRouter);
app.use("/api/v1/attendances", attendanceRouter);
app.use("/api/v1/marks", marksRouter);
app.use("/api/v1/fees", feesRouter);
app.use("/api/v1/payments", paymentsRouter);
app.use("/api/v1/announcements", announcementsRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/libraries", librariesRouter);
app.use("/api/v1/exams", examsRouter);




// import routes for different endpoints of the version 1 apis

     // import {parentsRouter2} from "./routes/parents.route";



// Use routes for different endpoints of the version 1 apis

    // app.use("/api/v2/parents", parentsRouter2);





export default app;