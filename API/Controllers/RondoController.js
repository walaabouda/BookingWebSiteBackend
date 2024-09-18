import Rando from "../Models/Rando.js";
import createError from 'http-errors';



//Create
//On ajoute async parcequ'on va commencer la manipulation de notre data

export const CreateRando = async (req,res,next) =>
{
    const newRando = new Rando(req.body);
    try{
        const savedRando = await newRando.save()
        res.status(200).json(savedRando)



    }catch(err){
        next(err);
    }
}

//UPDATE
export const UpdateRando = async (req,res,next) =>
{
    try{
        //On ajoute ca "{new:true})" pour quapres le update on retour the updated one pas la precedente
        const updatedRando = await Rando.findByIdAndUpdate(req.params.id , {$set : req.body},{new:true})
        res.status(200).json(updatedRando);
    }catch(err){
        next(err);
    }
}

//DELETE
export const DeleteRando = async (req,res,next) =>
{
    try{
        //On ajoute ca "{new:true})" pour quapres le update on retour the updated one pas la precedente
        await Rando.findByIdAndDelete(req.params.id)
        res.status(200).json("Rando est supprimée ! ");
    }catch(err){
        next(err);
    }
}

//GET
export const GetRando = async (req,res,next) =>
{
    try {
        const rando = await Rando.findById(req.params.id)
        res.status(200).json(rando);
    } catch (err) {
        next(err);
    }
}

//GETALL
export const GetRandos = async (req, res, next) => {
    try {
        let filter = {};

        // Récupérez tous les paramètres de requête et ajoutez-les au filtre
        Object.keys(req.query).forEach(key => {
            filter[key] = req.query[key];
        });

        const Randos = await Rando.find(filter);
        res.status(200).json(Randos);
    } catch (err) {
        next(err);
    }
};

//GETALL BY COUNT
export const countByPlace = async (req, res, next) => {
    try {
        if (!req.query.places) {
            throw new Error("No places specified in the query.");
        }

        const places = req.query.places.split(",");

        const list = await Promise.all(
            places.map(place => {
                return Rando.countDocuments({ place: place });
            })
        );

        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};
