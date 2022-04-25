import { ObjectId } from "mongodb";
import {Tag} from "./tag";

class Note {
    id:number
    UserID:ObjectId
    title:string
    content:string
    createdate:Date
    tags:Tag[]
    constructor(args: any) {
        this.id = args.id
        this.title = args.title
        this.content = args.content
        this.createdate = args.createdate
        this.tags = args.tags
        this.UserID = args.UserID
    }
}

export {Note}