// ===============================
// VAULT.JS
// ===============================

const fakeFlags = ["FLAG{view_source_fail}", "FLAG{almost_had_it}", "FLAG{try_harder_recon}"];

const fragments = [
        "Q1RGew==", // CTF{
        "Y29u", // con
        "c29sZV8=", // sole_
        "bWFzdGVy", // master
        "X2RvbQ==", // _dom
        "X2pz", // _js
        "X2Nzc30=", // _css}
];

let challengeSolved = false;

console.log("%cVault System Initialized", "color: lime; font-size: 18px;");
console.log("%cWarning: Unauthorized access prohibited.", "color: red;");
console.log("%cDecoy Flag -> " + fakeFlags[0], "color: orange;");

console.log("%cHint: The truth is fragmented. Some parts are encoded.", "color: cyan;");

window.debugVault = {
        access: false,
        fakeFlag: fakeFlags[1],
        note: "Nothing useful here...",
};

function addNote() {
        const input = document.getElementById("noteInput");
        const notes = document.getElementById("notes");

        if (input.value.trim() === "") return;

        const note = document.createElement("div");
        note.className = "note";
        note.innerText = input.value;

        notes.appendChild(note);

        // Hidden trigger
        if (input.value.toLowerCase() === "unlock") {
                beginPuzzle();
        }

        input.value = "";
}

function beginPuzzle() {
        const puzzleArea = document.getElementById("puzzleArea");

        puzzleArea.innerHTML = `
        <div class="challenge-box">
            <h2>Vault Access Challenge</h2>
            <p>Decode the fragments hidden in the application.</p>
            <input type="text" id="answerInput" placeholder="Enter reconstructed flag">
            <button onclick="checkAnswer()">Submit</button>
        </div>
    `;

        console.log("%cPuzzle Activated", "color: yellow;");
        console.log("%cFragment Count: " + fragments.length, "color: lightgreen;");
}

function checkAnswer() {
        const answer = document.getElementById("answerInput").value.trim();

        const realFlag =
                atob(fragments[0]) +
                atob(fragments[1]) +
                atob(fragments[2]) +
                atob(fragments[3]) +
                atob(fragments[4]) +
                atob(fragments[5]) +
                atob(fragments[6]);

        if (answer === realFlag) {
                challengeSolved = true;
                unlockVault(realFlag);
        } else {
                alert("Access Denied");
                console.log("%cFailed Attempt", "color: red;");
        }
}

function unlockVault(flag) {
        const puzzleArea = document.getElementById("puzzleArea");

        puzzleArea.innerHTML = `
        <div class="success-box">
            <h2>Vault Opened</h2>
            <p>Congratulations.</p>
            <code>${flag}</code>
        </div>
    `;

        console.log("%cVault unlocked successfully.", "color: lime;");
}

document.addEventListener("DOMContentLoaded", () => {
        const hidden = document.createElement("div");

        hidden.style.display = "none";
        hidden.id = "meta-clue";

        hidden.setAttribute("data-clue", "Inspect the encoded fragments carefully.");

        document.body.appendChild(hidden);
});

setTimeout(() => {
        console.clear();
        console.log("%cSession sanitized.", "color: gray;");
}, 15000);

const api = {
        endpoint: "/api/v1/debug",
        token: "FAKE-TOKEN-12345",
        status: "disabled",
};