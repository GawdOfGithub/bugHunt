import { themeType } from "."
import { SideBarType } from "."
import { QuestionDataType } from "."
import {TagDataType} from "."
import {FilerDataType} from "."
import { tempQuestionDataType } from "."

export const  theme:themeType[] =
[
    {name:"☀️Light Mode ",value:"light"},
    {name:"🌙Dark Mode",value:"dark"},
    {name:"🌓System Mode",value:"system"},
]
export const Sidebar:SideBarType[] =
[

    { name: "🏠 Home", link: "/" },
    { name: "Profile", link: "/" },
  { name: "📚 Collections", link: "/Collections" },
  { name: "👥 Community", link: "/Community" },
  
  { name: "❓ Ask a question", link: "/AskQuestion" },

]

export const TagData:TagDataType[] =  
[
  
    {_id:1,totalQuestions:5,name:"next"},
    {_id:2,totalQuestions:5,name:"javascript"},
    {_id:3,totalQuestions:5,name:"react"},
    {_id:4,totalQuestions:5,name:"angular"},
    {_id:5,totalQuestions:5,name:"svetle"},
  
]
export const HomeFilterData:FilerDataType[] =  
[
  
    {name:"newest",value:"Newest"},
    {name:"recommended",value:"recommended"},
    {name:"frequent",value:"frequent"},
    {name:"unanswered",value:"unanswered"},
   
]
export const CommunityFilterData:FilerDataType[] =  
[
  
    {name:"New Users",value:"new"},
    {name:"Old users",value:"old"},
    {name:"Top contributors",value:"top"},
   
   
]
export const QuestionFilterData:FilerDataType[] = 
[
  {name:"Most recent",value:"most_recent"},
  {name:"Oldest",value:"oldest"},
  {name:"Most Voted",value:"most_voted"},
  {name:"Most Viewed",value:"most_viewed"},
  {name:"Most Answered",value:"most_answered"},
]
