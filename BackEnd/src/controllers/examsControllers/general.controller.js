


const createExam = asyncHandler(async (req, res) => {
  const { examName, classId, marks } = req.body;

  // 1. Basic validation
  if (!examName || !classId || !marks) {
    throw new apiError(400, "All fields are required");
  }

  // 2. Normalize examName to lowercase (matching schema behavior)
  const normalizedExamName = examName.toLowerCase().trim();


  // 4. Create the document safely
  const exam = await Exam.create({
    examName: normalizedExamName,
    classId,
    marks,
  });
  exam.save(); // Save the document to the database

  return res
    .status(201)
    .json(new apiResponse(201, exam, "Exam created successfully"));
});

