import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    
    
    '/api/webhook',
   '/question',
   '/QuestionDetail/:id',
    '/tags',
    '/tags/:id',
    '/profile/:id',
    '/community',
    '/collections',
    '/jobs',
    '/'
   
    

  
  ],
  debug: false,
  ignoredRoutes:[
    '/api/webhook','/api/chatgpt', 
  ],
});

 
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/QuestionDetail/:id", 
    
  ],
};
 