import { initializeApp } from "https://gstatic.com";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyAIBQsv9WzcGQd4ubyW8ASDHNL3pKRl5DM",
  authDomain: "://firebaseapp.com",
  projectId: "olikeetru-media",
  storageBucket: "olikeetru-media.firebasestorage.app",
  messagingSenderId: "850267759123",
  appId: "1:850267759123:web:3dd2cb4245bd392c7415e6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function publishContent() {
    var section = document.getElementById("sectionSelect").value;
    var title = document.getElementById("contentTitle").value;
    var details = document.getElementById("contentDetails").value;
    var fileInput = document.getElementById("fileInput");
    var fileNameDisplay = document.getElementById("fileNameDisplay");

    if (title === "" || details === "") {
        alert("தயவுசெய்து தலைப்பு மற்றும் விபரங்களை உள்ளிடவும்!");
        return;
    }

    try {
        await addDoc(collection(db, "olikeetru_posts"), {
            category: section,
            title: title,
            description: details,
            timestamp: serverTimestamp()
        });
        
        alert("வாழ்த்துகள்! தகவல்கள் பாதுகாப்பாக உனது கிளவுட் தரவுத்தளத்தில் பதிவேற்றப்பட்டது.");
        
        document.getElementById("contentTitle").value = "";
        document.getElementById("contentDetails").value = "";
        fileInput.value = "";
        fileNameDisplay.textContent = "No file chosen";
        fileNameDisplay.style.color = "#aaa";

    } catch (e) {
        console.error("Error adding document: ", e);
        alert("தரவைச் சேமிப்பதில் சிக்கல் ஏற்பட்டுள்ளது!");
    }
}

// பப்ளிஷ் பட்டனை மட்டும் இதனுடன் இணைக்கிறோம்
document.getElementById("publishBtn").addEventListener("click", publishContent);
