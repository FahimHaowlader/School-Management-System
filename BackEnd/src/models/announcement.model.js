import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      immutable: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      immutable: true,
    },

    attachment: {
      type: String,
      trim: true,
      default: null,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Creator ID is required"],
        refPath: "createdBy.type",
        immutable: true,
      },
      type: {
        type: String,
        enum: ["Staff", "Teacher", "Admin"],
        required: [true, "Creator type is required"],
        immutable: true,
      },
    },

    audience: {
      type: [
        {
          group: {
            type: String,
            enum: [
              "all",
              "teachers",
              "allstudents",
              "students",
              "staff",
              "students&teachers",
              "students&staff",
              "teachers&staff",
              "parents",
              "students&parents",
              "teachers&parents",
            ],
            required: true,
            trim: true,
          },
          classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: function () {
              const studentGroups = [
                "students",
                "students&teachers",
                "students&staff",
                "students&parents",
                "teachers&parents",
              ];
              return this.group && studentGroups.includes(this.group);
            },
          },
        },
      ],
      required: [true, "At least one audience group is required"],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one audience group must be specified.",
      },
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
