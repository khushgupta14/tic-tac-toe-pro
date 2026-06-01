let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetButton");
let newGameButton = document.querySelector("#newButton");
let msgContainer = document.querySelector(".msg-container");
let msgWinner = document.querySelector("#msg-winner");

let startBtn = document.querySelector("#startGame");
let setupScreen = document.querySelector(".setup-container");
let gameMain = document.querySelector("#game-main");
let timerDisplay = document.querySelector("#timer");
let turnDisplay = document.querySelector("#turn-indicator");
let finalScoresDisplay = document.querySelector("#final-scores");

let gameModeDropdown = document.querySelector("#game-mode");
let p2InputGroup = document.querySelector("#p2-name").parentElement;

let turnO = true;
let count = 0;
let score1 = 0, score2 = 0;
let player1Name = "", player2Name = "";
let timer, timeLeft = 10;
let totalMatches = 1;
let currentMatch = 0;
let winsNeeded = 1;
let isVsComputer = false;
let isComputerThinking = false; 

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], 
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8],
];

const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box) => {
        if (box.innerText === "") {
            emptyBoxes.push(box);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        isComputerThinking = false; // Unlocks the board
        randomBox.click(); 
    }
};

const triggerConfetti = () => {
    const defaults = { 
        particleCount: 500,  
        spread: 70,          
        startVelocity: 90,
        zIndex: 10000        
    };

    // Bottom-Left corner
    confetti({
        ...defaults,
        angle: 60,
        origin: { x: 0, y: 1 } // y: 1 puts it at absolute lowest point
    });

    // Bottom-Right corner
    confetti({
        ...defaults,
        angle: 120,
        origin: { x: 1, y: 1 } // x: 1 is right edge, y: 1 is the bottom
    });
};

const startTimer = () => {
    clearInterval(timer);
    timeLeft = 10;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    
    timerDisplay.classList.remove("danger"); // Completely reset styles for the NEW turn
    timerDisplay.style.animation = "none";

    let currentName = turnO ? player1Name : player2Name;
    turnDisplay.innerText = `${currentName}'s Turn ${turnO ? "(O)" : "(X)"}`;

    timer = setInterval(() => {  
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;
        
        if (timeLeft <= 3 && timeLeft > 0) {
            timerDisplay.classList.add("danger");
            timerDisplay.style.animation = "";
        }
        
        if (timeLeft === 0) {
            clearInterval(timer);
            timerDisplay.style.animation = "none";
            
            setTimeout(() => {
                turnO = !turnO; // Switch turn
                alert(`Time's up! Now its ${turnO ? player1Name : player2Name}'s turn`);
                
                startTimer(); // Restart clock for next player

                if (isVsComputer && !turnO) {
                    isComputerThinking = true;
                    setTimeout(computerMove, 600);
                }
            }, 50); 
        }
    }, 1000);
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    startTimer();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
    clearInterval(timer);
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o","win-highlight");
    }
};

const showWinner = (winner, winningPattern) => {
    winningPattern.forEach((index) => {
        boxes[index].classList.add("win-highlight");
    });

    if(winner === "O") {
        score1++;
        document.querySelector("#s1").innerText = score1;
    } else {
        score2++;
        document.querySelector("#s2").innerText = score2;
    }

    currentMatch++;
    disableBoxes();

    setTimeout(() => {
        if (score1 === winsNeeded || score2 === winsNeeded || currentMatch === totalMatches) {
            if (score1 === score2) {
                document.querySelector("#msg-congrats").innerText = "WELL PLAYED!";
                msgWinner.innerText = `Series Finished! \nIt's a Tie!`;
                
            } else {
                document.querySelector("#msg-congrats").innerText = "CONGRATULATIONS!";
                let overallWinner = score1 > score2 ? player1Name : player2Name;
                msgWinner.innerText = `Series Finished! 🏆\nWinner: ${overallWinner}`;
                triggerConfetti(); 
            }

            finalScoresDisplay.innerText = `${player1Name}: ${score1}  |  ${player2Name}: ${score2}`;
            msgContainer.classList.remove("hide");
        } else {
            resetGame(); 
        }
    }, 1500); 
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return true;
            }
        }
    }
    return false;
};

// --- Event Listeners ---
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (isComputerThinking) return; 

        if (turnO) {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            timerDisplay.style.animation = "none";
            currentMatch++;
            disableBoxes();
            
            setTimeout(() => {
                if (currentMatch === totalMatches) {
                    
                    if (score1 === score2) {
                        document.querySelector("#msg-congrats").innerText = "WELL PLAYED!";
                        msgWinner.innerText = `Series Finished! \nIt's a Tie!`;
                        
                    } else {
                        document.querySelector("#msg-congrats").innerText = "CONGRATULATIONS!";
                        let overallWinner = score1 > score2 ? player1Name : player2Name;
                        msgWinner.innerText = `Series Finished! 🏆\nWinner: ${overallWinner}`;
                        triggerConfetti(); 
                    }

                    finalScoresDisplay.innerText = `${player1Name}: ${score1}  |  ${player2Name}: ${score2}`;
                    msgContainer.classList.remove("hide");
                } else {
                    resetGame();
                }
            }, 1500);
        } else if (!isWinner) {
            startTimer(); 
            
            if (isVsComputer && !turnO) {
                isComputerThinking = true; 
                setTimeout(computerMove, 600);
            }
        }
    });
});

if (gameModeDropdown) {
    gameModeDropdown.addEventListener("change", () => {
        if (gameModeDropdown.value === "pvc") {
            p2InputGroup.classList.add("hide");
            document.querySelector("#p2-name").value = "Computer"; 
        } else {
            p2InputGroup.classList.remove("hide");
            document.querySelector("#p2-name").value = ""; 
        }
    });
}

startBtn.addEventListener("click", () => {
    let p1Input = document.querySelector("#p1-name").value.trim(); // trim remove spaces outside edges of text
    let p2Input = document.querySelector("#p2-name").value.trim();

    if (gameModeDropdown) { 
        isVsComputer = (gameModeDropdown.value === "pvc"); // true if user selected pvc
    }

    if (isVsComputer && p2Input === "") {
        p2Input = "Computer";
        document.querySelector("#p2-name").value = p2Input; 
    }

    if (p1Input === "" || p2Input === "") {
        alert("Please enter names of players!");
        return;
    }

    player1Name = p1Input;
    player2Name = p2Input;
    document.querySelector("#name1").innerText = player1Name;
    document.querySelector("#name2").innerText = player2Name;
    
    totalMatches = parseInt(document.querySelector("#match-count").value);
    winsNeeded = Math.floor(totalMatches / 2) + 1; 
    currentMatch = 0; 
    if (finalScoresDisplay) finalScoresDisplay.innerText = "";
    
    setupScreen.classList.add("hide");
    gameMain.classList.remove("hide");
    startTimer();
});

newGameButton.addEventListener("click", () => {
    score1 = 0; 
    score2 = 0;
    document.querySelector("#s1").innerText = "0";
    document.querySelector("#s2").innerText = "0";

    setupScreen.classList.remove("hide"); 
    gameMain.classList.add("hide");
    msgContainer.classList.add("hide");
    
    // Instead of resetGame() we clean it manually bcz it starts the clock.
    turnO = true;
    count = 0;
    enableBoxes(); 
    clearInterval(timer);
});

resetButton.addEventListener("click", resetGame);

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !setupScreen.classList.contains("hide")) {
        event.preventDefault(); 
        startBtn.click(); 
    }
});