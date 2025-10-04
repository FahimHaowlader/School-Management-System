import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Event title must be at least 3 characters"],
      maxlength: [100, "Event title cannot exceed 100 characters"],
      immutable: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      immutable: true,
    },

    startingDate: {
      type: Date,
      required: [true, "Starting date is required"],
      set: (value) => new Date(value),
      validate: [
        {
          validator: (value) => !isNaN(value.getTime?.()) || !isNaN(new Date(value).getTime()),
          message: "Invalid starting date format",
        },
        {
          validator: function (value) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return value >= today;
          },
          message: "Starting date cannot be in the past",
        },
      ],
    },

    endingDate: {
      type: Date,
      default: null,
      set: (value) => (value ? new Date(value) : null),
      validate: [
        {
          validator: function (value) {
            if (!value) return true; // allow null
            return !isNaN(value.getTime?.()) && this.startingDate && value >= this.startingDate;
          },
          message: "Ending date cannot be before starting date",
        },
      ],
    },

    startingTime: {
      type: String,
      required: [true, "Starting time is required"],
      trim: true,
      validate: {
        validator: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
        message: "Starting time must be in HH:MM format",
      },
    },

    endingTime: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Ending time must be in HH:MM format",
      },
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    type: {
      type: String,
      enum: ["academic", "cultural", "sports", "other"],
      default: "academic",
      required: true,
      trim: true,
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
        required: true,
        refPath: "createdBy.type",
        immutable: true,
      },
      type: {
        type: String,
        enum: ["Staff", "Teacher", "Admin"],
        required: true,
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
      default: [],
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
