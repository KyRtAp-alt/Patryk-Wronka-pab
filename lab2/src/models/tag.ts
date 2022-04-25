class Tag {
    id:number
    name:string
    constructor(name:string,id:number = Date.now()) {
        this.id = id
        this.name = name
    }
}

export {Tag}