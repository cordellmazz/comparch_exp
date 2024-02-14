// import mongoose from "mongoose";
// // const baseURL = window.location.origin + '/api/';
// const baseURL = 'mongodb+srv://comparch_user:jBO61TP2flYnDNf8...123.1.`.`.`...`..`.-whats-up_programmer..`.`.`.@cluster0.ufnbvfy.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(baseURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const RunSchema = new mongoose.Schema({
//     ID: String,
//     Name: String,
//     Description: String,
// });

// const Run = mongoose.model('Run', RunSchema);

// export default Run;


// NOTES:
// - to cut out the Backend, we need to use MongoDB Realm Web SDK to connect to the database
// - otherwise it does not work.