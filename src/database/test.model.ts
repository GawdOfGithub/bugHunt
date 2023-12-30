import {Schema,models,model,Document} from 'mongoose'

export interface ITest extends Document{
   test:number


}
const testSchema = new Schema(
    {
  
    reputation:{type:Number},
   
    }
)
const Test = models.Test || model<ITest>('Test',testSchema)
export default Test