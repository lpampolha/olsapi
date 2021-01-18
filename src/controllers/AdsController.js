const Category = require('../models/Category')
const User = require('../models/User')
const Ad = require('../models/Ad')

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
    addAction: async(req,res)=>{
    },

    getList: async (req, res) =>{
        const ads = await Ad.find();
        const total = await Ad.countDocuments();
        let adList = [];
        
        for(let i in ads){
        const cat = await Category.findById(ads[i].category);
        const state = await User.find({id:ads.idUser});
        
        adList.push({
        id:ads[i]._id,
        title:ads[i].title,
        price:ads[i].price,
        priceNegotiable:ads[i].priceNegotiable,
        image:`${process.env.BASE}/media/${ads[i].images}.jpg`,
        state:state.name
        })
        }
        
        res.json({ads:adList , total});
        },

    getItem: async(req,res)=>{
    },

    editAction: async(req,res)=>{
    },
}