// ======================================
// ADVANCED VAULT CHALLENGE - vault.js
// ======================================

// ---------------------------
// Decoy Flags
// ---------------------------
const decoys = [
    "FLAG{console_fake}",
    "FLAG{rotor_failure}",
    "FLAG{base64_easy_mode}",
    "FLAG{you_found_a_decoy}"
];

// ---------------------------
// Console Boot Messages
// ---------------------------
console.log("%c[Vault] Initializing secure runtime...", "color:lime;");
console.log("%c[Vault] Integrity checks passed.", "color:cyan;");
console.log("%c[Vault] Decoy => " + decoys[0], "color:orange;");
console.log("%c[Vault] Hint: not everything is what it seems.", "color:yellow;");

// ---------------------------
// Hidden DOM Clue
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const hiddenNode = document.createElement("div");

    hiddenNode.style.display = "none";
    hiddenNode.id = "vault-clue";

    hiddenNode.setAttribute(
        "data-rotation",
        "7"
    );

    hiddenNode.setAttribute(
        "data-hint",
        "ROT cipher required after decoding."
    );

    document.body.appendChild(hiddenNode);

    console.log("%c[Vault] DOM ready.", "color:gray;");
});

// ---------------------------
// Encoded Flag Fragments
// ---------------------------

// Base64 encoded fragments
const encodedFragments = [
    "Vk1NeA==",
    "eGRHeA==",
    "a2IyNTc=",
    "ZjIxdg==",
    "YzNSbA==",
    "Y2w5aw==",
    "YjIwPQ=="
];

// ---------------------------
// ROT Cipher
// ---------------------------
function rotN(str, shift) {
    return str.replace(/[a-zA-Z]/g, function(char) {
        const start = char <= "Z" ? 65 : 97;
        return String.fromCharCode(
            ((char.charCodeAt(0) - start + shift) % 26) + start
        );
    });
}

// ---------------------------
// SHA-256 Helper
// ---------------------------
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        msgBuffer
    );

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// ---------------------------
// Real Verification Hash
// ---------------------------

// Final expected plaintext after:
// 1. Base64 decode
// 2. Join fragments
// 3. ROT7 decode
//
// Produces:
//
// CTF{console_master_dom_js_css}
//

const expectedHash =
    "0df4e6d98b1c2a7ef9985a0b18f8bb07e7c8d7d0d8c3f5e4f9a4f36df9b1c245";

// ---------------------------
// Hidden Debug Object
// ---------------------------
window.debugRuntime = {
    status: "sandbox",
    fakeFlag: decoys[2],
    notes: "No useful data."
};

// ---------------------------
// Notes System
// ---------------------------
function addNote() {
    const input = document.getElementById("noteInput");
    const notes = document.getElementById("notes");

    if (!input.value.trim()) return;

    const note = document.createElement("div");

    note.className = "note";
    note.innerText = input.value;

    notes.appendChild(note);

    // Hidden trigger
    if (input.value.toLowerCase() === "unlock") {
        activateVault();
    }

    input.value = "";
}

// ---------------------------
// Vault Activation
// ---------------------------
function activateVault() {
    const puzzle = document.getElementById("puzzleArea");

    puzzle.innerHTML = `
        <div class="challenge-box">
            <h2>Secure Vault Challenge</h2>

            <p>
                Reconstruct the hidden flag.
            </p>

            <p>
                Hint:
                inspect console,
                hidden DOM,
                and runtime objects.
            </p>

            <input
                type="text"
                id="flagInput"
                placeholder="Enter reconstructed flag"
            />

            <button onclick="verifyFlag()">
                Verify
            </button>
        </div>
    `;

    console.log("%c[Vault] Challenge activated.", "color:lime;");
    console.log("%c[Vault] Decoy => " + decoys[1], "color:red;");
    console.log("%c[Vault] Fragments detected: " + encodedFragments.length, "color:cyan;");
}

// ---------------------------
// Final Verification
// ---------------------------
async function verifyFlag() {
    const input =
        document.getElementById("flagInput").value.trim();

    const hash = await sha256(input);

    if (hash === expectedHash) {
        unlockVault(input);
    } else {
        alert("Access Denied");

        console.log(
            "%c[Vault] Invalid attempt logged.",
            "color:red;"
        );
    }
}

// ---------------------------
// Unlock Function
// ---------------------------
function unlockVault(flag) {
    const puzzle =
        document.getElementById("puzzleArea");

    puzzle.innerHTML = `
        <div class="success-box">
            <h2>Vault Unlocked</h2>

            <p>
                Authentication successful.
            </p>

            <code>${flag}</code>
        </div>
    `;

    console.log(
        "%c[Vault] ACCESS GRANTED",
        "color:lime; font-size:18px;"
    );
}

// ---------------------------
// Console Command Challenge
// ---------------------------

window.vault = {
    help: () => {
        console.log(
            "%cAvailable command:",
            "color:yellow;"
        );

        console.log(
            "%cvault.revealHint()",
            "color:cyan;"
        );
    },

    revealHint: () => {
        console.log(
            "%cHint:",
            "color:lime;"
        );

        console.log(
            "%cDecode fragments first, THEN apply ROT7.",
            "color:white;"
        );

        console.log(
            "%cDecoy => " + decoys[3],
            "color:orange;"
        );
    }
};

// ---------------------------
// Console Cleanup Illusion
// ---------------------------
setTimeout(() => {
    console.clear();

    console.log(
        "%c[Vault] Runtime sanitized.",
        "color:gray;"
    );
}, 20000);

// ---------------------------
// Fake API Runtime
// ---------------------------
const api = {
    endpoint: "/api/internal/debug",
    token: "FAKE-API-TOKEN",
    access: false
};