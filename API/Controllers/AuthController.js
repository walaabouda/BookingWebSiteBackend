import User from "../Models/User.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

//REGISTER
//REGISTER
export const Register = async (req, res, next) => {
    try {
        // Vérifier si l'email existe déjà dans la base de données
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // Si l'email existe déjà, renvoyer un message d'erreur
            return res.status(400).send("Cet e-mail est déjà utilisé");
        }

        // Vérifier si le nom d'utilisateur existe déjà dans la base de données
        const existingUsername = await User.findOne({ username: req.body.username });
        if (existingUsername) {
            // Si le nom d'utilisateur existe déjà, renvoyer un message d'erreur
            return res.status(400).send("Ce nom d'utilisateur est déjà utilisé");
        }

        // Vérifier si le mot de passe existe déjà dans la base de données
        const existingPassword = await User.findOne({ password: req.body.password });
        if (existingPassword) {
            // Si le mot de passe existe déjà, renvoyer un message d'erreur
            return res.status(400).send("Ce mot de passe est déjà utilisé");
        }

        // Si l'email n'existe pas, procéder à l'inscription de l'utilisateur
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(200).send("Création réussie de l'utilisateur");

    } catch (err) {
        next(err);
    }
};



//LOGIN
export const Login = async(req,res,next) =>
{
    try
    {
        const user = await User.findOne({username : req.body.username})
        if(!user) return next(createError(404 , "User n'existe pas !"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400 , "Mot de passe ou nom incorrecte ! "));

        //on va utiliser si il est un admin ou non et check son id aussi
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);

        //On ajoute ca pour que is admin est password ne s affiche pas dans l'affichage des infos de user
        const {password , isAdmin,...otherDetails} = user._doc;


        res.cookie("access_token",token,
        {httpOnly : true,}).status(200).json({details:{...otherDetails}, isAdmin})

    }catch(err){
        next(err)
    }
}