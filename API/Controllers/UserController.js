import User from "../Models/User.js";
import createError from 'http-errors';


//UPDATE
export const UpdateUser = async (req,res,next) =>
{
    try{
        //On ajoute ca "{new:true})" pour quapres le update on retour the updated one pas la precedente
        const updatedUser = await User.findByIdAndUpdate(req.params.id , {$set : req.body},{new:true})
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}

//DELETE
export const DeleteUser = async (req,res,next) =>
{
    try{
        //On ajoute ca "{new:true})" pour quapres le update on retour the updated one pas la precedente
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User est supprimée ! ");
    }catch(err){
        next(err);
    }
}

//GET
export const GetUser = async (req,res,next) =>
{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}



export const GetUsers = async (req,res,next)=>{
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }