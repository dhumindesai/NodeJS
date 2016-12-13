const bcrypt = require("bcryptjs");
const userList = [
    {
        username: "masterdetective123",
        firstName: "Sherlock",
        lastName: "Holmes",
        profession: "Detective",
        bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
        password:  function(password){
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
                    }("elementarymydearwatson")
    },
    {
        username: "lemon",
        firstName: "Elizabeth",
        lastName: "Lemon",
        profession: "Writer",
        bio: "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
        password:  function(password){
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
                    }("damnyoujackdonaghy")
    },
    {
        username: "theboywholived",
        firstName: "Harry",
        lastName: "Potter",
        profession: "Student",
        bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
        password: function(password){
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
                    }("quidditch")
    }
];

let exportedMethods = {
    getUser: (username) => {
        if (username === undefined) return Promise.reject("No username provided");

        let user = userList.filter(x => x.username === username).shift();
        if (!user) return Promise.reject("No user found")

        return Promise.resolve(user);
    },
    comparePassword: function(candidatePassword, hash, callback){
		bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
			if(err) throw err;
			callback(null, isMatch);
		});
	}
}

module.exports = exportedMethods;
