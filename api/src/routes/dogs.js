const { Router } = require ("express");
const { Dog, Temperament } = require("../db");
const router = Router();
const { getAllDogs,getDbInfo,getApiInfo } = require("./controlador")
const axios = require ("axios");



router.get("/", async (req, res, next) => {
    try{
        const {name} = req.query;
    let totalDogs = await getAllDogs();
    //console.dog(totalDogs)

    if (name) {
        let dogName = await totalDogs.filter (el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
        res.status(200).send(dogName):
        res.status(404).send("This dog doesn't exists")
    } else {
        res.status(200).send(totalDogs)
    }
}
catch (error){
 next(error)
}
});


router.get("/:id", async (req, res, next) => {
  
    const {id} = req.params
    //const apiDogs = await getDbInfo()
    //const apiInfo = await getApiInfo()
    
    
    if(id.length < 10){
        try{
            //console.log(id)
        const totalDogs = await getApiInfo()
        let convId = parseInt(id)
        //console.log(convId)
        let dogId = await totalDogs.filter(
            dog =>  dog.id === convId 
        )
        
        dogId.length === 0 ? res.send('id no encontrado'): res.send(dogId)
        }
        catch(error){
            next(error)
        }    
    }else{
        try{
        
            let apiInfo = await getDbInfo()
            //console.log(id)
        let createdDogs = apiInfo.filter(
            dog => dog.id === id
        )
        // //console.log(createdDogs)
        // let temp = createdDogs[0].temperaments
        // //console.log(temp)
        // let setTemp = temp.map(el => el.name)
        // let tempString = setTemp.toString()
        // console.log(tempString)
        // let objDog = [{
        // "id":createdDogs[0].id,
        // "name": createdDogs[0].name,
        // "life_span": createdDogs[0].life_span,
        // "temperament": setTemp.toString(),
        // "minweight": createdDogs[0].minheight,
        // "maxweight": createdDogs[0].maxheight,
        // "minheight": createdDogs[0].minheight,
        // "maxheight": createdDogs[0].maxheight,
        // "image": createdDogs[0].image
        // }]
        
        res.send(createdDogs)
        }
        catch(error){
            next(error)
        }    
    }
    
    
})

router.post ("/", async (req, res, next) => {
    let {name, life_span, minweight, maxweight, minheight, maxheight, image, temperament } = req.body;
    try {
        let postDog = await Dog.create ({
            name, 
            minheight,
            maxheight,
            minweight,
            maxweight,
            life_span,
            image,
          })
    let temperamentDb = await Temperament.findAll ({
        where: {name: temperament }
    })
    postDog.addTemperament(temperamentDb)
    res.send("Dog add successfully!!")
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;

