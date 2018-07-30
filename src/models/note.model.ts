export class NoteModel{
  id?:string;
  title:string  = null;
  description:string  = null;
  date:string = null;


  constructor(values: Object = {}){

      Object.keys(this).forEach(key =>{
        if(values.hasOwnProperty(key)) this[key] = values[key];
      });
  }
}
