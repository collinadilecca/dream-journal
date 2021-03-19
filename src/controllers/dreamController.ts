import { Router } from "express"
import { Dream, IDream } from "../models/dream";

const router = Router();


// Get all dreams
router.get("/", async (req, res) => {
    try {
        const dreams: IDream[] = await Dream.find({}).lean();
        res.status(200).json(dreams);
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});



// Get a single dream
router.get("/:id", async (req, res) => {

    const dreamId: String = req.params.id;

    try {
        const foundDream: IDream = await Dream.findById(dreamId).lean();
        res.status(200).json(foundDream)
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});


// Create a dream
router.post("/", async (req, res) => {
    try {
        const newDream: IDream = await Dream.create(req.body);
        res.status(201).json(newDream)
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});


// Update an existing dream
router.put("/:id", async (req, res) => {
    const dreamId: String = req.params.id;

    try {
        const updatedDream: IDream = await Dream.findByIdAndUpdate(dreamId, req.body, { new: true, useFindAndModify: false}).lean();
        res.status(200).json(updatedDream);
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
})


// Delete a dream
router.delete("/:id", async (req, res) => {
    const dreamId: String = req.params.id;
    try {
        const deletedDream: IDream = await Dream.findByIdAndDelete(dreamId).lean();
        res.status(200).json(deletedDream);
    } catch (error) {
        res.status(500).send();
        console.error(error.message);
    }
})


export default router;