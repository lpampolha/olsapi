const Category = require('../models/Category')
const User = require('../models/User')
const Ad = require('../models/Ad')
const State = require('../models/State')

module.exports={
    getCategories: async(req,res)=>{
        const cats = await Category.find()
        
        let categories = []

        for(let i in cats ){
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            })
        }
        
        res.json({categories})
    },
    
    addAction:async (req, res) =>{
        let token = req.body.token;
        const user = await User.findOne({token});
        
        const ads = await new Ad({
        idUser:user._id,
        state:user.state,
        category:req.body.cat,
        title:req.body.title,
        price:req.body.price,
        priceNegotiable:req.body.priceneg,
        description:req.body.desc,
        views:1,
        status:"Ativo"
        });
        ads.save();
        res.send('Ok');
    },

    getList: async (req, res) =>{
        const ads = await Ad.find();
        const total = await Ad.countDocuments();
        let adList = [];
        
        for(let i in ads){
        const state = await User.find({id:ads.idUser});
        
        adList.push({
        id:ads[i]._id,
        title:ads[i].title,
        price:ads[i].price,
        priceNegotiable:ads[i].priceNegotiable,
        image:`${process.env.BASE}/media/${ads[i].image}.jpg`,
        state:state.name
        })
        }
        
        res.json({ads:adList , total});
        },

    getItem: async(req,res)=>{
        const ads = await Ad.find();
        let adList = [];
        
        for(let i in ads){
        const state = await User.find({id:ads.idUser});
        
        adList.push({
        id:ads[i]._id,
        title:ads[i].title,
        price:ads[i].price,
        priceNegotiable:ads[i].priceNegotiable,
        image:`${process.env.BASE}/media/${ads[i].image}.jpg`,
        state:state.name
        })
        }
        
        res.json({ads:adList})
    },

    editAction: async(req,res)=>{
        const errors = validationResult(req)
            if(!errors.isEmpty()){
                res.json({error: errors.mapped()})
                return
            }

            const data = matchedData(req)

            const ad = await Ad.findOne({id: id._id})

            let updates = {}

            if(data.body){
                updates.body = data.body
            }

            if(data.idUser){
                const user = await User.findOne({user: data.user})
                if(user){
                    res.json({error: 'O usuário já existe'})
                    return
                }
                updates.user = data.user
            }

            if(data.state){
                if(mongoose.Types.ObjectId.isValid(data.state)){
                const stateCheck = await State.findById(data.state)
                if(!stateCheck){
                    res.json({error: 'Estado não existe'})
                    return
                }
                updates.state = data.state                
                }else{
                    res.json({error: 'Código de estado inválido'})
                    return
                }
            }

        res.json({})
    },
}