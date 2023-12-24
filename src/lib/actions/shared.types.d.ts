import { IUser } from "@/database/user.modal"
import { Schema } from "mongoose"
export interface GetQuestionParams {
    page?:number,
    pageSize?:number,
    searchQuery?:string
    filter?:string,


}
export interface CreateQuestion{
    title:string,
    content:string,
    tags:string[],
    author:Schema.Types.ObjectId | IUser
    path:string,


}
export interface GetSavedQuestionsParams{
    clerkId:string,
    page?:number,
    pageSize?:number,
    filter?:string,
    searchQuery?:string,
}
export interface GetUserStatsParam{
    userId:string,
    page?:number,
    pageSize?:number,
    searchQuery?:string
    
}
export interface DeleteUserParams{
    clerkId:string;

}
export interface UpdateUserParams{
    clerkId:string,
    updateData:{
        email:string,
        picture:string,
        username:string,
        name:string
    },
    path:string
}

export interface CreateUserParams
{
    clerkId:string,
    email:string,
    picture:string,
    username:string,
    name:string
}
export interface getQuestionById
{
    id:string
}
export interface QuestionVoteParams {
    questionId:string,
    userId:string,
    hasUpvoted:boolean,
    hasDownVoted:boolean,
    path:string


}
export interface AnswerVoteParams {
    answerId:string,
    userId:string,
    hasUpvoted:boolean,
    hasDownVoted:boolean,
    path:string


}
export interface ToggleSavedQuestionParams{
    userId:string
    questionId:string
    path:string
}
export interface ViewQuestionParams{
    questionId:string
    userId:string
}
export interface GetTopInteractedTagParams{
    userId:string
    limit?:number
}
export interface getQuestionByTagIdParams{
    tagId:string
    page?:number
    pageSize?:number
    searchQuery?:string

}
export interface GetUserByIdParams{
    userId:string
}
export interface DeleteQuestionParams{
    questionId:string
    path:string
}
export interface EditQuestParams {
questionId:string
title:string
content:string
tags:string[]
path:string
}
export interface SearchParamProps{
    searchParams:{
        q?:string
        filter?:string
        page?:number
    }
  }
  export interface getAllUsersParams{
    searchQuery?:string
    filter?:string
  }
