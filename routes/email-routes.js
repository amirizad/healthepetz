'use strict';
const nodemailer = require('nodemailer');
const db = require('./../models');
const sequelize = require('sequelize');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'healthepetz@gmail.com',
        pass: 'C0deb00tcamp'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"HealthePetz" <healthepetz@gmail.com>', // sender address
    to: 'joelvanderhoof@yahoo.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log(`Message ${info.messageId} sent: ${info.response}`);
// });



// Password reset route
var passwordResetEmail = (userEmail) => {
    // Send users an email with a link to a page where they can reset their passwords
    var tempPassword = 'alsdf23450fv848';

    db.Users.update({
        password: tempPassword
    },
{
    where: {
        email: 'test.healthepetz@gmail.com'
    }
}).then((results) => {
    var ownerEmail = 'test.healthepetz@gmail.com';

    let mailOptions = {
        from: '"HealthePetz" <healthepetz@gmail.com>', // sender address
        to: ownerEmail, // list of receivers
        subject: `Password Recovery`, // Subject line
        text: `Hi,\n
        Your temporary recovery password is: ${tempPassword}.\n
        Please be sure to enter a new password after logging in.`, // plain text body
        //html: `<b>Happy birthday, ${pet.pet_name}!!!!!</b>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message ${info.messageId} sent: ${info.response}`);
    });

});
};

passwordResetEmail();

var getTodaysDate = () => {
    var today = new Date(); // get today's date
    var day = today.getDate();
    var month = today.getMonth()+1;

    if(day < 10) {
        day = '0' + day;
    }
    
    if (month < 10) {
        month = '0' + month;
    }

    today = `${month}-${day}`;
    return today;
};

var checkForBday = (pet) => {
    var petBday = pet.pet_dob;
    var today = getTodaysDate();

    petBday = petBday.slice(5);

    if (petBday === today) {
        petBirthdayReminder(pet);
    }
};

var petBirthdayReminder = (pet) => {

    db.Users.findAll({
        where: {
            id: pet.id
        }
    }).then((results) => {
        var ownerEmail = results[0].dataValues.email;
  
    let mailOptions = {
        from: '"HealthePetz" <healthepetz@gmail.com>', // sender address
        to: ownerEmail, // list of receivers
        subject: `Happy birthday ${pet.pet_name}`, // Subject line
        text: `Happy birthday, ${pet.pet_name}.`, // plain text body
        html: `<b>Happy birthday, ${pet.pet_name}!!!!!</b>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message ${info.messageId} sent: ${info.response}`);
    });

      });
};

var checkVaccinationSchedule = (pet) => {

    db.vaccinations.findAll({
        where: {
            id: pet.id
        }
    }).then((results) => {
        var vaccination = results;
        var vaccinationDate = results[0].next_vacc_dt;
        var a = new Date();
        var b = new Date(vaccinationDate);
        var millisecondDay = 1000 * 60 * 60 * 24;
        var dayDifference = (b - a) / millisecondDay;
              
        dayDifference = Math.floor(dayDifference);

        if( dayDifference <= 7 ) {
            //console.log(`You have a vaccination appointment on ${vaccinationDate}.`);
            sendVaccinationReminder(pet, vaccination);
        }
    });
};

var sendVaccinationReminder = (pet, vaccination) => {
    // console.log(pet);
    // console.log(vaccination);

    db.Users.findAll({
        where: {
            id: pet.id //User ID in pet table
        }
    }).then((results) => {

        console.log(results);
        var ownerEmail = results[0].dataValues.email;
        var ownerName = results[0].dataValues.username;
    
        let mailOptions = {
            from: '"HealthePetz" <healthepetz@gmail.com>', // sender address
            to: ownerEmail, // list of receivers
            subject: `Vaccination appointment for ${pet.pet_name}`, // Subject line
            text: `Hi ${ownerName},
            
                    You have a vaccination appointment with ${pet.vet1_name} on ${vaccination.next_vacc_dt} for ${pet.pet_name}.\n
                    Your appointment is located at:\n
                    ${pet.vet1_address}\n
                    ${pet.vet1_city}, ${pet.vet1_state} ${pet.vet1_zip}\n\n
                    Please call ${pet.vet1_phone} if you have any questions or need to reschedule.\n\n
                    See you soon!` // plain text body
            //html: `<b>Happy birthday, ${pet.pet_name}!!!!!</b>` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log(`Message ${info.messageId} sent: ${info.response}`);
        });

    });

};

// Schedule emails to go out once a day
var emailScheduler = () => {
       
   // Get all pet data
   db.pets.findAll({}).then((results) => {

        //for (var i=0; i<results.length; i++){
        //     checkVaccinationSchedule(results[0].dataValues);
        //  checkForBday(results[i].dataValues);
        //}
    })
};

// Run emailScheduler once daily at 6:00am

emailScheduler();
module.exports = transporter;