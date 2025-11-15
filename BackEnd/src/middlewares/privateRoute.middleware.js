// privateRoute.middleware.js

export const privateRoute = (...allowedCombos) => {
  return (req, res, next) => {
    // req.user must already be set by verifyUser.middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { accountType, role } = req.user;

    // Check if any allowed combo matches current user's credentials
    const isAllowed = allowedCombos.some(
      (combo) =>
        combo.accountType === accountType &&
        combo.roles.includes(role)
    );

    if (!isAllowed) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default privateRoute;



// app.get("/teacher/dashboard",
//   verifyUser,
//   allowAccess(
//     { accountType: "teacher", roles: [
//         "junior",
//         "senior",
//         "mostsenior",
//         "head-of-subject",
//         "vice-principal",
//         "principal",
//       ]}
//   ),
//   (req, res) => res.json({ message: "Teacher dashboard" })
// );

// app.get("/staff/area",
//   verifyUser,
//   allowAccess(
//     { accountType: "staff", roles: ["normal", "librarian", "technician"] }
//   ),
//   (req, res) => res.json({ message: "Staff area" })
// );


// app.get("/teacher/supervisor-area",
//   verifyUser,
//   allowAccess(
//     { accountType: "teacher", roles: [
//       "mostsenior",
//       "head-of-subject",
//       "vice-principal",
//       "principal"
//     ]}
//   ),
//   (req, res) => res.json({ message: "Supervisor area" })
// );



// app.get("/library/manage",
//   verifyUser,
//   allowAccess(
//     { accountType: "teacher", roles: ["principal"] },
//     { accountType: "staff", roles: ["librarian"] }
//   ),
//   (req, res) => res.json({ message: "Allowed" })
// );
