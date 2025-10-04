import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
    {
        enrollmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment",
            required: true,
        },
    
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,// carefull here because we have to find the teacherId from here and onesubject can have many teacher 
            ref: "Subject",
            required: true,
        },
    
        examType: {
            type: String,
            enum: ["classtest-1", "final-1", "classtest-2", "final-2", "classtest-3", "final-3", "quiz", "assignment"],
            required: [true, "Exam type is required"],
            trim: true,
        },
    
        obtainedMarks: {
            type: Number,
            required: [true, "Marks obtained is required"],
            min: [0, "Marks cannot be negative"],
        },
    
        totalMarks: {
            type: Number,
            required: [true, "Total marks is required"],
            min: [1, "Total marks must be at least 1"],
        },
    
        examDate: {
            type: Date,
            required: [true, "Exam date is required"],
            set: (value) => new Date(value),
        },
    },
    { timestamps: true }
  );
  

export const Mark = mongoose.model("Mark", markSchema);


