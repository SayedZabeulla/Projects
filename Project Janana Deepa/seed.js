// seed.js
const { MongoClient, ObjectId } = require('mongodb');

// --- IMPORTANT ---
// Replace the placeholder URI with your actual MongoDB Atlas connection string.
// Make sure to replace <username> and <password> with your database user credentials.
const uri = "mongodb+srv://projectSDGOwner:%40321_SdgNm%237@projectsdgcluster.q2hep0w.mongodb.net/?retryWrites=true&w=majority&appName=projectSDGCluster";
// -----------------

const client = new MongoClient(uri);

// Sample data for our collections
const users = [
    {
        _id: new ObjectId(),
        fullName: "Sayed Zabiulla",
        grade: 7,
        languagePreference: "english",
        // In a real app, passwords should be securely hashed
        password: "hashed_password_syed", 
        createdAt: new Date()
    },
    {
        _id: new ObjectId(),
        fullName: "CH Sairam",
        grade: 8,
        languagePreference: "kannada",
        password: "hashed_password_sai",
        createdAt: new Date()
    }
];

const modules = [
    {
        _id: new ObjectId(),
        subject: "Science",
        grade: 8,
        chapter: "Cell Structure and Functions",
        title: "The Cell Membrane",
        content_en: "The cell membrane, or plasma membrane, is a biological membrane that separates the interior of all cells from the outside environment. It is selectively permeable.",
        content_kn: "ಕೋಶ ಪೊರೆಯು, ಅಥವಾ ಪ್ಲಾಸ್ಮಾ ಪೊರೆಯು, ಎಲ್ಲಾ ಕೋಶಗಳ ಒಳಭಾಗವನ್ನು ಹೊರಗಿನ ಪರಿಸರದಿಂದ ಬೇರ್ಪಡಿಸುವ ಒಂದು ಜೈವಿಕ ಪೊರೆಯಾಗಿದೆ. ಇದು ಆಯ್ದುಕೊಂಡು ಪ್ರವೇಶಸಾಧ್ಯವಾಗಿದೆ.",
        imageUrl: "/images/cell_membrane.png"
    },
    {
        _id: new ObjectId(),
        subject: "Science",
        grade: 8,
        chapter: "Cell Structure and Functions",
        title: "Mitochondria: Powerhouse of the Cell",
        content_en: "Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell's biochemical reactions.",
        content_kn: "ಮೈಟೊಕಾಂಡ್ರಿಯಾಗಳು ಕೋಶದ ಜೀವರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳಿಗೆ ಬೇಕಾದ ಹೆಚ್ಚಿನ ರಾಸಾಯನಿಕ ಶಕ್ತಿಯನ್ನು ಉತ್ಪಾದಿಸುವ ಪೊರೆಯಿಂದ ಕೂಡಿದ ಕೋಶ ಅಂಗಗಳಾಗಿವೆ.",
        imageUrl: "/images/mitochondria.png"
    }
];

const quizzes = [
    // Quizzes for the "Cell Membrane" module
    {
        moduleId: modules[0]._id, // Links to the first module
        question_en: "What is the primary function of the cell membrane?",
        question_kn: "ಕೋಶ ಪೊರೆಯ ಪ್ರಾಥಮಿಕ ಕಾರ್ಯವೇನು?",
        options_en: ["Energy production", "Separation and protection", "Protein synthesis"],
        options_kn: ["ಶಕ್ತಿ ಉತ್ಪಾದನೆ", "ಬೇರ್ಪಡಿಸುವಿಕೆ ಮತ್ತು ರಕ್ಷಣೆ", "ಪ್ರೋಟೀನ್ ಸಂಶ್ಲೇಷಣೆ"],
        correctOptionIndex: 1
    },
    // Quizzes for the "Mitochondria" module
    {
        moduleId: modules[1]._id, // Links to the second module
        question_en: "Which organelle is known as the 'powerhouse of the cell'?",
        question_kn: "ಯಾವ ಅಂಗವನ್ನು 'ಕೋಶದ ಶಕ್ತಿ ಕೇಂದ್ರ' ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ?",
        options_en: ["Nucleus", "Ribosome", "Mitochondria"],
        options_kn: ["ನ್ಯೂಕ್ಲಿಯಸ್", "ರೈಬೋಸೋಮ್", "ಮೈಟೊಕಾಂಡ್ರಿಯಾ"],
        correctOptionIndex: 2
    }
];

const userProgress = [
    {
        userId: users[0]._id, // Links to Syed
        moduleId: modules[0]._id, // Links to Cell Membrane module
        score: 1.0, // 100% correct
        status: "completed",
        lastAttemptedAt: new Date()
    }
];


async function run() {
    try {
        await client.connect();
        console.log("✅ Successfully connected to MongoDB Atlas!");

        const database = client.db("JnanaDeepaDB"); // This will create the DB if it doesn't exist

        // Get collection handles
        const usersCollection = database.collection("users");
        const modulesCollection = database.collection("modules");
        const quizzesCollection = database.collection("quizzes");
        const userProgressCollection = database.collection("userProgress");
        
        // Clear existing data to prevent duplicates on re-run
        console.log("🧹 Clearing existing data...");
        await usersCollection.deleteMany({});
        await modulesCollection.deleteMany({});
        await quizzesCollection.deleteMany({});
        await userProgressCollection.deleteMany({});

        // Insert the new sample data
        console.log("🌱 Inserting new sample data...");
        await usersCollection.insertMany(users);
        await modulesCollection.insertMany(modules);
        await quizzesCollection.insertMany(quizzes);
        await userProgressCollection.insertMany(userProgress);

        console.log("🚀 Database has been successfully seeded!");

    } catch (error) {
        console.error("❌ An error occurred:", error);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.log("🔌 Connection closed.");
    }
}

run().catch(console.dir);