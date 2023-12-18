export type themeType =
{
   
    name:string,
    value:string
   
}
export type SideBarType =
{
   
    name:string,
    link:string
   
}
export type QuestionDataType = {
    _id:number,
    question:string
   
}
export type TagDataType = {
    _id:number,
    name:string,
    totalQuestions:number
}
type tag = 
{
    _id:number,
    name:string
}
export type FilerDataType = {
   name:string
}
export type tempQuestionDataType = {
    _id:number,
    title:string,
  
   
    upvotes:number,
    downvotes:number,
    views:number
    tags:
    {
        _id:number,
        name:string
      
     
    }[],
    author:
    {
        _id:number,
        name:string,
        picture:string

    }[],

}


