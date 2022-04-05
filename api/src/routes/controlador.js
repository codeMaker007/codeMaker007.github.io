const {Router} = require ("express");
const axios = require ("axios");
const {Dog, Temperament} = require ("../db");
const {API_KEY} = process.env;
const router = Router();


/* const getApiInfo = async () => {
    const apiUrl = await axios.get (`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiInfo = await apiUrl.data.map(el => {
        
        return {
            name: el.name,
            id: el.id,
            life_span: el.life_span,
            temperament: el.temperament,
            minweight: Number(el.weight.metric.slice(0,2)),
            maxweight: Number(el.weight.metric.slice(4)),
            minheight: Number(el.height.metric.slice(0,2)),
            maxheight: Number(el.height.metric.slice(4)),
            image: "https://cdn2.thedogapi.com/images/" + el.reference_image_id + ".jpg" ,
        }
    });
    return apiInfo;
}; */

const getApiInfo = async () => {
    const apiUrl = await axios.get (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = await apiUrl.data.map(el => {
        
        return {
            name: el.name,
            id: el.id,
            life_span: el.life_span,
            temperament: el.temperament,
            minweight: Number(el.weight.metric.slice(0,2)),
            maxweight: Number(el.weight.metric.slice(4)),
            minheight: Number(el.height.metric.slice(0,2)),
            maxheight: Number(el.height.metric.slice(4)),
            image: "https://cdn2.thedogapi.com/images/" + el.reference_image_id + ".jpg" ,
        }
    });
    return apiInfo;
};






const getDbInfo = async () => {
  return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}


module.exports = {getAllDogs}