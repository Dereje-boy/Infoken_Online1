const RentsDB = require("../Databases/rents");

function AddRent(rent) {
    return RentsDB.addRent(rent);
}

function getRents() {
    return RentsDB.getRents();
}

module.exports.addRent = AddRent;
module.exports.getRents = getRents;