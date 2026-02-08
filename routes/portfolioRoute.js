const router = require("express").Router();
const {
  Intro,
  About,
  Experience,
  Project,
  Contact,
} = require("../models/portfolioModel");
const User = require("../models/userModel");
// get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find({});
    const abouts = await About.find({});
    const experiences = await Experience.find({});
    const projects = await Project.find({});
    const contacts = await Contact.find({});

    res.status(200).json({
      intro: intros[0] || null,
      about: abouts[0] || null,
      experiences: experiences,
      projects: projects,
      contact: contacts[0] || null,
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// update intro data
router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );

    res.status(200).send({
      success: true,
      message: "Intro updated successfully",
      data: intro,
    });
  } catch (error) {
    console.error("Error updating intro:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to update intro",
    });
  }
});

// update about data
router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      {
        lottieURL: req.body.lottieURL,
        description1: req.body.description1,
        description2: req.body.description2,
        skills: req.body.skills,
      },
      { new: true },
    );

    res.status(200).send({
      success: true,
      message: "About updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("Error updating about:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to update about",
    });
  }
});

// add experience data
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body.values);
    await experience.save();

    res.status(200).send({
      success: true,
      message: "Experience added successfully",
    });
  } catch (error) {
    console.error("Error adding experience:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to add experience",
    });
  }
});

//update experience data
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body.values,
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Error updating experience:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to update experience",
    });
  }
});

//delete experience data
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      success: true,
      message: "Experience deleted successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Error deleting experience:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to delete experience",
    });
  }
});

// add project data
router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body.values);
    await project.save();

    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    console.error("Error adding project:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to add project",
    });
  }
});

//update project data
router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body.values,
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error updating project:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to update project",
    });
  }
});

//delete project data
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res.status(500).send({
      success: false,
      message: "Failed to delete project",
    });
  }
});

//update contact data
router.post("/update-contact", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Contact updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login successfully",
      });
    }
    else {
      res.status(200).send({
        data: user,
        success: false,
        message: "Invalid username or password",
      });
    }
  }
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
