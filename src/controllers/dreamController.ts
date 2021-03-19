import e, { Router } from "express"
import { Dream, IDream, DreamType } from "../models/dream";

const router = Router();


// Get all dreams
router.get("/", async (req, res) => {
    try {
        const dreams: IDream[] = await Dream.find({}).lean();
        res.status(200).json(dreams);
    } catch (error) {
        res.status(400).send();
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
        res.status(400).send();
        console.error(error);
    }
});


// Create a dream
router.post("/", async (req, res) => {
    try {
        const newDream: IDream = await Dream.create(req.body);
        res.status(201).json(newDream)
    } catch (error) {
        res.status(400).send();
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
        res.status(400).send();
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
        res.status(400).send();
        console.error(error.message);
    }
});

// Dream search

router.get("/search", async (req, res) => {

    // Fetching the query parameters
    let title = req.query.title;
    let type = req.query.type;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    // Helper variables
    let newStartDate;
    let newEndDate;

    // Pagination and sorting parameters
    let itemsPerPage = req.query.itemsPerPage;
    let sortBy = req.query.sortBy;
    let order = req.query.order;

   
    if (title===undefined){
        title="";
    }
    if(startDate!==undefined && endDate!==undefined){
        newStartDate=new Date(startDate.toString());
        newEndDate=new Date(endDate.toString());
    }else{
        return res.status(400).send({ errMessage: "Insert valid date values" })
    }
    const foundDream = await Dream.
       find({
        $and:[ 
            {date:{$gte:newStartDate,$lte:newEndDate}} ,
            {$or:[{title:{$regex:`.*${title.toString().toLowerCase()}.*`}}]},
            {$or:[ {type:{$eq: type ? <DreamType>type.toString() : undefined}}]}
        ]
       }).limit(itemsPerPage===undefined ? 5 : Number(itemsPerPage))
       .sort({[sortBy!==undefined ?sortBy.toString() : sortBy="title"]:order}).lean();
       

    return res.status(200).send(foundDream);

});


export default router;