
const { findOne } = require('../entities/User');
const UserModel = require('../entities/User');

const create = async(user) => {
    console.log(user);
    const {  email, password } = user;

    let instance = await UserModel.find({email});
    console.log(instance);
    if(instance.length > 0){
        return 1;
    }
    
    const user1 = new UserModel(user);
    const entry = await user1.save();
    return entry;
}

const findAll = async() => {
    let instances = await UserModel.find({});
    return instances;
}

const find = async(_id) => {
    let instance = await UserModel.findOne({_id});
    return  instance;
}

const findUser = async(entry) =>{
    const { email, password } = entry;
    let instance = await UserModel.findOne({email});
    
    if(!instance){
        return 1;
    }
    else if(!instance.comparePassword(password)){
        return 2;
    }
    else{
        return instance;
    }
}

const update = async (_id, data) => {
    const instance = await UserModel.updateOne({_id}, data);
    return instance;
}

module.exports.create = create;
module.exports.find = find;
module.exports.findAll = findAll;
module.exports.findUser = findUser;
module.exports.update = update;
