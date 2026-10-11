<h1 align="center">Full Stack Open</h1>

<p align="center">My exercise solutions for the University of Helsinki's <a href="https://fullstackopen.com/en/">Full Stack Open</a> course, parts 0 to 4.</p>

<p align="center">
  <a href="https://phonebook-o5nx.onrender.com"><img alt="Phonebook live" src="https://img.shields.io/badge/live-phonebook%20on%20Render-46E3B7?style=flat-square&logo=render&logoColor=white"></a>
  <a href="https://fullstackopen.com/en/"><img alt="Full Stack Open" src="https://img.shields.io/badge/course-Full%20Stack%20Open%20(Helsinki)-1A1A1A?style=flat-square"></a>
</p>
<p align="center">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7%20%2F%208-646CFF?style=flat-square&logo=vite&logoColor=white">
  <img alt="Express 5" src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express">
  <img alt="Mongoose 9" src="https://img.shields.io/badge/Mongoose-9-880000?style=flat-square&logo=mongoose&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-database-47A248?style=flat-square&logo=mongodb&logoColor=white">
</p>

<p align="center"><b>Contributors</b></p>
<div align="center">
<table>
  <tr>
    <td align="center"><a href="https://github.com/comp-Ryan"><img src="https://github.com/comp-Ryan.png?size=120" width="72" height="72" alt="Ryan"></a><br/><sub><b>Ryan</b></sub><br/><sub><a href="https://github.com/comp-Ryan">@comp-Ryan</a></sub></td>
  </tr>
</table>
</div>

## What's here

| Folder | Part | What it is |
|---|---|---|
| `Part1/exercises0.1-0.6` | 0 | Notes on how a web app loads (written answers) |
| `Part1/exercises1.1-1.5`, `1.6-1.14` | 1 | React basics: components, state, event handlers |
| `Part2/exercises2.1-2.5` | 2 | Rendering collections |
| `Part2/Phonebook` | 2 | Phonebook frontend: add, filter, update and delete contacts |
| `Part2/exercises2.18-2.20` | 2 | Country search with weather, from the course's REST Countries API and OpenWeatherMap |
| `Part3` | 3 | Phonebook backend: Express + MongoDB REST API that also serves the built frontend; [live on Render](https://phonebook-o5nx.onrender.com) |
| `Part4/BlogList` | 4 | Blog list app: Express + Mongoose backend with `node --test`, and a Vite frontend |
| `practice/` | 1–4 | Code from following along with the course material |

## Phonebook (parts 2–3)

<p align="center"><img src="screenshots/phonebook.jpg" alt="The Phonebook app on Render" width="600"></p>

```mermaid
flowchart LR
  B[Browser] --> FE[React frontend<br/>built into Part3/dist]
  FE --> API[Express<br/>/api/persons]
  API --> M[Mongoose<br/>Contact model]
  M --> DB[(MongoDB)]
  classDef code fill:#1f2937,color:#fff,stroke:#1f2937
  classDef store fill:#47A248,color:#fff,stroke:#47A248
  class FE,API,M code
  class DB store
```

Routes: `GET /api/persons`, `GET /api/persons/:id`, `POST /api/persons`, `PUT /api/persons/:id`, `DELETE /api/persons/:id`.

### Adding a contact

```mermaid
flowchart TD
  P[POST /api/persons] --> V{Name and number<br/>both sent?}
  V -- no --> E1[400 name or number<br/>invalid/missing]
  V -- yes --> D{Name already<br/>in the phonebook?}
  D -- yes --> E2[400 name already exists]
  D -- no --> S[Save the contact]
  S --> OK[Return the saved contact]
  S -- validation error --> EH[Error handler]
  classDef good fill:#15803d,color:#fff,stroke:#15803d
  classDef bad fill:#b91c1c,color:#fff,stroke:#b91c1c
  class OK good
  class E1,E2,EH bad
```

### Updating a number

```mermaid
sequenceDiagram
  actor U as User
  participant FE as Phonebook UI
  participant API as Express API
  participant DB as MongoDB
  U->>FE: Add a name that already exists
  FE->>U: Confirm: replace the old number?
  U->>FE: Yes
  FE->>API: PUT /api/persons/:id
  API->>DB: Update the contact
  DB-->>API: Updated contact
  API-->>FE: 200 + contact
  FE-->>U: List and notification update
```

## Running a part

Each app folder has its own `package.json`.

```bash
cd Part3            # or Part2/Phonebook, Part4/BlogList/Backend, ...
npm install
npm run dev
```

The backends read `MONGODB_URI` (and `PORT`) from a `.env` file. `npm run build:ui` in `Part3` rebuilds the Phonebook frontend into `Part3/dist`.
