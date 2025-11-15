# Fantasy Sports Team Selector

A React-based web application that simulates a fantasy sports platform. Users can select matches, build a team of 11 players within specific constraints (credits, roles, team limits), and assign a Captain/Vice-Captain.

**Live Demo:** https://fantasy-sports-pi.vercel.app/

## 🚀 Tech Stack

* **Framework:** React 19
* **Build Tool:** Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM 6
* **State Management:** Context API + useReducer
* **Icons:** Custom SVG Components

## ✨ Features

* **Team Validation Engine:** A robust custom hook (`useTeamValidation`) that enforces:
    * **Squad Size:** Exactly 11 players.
    * **Credit Limit:** Maximum 100 credits.
    * **Team Composition:** Max 7 players from a single team.
    * **Role Constraints:** Dynamic limits for WK (1-5), BAT (3-7), AR (0-4), and BOWL (3-7).
* **Captain Selection:** Logic to assign Captain (2x points) and Vice-Captain (1.5x points) exclusive of each other.
* **Persistence:** Teams are saved to `localStorage`, ensuring data survives page reloads.
* **Responsive UI:** Mobile-first design mimicking modern fantasy apps (Dream11 style).
* **Dark Mode:** Fully supported dark/light theme toggle.

## 🛠️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd fantasy-sports
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

* `/components`: Reusable UI elements (PlayerCard, MatchCard, Toast).
* `/context`: Global state for the active team and theme settings.
* `/hooks`: Contains the core business logic (`useTeamValidation`).
* `/pages`: Main views (UpcomingMatches, PickPlayers, SelectCaptain, MyTeams).
* `/data`: Mock data handling (simulating the provided APIs).

## 📝 Assumptions

* Since the provided APIs had CORS/Availability issues, I have mocked the response structure in `src/data/mockData.ts` to ensure the app functions smoothly for the assessment.
* I used `localStorage` to simulate backend persistence for the "Save Team" feature.
