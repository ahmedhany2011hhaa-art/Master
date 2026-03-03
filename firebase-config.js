// ===== MASTER X ELITE - Firebase Config =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, update, get, push, set, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCd6mOpEJyiUSAAhmm2NbhT80MMY0UQJcc",
    databaseURL: "https://project-fe025bb5-b1cc-4b8f-93e-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// ===== Auth Helpers =====
export function getCurrentUserPhone() {
    const phone = localStorage.getItem('zeykor_phone');
    if (!phone) {
        window.location.href = 'login.html';
        return null;
    }
    return phone;
}

export function removeLoadingScreen() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const ls = document.getElementById('loading-screen');
            if (ls) {
                ls.style.opacity = '0';
                ls.style.visibility = 'hidden';
            }
        }, 500);
    });
    // Also try immediately
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) {
            ls.style.opacity = '0';
            ls.style.visibility = 'hidden';
        }
    }, 1500);
}

export function listenToUserBalance(callback) {
    const phone = localStorage.getItem('zeykor_phone');
    if (!phone) {
        callback(null, null);
        return;
    }
    onValue(ref(database, `master_cheat/users/${phone}`), (snap) => {
        const data = snap.val();
        if (data) {
            callback(data.balance || 0, data);
        } else {
            callback(null, null);
        }
    });
}

export function logout() {
    localStorage.removeItem('zeykor_phone');
    window.location.href = 'login.html';
}

export { ref, onValue, update, get, push, set, remove, serverTimestamp };
