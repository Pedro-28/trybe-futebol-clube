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

export const undefinedFieldsMessageMock = {
  message: 'All fields must be filled',
};

export const incorrectFieldsMessageMock = {
  message: 'Incorrect email or password',
};

export const incorrectLoginBodyMock = {
  email: 'incorrect@incorrect.com',
  password: 'incorrect_secret'
}

export const payloadMock = {
  id: userMock.email,
  email: userMock.id,
}

export const tokenNotFoundMock = {
  message: 'Token not found',
};

export const invalidtokenMock = {
  message: 'Token must be a valid token',
};

export const unknownUserMock = {
  message: 'Unknown user',
};
