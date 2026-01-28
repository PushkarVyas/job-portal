import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      experience,
      requirements,
      jobType,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !experience ||
      !requirements ||
      !jobType ||
      !position ||
      !companyId ||
      !userId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary: Number(salary),
      experienceLevel: Number(experience),
      requirements: requirements.split(","),
      jobType,
      position,
      company: companyId,
      createdBy: userId,
    });

    return res
      .status(201)
      .json({ message: "Job posted successfully", job, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(400).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "No job found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs) {
      return res.status(400).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", success: false });
  }
};
