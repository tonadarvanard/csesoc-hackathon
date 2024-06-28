# User

## POST /api/user

Creates a user

body:
{
email: string,
name: string,
password: string
}

##

## GET /api/user/{id}

Returns user info with id

# Progress

## POST /api/progress

Creates a progress associated with a user

body:
{
formMatchPercent: Float
reps: int
sets: int
rpe: int?
userId: int
}

## GET /api/progress/{id}

Returns user info with id
