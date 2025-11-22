import express from "express";
import {
    getSkills,
    createSkill,
    getSkillById,       
    updateSkill,      
    deleteSkill,
    getExperiences,
    createExperience,
    getExperienceById,  
    updateExperience,   
    deleteExperience
} from "../controllers/about.controller.js";

const router = express.Router();

// === Skills ===
router.get("/api/skills", getSkills);          
router.post("/api/skills", createSkill);       
router.get("/api/skills/:id", getSkillById);   
router.put("/api/skills/:id", updateSkill);    
router.delete("/api/skills/:id", deleteSkill); 

// === Experiences ===
router.get("/api/experiences", getExperiences); 
router.post("/api/experiences", createExperience);       
router.get("/api/experiences/:id", getExperienceById);   
router.put("/api/experiences/:id", updateExperience);    
router.delete("/api/experiences/:id", deleteExperience); 

export default router;