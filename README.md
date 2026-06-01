# 🎮 Tic Tac Toe Pro

A responsive, full-featured Tic Tac Toe web app built from scratch using **HTML5**, **CSS3**, and **Vanilla JavaScript** — scaling the classic game into a complete multi-match tournament experience with an AI opponent and a sleek dark dashboard.

---

## 🌐 Live Demo

> 🔗 **[View Live Demo](https://tic-tac-toe-pro-delta.vercel.app)**

---

## ✨ Features

### 🖥️ Setup Dashboard
Start matches seamlessly via a clean pre-game configuration screen to input names, select modes, and set match counts. Features global `Enter` key support for quick and accessible game launches.

### 🎮 Dual Game Modes
Challenge a friend locally in classic **Player vs Player** mode, or test your skills against an automated **Computer opponent**.

### 🏆 Tournament Series Engine
Configure a best-of-series ranging from 1 to 10 matches with automatic win-condition tracking. Scores and game state persist smoothly across all rounds without any page refreshes.

### ⏱️ Per-Turn Countdown Timer
Increases gameplay pressure with a strict 10-second countdown loop for every move. If the clock hits zero, the turn is automatically skipped and passed to the opponent.

### 🌟 Win Highlight
Clearly shows the winning move by lighting up the specific three boxes with a bright color and a smooth popping animation.

### 🎉 Confetti Celebration
Rewards ultimate victory by integrating `canvas-confetti` to trigger colorful confetti when a player clinches the entire series.

### 🌙 Dark Theme UI
Entire UI built with CSS custom variables for a modern dark aesthetic with soft shadows and rounded cards.

### 📊 Live Scoreboard & Turn Indicator
A persistent scoreboard tracks wins across all rounds, alongside a pill-shaped badge that clearly displays the active player's turn and symbol.
---

## 📁 Project Structure

```text
tic-tac-toe-pro/
│
├── index.html       # Game markup & DOM structure
├── style.css        # Dark theme, animations & CSS variables
├── app.js           # Game logic, state, timer, AI & win detection
├── .gitignore       # OS & editor exclusions
├── LICENSE          # MIT License
└── README.md        # Project documentation
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Flexbox, keyframe animations, CSS custom variables |
| Vanilla JavaScript (ES6+) | Game logic, state management, DOM event handling |
| canvas-confetti (CDN) | Confetti animation on series victory |

---

## 🚀 How to Run

1. Clone the repository:

```bash
git clone https://github.com/khushgupta14/Tic-Tac-Toe-Pro.git
```

2. Open `index.html` in any modern browser — no build step or server required!

---

## 🙏 Acknowledgments

The basic foundational logic of this game (creating the 3x3 grid and simple X/O clicks) was learned from a tutorial by **[Shraddha Khapra (Apna College)](https://www.youtube.com/@ApnaCollegeOfficial)**.

**Custom Additions:**
Building upon those basics, I independently coded and added all the above features from scratch to turn it into a complete web application.

---

## ⭐ Show Some Love

If you liked this project, drop a ⭐ on GitHub — it keeps me motivated to build more! 🚀
