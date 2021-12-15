const AdminsDB = require("../Databases/admins");

function addAdmin(admin) {
    return AdminsDB.addAdmin(admin);
}

function getAdmins () {
    return AdminsDB.allAdmins();
}

function deleteAdmin(adminInfo) {
    // return AdminsDB.deleteAdmin(adminInfo)
}
function updateAdmin(admin) {
    return AdminsDB.updateAdmin(admin)
}
function deleteAdmin(admin) {
    return AdminsDB.deleteAdmin(admin)
}



module.exports.addAdmin = addAdmin;
module.exports.getAdmins = getAdmins;
module.exports.deleteAdmin = deleteAdmin
module.exports.updateAdmin = updateAdmin
