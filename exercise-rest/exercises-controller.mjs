import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator'; 
 import * as exercises from './exercises-model.mjs';

 const app = express();

 const PORT = process.env.PORT;
 
 app.use(express.json())

// exploration-using-mongoose-to-implement-crud-operations

// CREATE controller ******************************************
app.post('/exercises', // [
   body('name').isLength({ min: 1 }),
   body('reps').notEmpty().isInt({min:1}),
   body('date').isDate(),
   body('weight').notEmpty().isInt({min:1}),
   body('unit').isString(),
  //], 
  (req,res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({error: "Invalid request"});
   }
    exercises.createExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )
    .then(exercise => {
        res.status(201).json(exercise);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Invalid request"})
    });
});

// CREATE controller ******************************************

function exerciseFilter(req) {
    let filter = {};
    if (req.query._id !== undefined) {
        filter._id = req.query._id;
    } if (req.query.name !== undefined) {
         filter.name = req.query.name;
    } if (req.query.reps !== undefined) {
         filter.reps = req.query.reps;
    } if (req.query.weight !== undefined) {
        filter.weight = req.query.weight ;
    } if (req.query.unit !== undefined) {
        filter.unit = req.query.unit;
    } 
    if (req.query.date !== undefined) {
        filter.date = req.query.date;
    } 
    return filter;
}

app.get ('/exercises', asyncHandler(async (req,res) => { 
    const filter = exerciseFilter(req);
    const result = await exercises.findExercise(filter)
    res.send(result);
}));


// RETRIEVE controller ****************************************************
// GET exercises by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', 
body('name').isLength({ min: 1 }),
   body('date').isDate(),
   body('reps').notEmpty().isInt({min:1}),
   body('weight').notEmpty().isInt({min:1}),
   body('unit').isString(),
  //], 
  (req,res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({error: "Invalid request"});
   }
//(req, res) => {
    exercises.replaceExercise(
        req.params._id, 
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date
    )

    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ 
                _id: req.params._id, 
                name: req.body.name, 
                reps: req.body.reps, 
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});