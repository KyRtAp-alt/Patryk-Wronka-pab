import express, { json } from 'express'
import {Request, Response} from 'express'

import {UserFile,User,DataStorage} from "../models/user";

const router = express.Router()

router.use((req,res,next)=>{
    next()
})

router.post('/', async (req, res) => {
    const config = await import('../config.json')
    let user:any;
    if(config.UseDataBase){
        user = new User({Login:"123",Password:"123"})
    }else{
        user = new UserFile({Login:"123",Password:"123"})
    }
    setTimeout(() => {
        user.AddNote(req.body)
        res.sendStatus(200).send()
    }, 100)
    
})

router.get('/', async function (req: Request, res: Response) {
    const user = new UserFile({Login:"123",Password:"123"})
    setTimeout(() => {
        const data = user.notes       
        if(data.length >0 ){
            res.status(200).send(data)
        }else{
            res.status(400).send("brak")
        }
    }, 100);
});

router.get('/:id', (req, res) => {
    const user = new UserFile({Login:"123",Password:"123"})
    setTimeout(() => {
        
        var id = parseInt(req.params.id);
        user.notes.forEach((element:any) => {
            if(element.id === id){
                res.status(200).send(element)
            }
        });
        res.status(404).send()
    }, 100);
})

router.put('/:id', function (req: Request, res: Response) {
    const user = new UserFile({Login:"123",Password:"123"})
    setTimeout(() => {
        const result = user.UpdateNote({id:req.body.id,title:req.body.title,content:req.body.content,createdate:new Date,tags:req.body.tags})
        console.log(result);
        
        if(result){
            res.status(200).send(user.notes)
        }else{
            res.status(404).send()
        }
    }, 100);
});

router.delete('/:id', function (req: Request, res: Response) {
    var id = parseInt(req.params.id);
    const user = new UserFile({Login:"123",Password:"123"})
    setTimeout(() => {
        const result = user.DeleteNote(id)
        if(result){
            res.status(200).send()
        }else{
            res.status(400).send()
        }
    }, 100);
});

module.exports = router