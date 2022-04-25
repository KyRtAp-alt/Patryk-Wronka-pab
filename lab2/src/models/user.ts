import fs from 'fs';
import {Note} from "./note";
import jwt from 'jsonwebtoken'


interface DataStorage{
    notes:Note[];
    AddNote(base:any): void;
    UpdateNote(base:any): void;
    DeleteNote(base:number): void;
    LoadData(): any
    UpdateData(): void
}



class UserFile{
    notes:Note[] = []
    userID?:number;
    public AddNote(args:any){
        const note = new Note(args)
        this.notes.push(note)
        this.UpdateData()
    }

    public UpdateNote(args:any){
        for (const key in this.notes) {
            if (Object.prototype.hasOwnProperty.call(this.notes, key)) {
                const element = this.notes[key];
                if(element.id === args.id){
                    this.notes[key] = new Note(args)
                    this.UpdateData()
                    return true
                }
            }
        }
        return false
    }

    public DeleteNote(id:number){
        for (let index = 0; index < this.notes.length; index++) {
            const element = this.notes[index];
            if(element.id === id){
                this.notes.splice(index);
                this.UpdateData()
                return true
            }
        }
        return false
    }

    constructor(args:any){
        const verify = this.Verify(args.Token)
        if (verify){
            this.LoadData()
            this.userID = 1 //verify.userID;
        }else{
            const login = this.Login(args.Login,args.Password)
            if(login){
                this.LoadData()
                this.userID = 1; //login.userID
            }
        }
    }

    public async LoadData(){
        const config = await import('../config.json')
        const notes = fs.promises.readFile(config.FileDir, 'utf8')
        notes.then((notes)=>{
            Users = JSON.parse(notes);
            Users.forEach(element => {
                if(this.userID === element.userID){
                    this.notes = element.notes
                }
            });
        })
    }

    public async UpdateData(): Promise<void> {
        try {
            const config = await import('../config.json')
            Users.push(this)
            console.log(Users);
            await fs.promises.writeFile(config.FileDir, JSON.stringify(Users));
        } catch (err) {
            console.log(err)
        }
    }

    public Login(login:string,password:string){
        const com = {login:login,pass:password,notes:this.notes}
        const token = jwt.sign(JSON.stringify(com), "Bearer")
        return token
    }

    public Verify(token:string){
        try {
            const payload = jwt.verify(token, "Bearer") as any
            
            if(payload.login === "123" && payload.pass === "123"){
                return true
            }else{
                return false
            }
        } catch (error) {
            return false
        }
    }
}

let Users:UserFile[] = [];
import {MongoClient} from "mongodb";

class User{
    notes:Note[] = []
    userID?:number;
    public async AddNote(args:any){
        const config = await import('../config.json')
        const client = new MongoClient(config.DataString);
        await client.connect();
        const db = client.db("Notatki").collection("notes")
        const note = new Note(args)
        db.insertOne(note);
    }

    public UpdateNote(args:any){
        for (const key in this.notes) {
            if (Object.prototype.hasOwnProperty.call(this.notes, key)) {
                const element = this.notes[key];
                if(element.id === args.id){
                    this.notes[key] = new Note(args)
                    this.UpdateData()
                    return true
                }
            }
        }
        return false
    }

    public DeleteNote(id:number){
        for (let index = 0; index < this.notes.length; index++) {
            const element = this.notes[index];
            if(element.id === id){
                this.notes.splice(index);
                this.UpdateData()
                return true
            }
        }
        return false
    }

    constructor(args:any){
        if(args.Token != undefined){
            this.Verify(args.Token)
        }else{
            this.Login(args.Login,args.Password)
        }
    }

    public async LoadData(token:string){
        try {
            const config = await import('../config.json')
            const client = new MongoClient(config.DataString);
            await client.connect();
            const db = client.db("Notatki").collection("users")
            db.findOne({_id:token})
        } catch (err) {
            console.log(err)
        }
    }

    public async UpdateData(): Promise<void> {
        try {
            const config = await import('../config.json')
            const client = new MongoClient(config.DataString);
            await client.connect();
            const db = client.db("Notatki").collection("users")
            db.findOne({})
        } catch (err) {
            console.log(err)
        }
    }

    public async Login(login:string,password:string){
        const config = await import('../config.json')
        const client = new MongoClient(config.DataString);
        await client.connect();
        const db = client.db("Notatki").collection("users")
        const com = {login:login,pass:password}
        const user = db.findOne(com) as any
        const token = jwt.sign(JSON.stringify(user._id), "Bearer")
        return token
    }

    public Verify(token:string){
        const payload = jwt.verify(token, "Bearer") as any
        console.log(payload)
        return payload
    }
}


export {UserFile,User,DataStorage}