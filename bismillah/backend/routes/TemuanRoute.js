import express from "express";
import {
    getTemuan,
    getTemuanById,
    saveTemuan,
    updateTemuan,
    deleteTemuan
} from "../controllers/TemuanController.js";

const router = express.Router();

router.get('/temuan', getTemuan);
router.get('/temuan/:id', getTemuanById);
router.post('/temuan', saveTemuan);
router.patch('/temuan/:id', updateTemuan);
router.delete('/temuan/:id', deleteTemuan);

export default router;