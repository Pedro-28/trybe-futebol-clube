export const loginBodyMock = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export const jwtMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjY1NzIyMzcsImV4cCI6MTY2NjY1ODYzN30.RYMCQtIcvuJskE0eIKV-ZIdmdCttBgNjc-CUed71KB8';

export const bodyMock = {
  token: jwtMock,
};

export const bodyMessageMock = {
  message: 'All fields must be filled',
};
