function setupNewUser(info, callback) {
    var user = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    };

    try {
        Database.save(user, callback); // irrelevant
    }
    catch (err) {
        callback(err);
    }
}

Database = {
    save: () => {
        return;
    }
}

module.exports = {
	setupNewUser, Database
};