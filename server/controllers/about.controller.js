import Skill from "../models/skill.model.js";
import Experience from "../models/experience.model.js";

// === Skill ===
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createSkill = async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ error: "Skill not found" });
        res.json(skill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!skill) return res.status(404).json({ error: "Skill not found" });
        res.json(skill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const deleted = await Skill.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Skill not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// === Experience ===
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createExperience = async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(201).json(experience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ error: "Experience not found" });
        res.json(experience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!experience) return res.status(404).json({ error: "Experience not found" });
        res.json(experience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const deleted = await Experience.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Experience not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};