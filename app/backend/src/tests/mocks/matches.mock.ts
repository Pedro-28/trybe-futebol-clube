export const matchesMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
];

export const createMatchMock = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

export const matchBodyMock = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const payloadMock = {
  id: 1,
  email: 'admin@admin.com',
}

export const jwtMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjY1NzIyMzcsImV4cCI6MTY2NjY1ODYzN30.RYMCQtIcvuJskE0eIKV-ZIdmdCttBgNjc-CUed71KB8';

export const tokenNotFoundMock = {
  message: 'Token not found',
};

export const invalidtokenMock = {
  message: 'Token must be a valid token',
};

export const undefinedFieldsMessageMock = {
  message: 'All fields must be filled',
};
