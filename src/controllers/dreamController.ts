import e, { Router } from "express"
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
});


// Delete a dream
router.delete("/:id", async (req, res) => {
    const dreamId: String = req.params.id;
    try {
        const deletedDream: IDream = await Dream.findByIdAndDelete(dreamId).lean();
        res.status(200).json(deletedDream);
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});

// Search for a dream
router.get("/search", async (req, res) => {
    let title = req.query.title;
    let type = req.query.type;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    try {
        if (startDate !== undefined && endDate !== undefined) {
            if (title !== undefined && type !== undefined) {
                const foundDreams = await Dream
                .find()
                .where('title').equals(title)
                .where('type').equals(type)
                .$where('date')
                //.where('date').gte({new Date(startDate).getTime()})
            }
            if (title !== undefined) {
                const foundDreams = await Dream
                .find()
                .where('title').equals(title).lean();
                res.status(200).json(foundDreams);
            } else if ( type !== undefined ) {
                const foundDreams = await Dream
                .find()
                .where('type').equals(type).lean()
                res.status(200).json(foundDreams);
            }
            // Add find() by date
            const foundDreams = await Dream.find(
                {date: {$gte: new Date(startDate.toString()), $lte: new Date(endDate.toString())}}).lean()
            res.status(200).json(foundDreams);
        } 
    } catch (error) {
        res.status(400).send();
        console.error(error)
    }
    

    

    
        // const foundDreams = await Dream.find({title: {}}).lean();    
});


export default router;