// ஃபயர்பேஸ் கிளவுட் சேவைகளை இறக்குமதி செய்தல்
import { initializeApp } from "https://gstatic.com";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://gstatic.com";

// உன்னுடைய பிரத்யேக பாதுகாப்புச் சாவிகள்
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

// 3 கோடு மெனுவை 100% துல்லியமாக இயக்கும் மாடர்ன் குறியீடு
const menuBtn = document.getElementById("menuBtn");
const menuLinks = document.getElementById("menuLinks");

menuBtn.addEventListener("click", () => {
    if (menuLinks.style.display === "block") {
        menuLinks.style.display = "none";
    } else {
        menuLinks.style.display = "block";
    }
});

// 🌟 கிளவுட் டேட்டாபேஸில் இருந்து தகவல்களை உடனுக்குடன் (Live) இழுத்து வரும் முக்கிய பகுதி 🌟
const q = query(collection(db, "olikeetru_posts"), orderBy("timestamp", "desc"));

onSnapshot(q, (querySnapshot) => {
    const newsArea = document.getElementById("liveNewsArea");
    const archiveArea = document.getElementById("liveArchiveArea");
    
    // ஆரம்பத்தில் பகுதிகளை காலி செய்தல்
    newsArea.innerHTML = "";
    archiveArea.innerHTML = "";

    let hasNews = false;

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // 1. அண்மைச் செய்திகள் பிரிவாக இருந்தால் (news)
        if (data.category === "news") {
            hasNews = true;
            newsArea.innerHTML += `
                <div class="news-card">
                    <h4>📌 ${data.title}</h4>
                    <p>${data.description}</p>
                </div>
            `;
        } 
        // 2. மாவீரர் வரலாறு அல்லது நேரலையாக இருந்தால் (history / live)
        else {
            let sectionTitle = data.category === "history" ? "🕯️ மாவீரர் வரலாறு" : "🔴 நேரலை ஒளிபரப்பு";
            archiveArea.innerHTML += `
                <div class="service-box">
                    <h3 style="color: #ffcc00;">${data.title}</h3>
                    <p style="font-size: 13px; color: #ffcc00; margin-bottom: 5px;"><b>பிரிவு: ${sectionTitle}</b></p>
                    <p>${data.description}</p>
                </div>
            `;
        }
    });

    // செய்திகள் எதுவும் இல்லை என்றால் காட்டும் மெசேஜ்
    if (!hasNews) {
        newsArea.innerHTML = "<p style='color: #666; text-align: center;'>தற்போது புதிய செய்திகள் எதுவும் இல்லை.</p>";
    }
});
