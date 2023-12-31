# project-ems-student

<!-- api doc -->

## Student

### Create Account

Create a new student account.
- **API Endpoint**: `http://localhost:3000/api/student/signup`
- **HTTP Method**: POST
- **Status Code**: 201
- **Request Body**:
```json
{
  "name": "John Doe",
  "password": "securePassword123",
  "date_of_birth": "1995-08-15",
  "class": 12
}
  ```
- **Response Body**:
```json
{
    "message": "Account created successfully"
}

 ```

signin to student account.
- **API Endpoint**: `http://localhost:3000/api/student/signin`
- **HTTP Method**: POST
- **Status Code**: 201
- **Request Body**:
  ```json
    {
        "stu_id": 904968,
        "password": "securePassword123"
    }

  ```
- **Response Body**:
```json
 {
    "message": "Authentication successful",
    "data": {
        "stu_id": 904968,
        "class": 12,
        "name": "John Doe",
        "password": "$2b$10$Hkx6B4ooPR2vvjNkzVKXkumExlXk64S2Nv1f7bSN7Zs6rRQGuOiJ2",
        "date_of_birth": "1995-08-15"
    }
}
  ```

## give exam

## Give MCQ Exam

- **API Endpoint**: `/api/student/exam/mcq/{exam_id}`
- **example API Endpoint**: `http://localhost:3000/api/student/exam/mcq/1`
- **HTTP Method**: GET
- **Request Body**: None
- **Status Code**: 200
- **Response Body**:
```json
{
    "exam": {
        "exam_id": 1,
        "class": 11,
        "total_marks": 50,
        "time": "2023-07-28T03:00:00.000Z",
        "name": "Bangla Class 11 Short Syllabus Written",
        "subject": "Bangla"
    },
    "questions": [
        {
            "question_id": 1,
            "question_stmt": "Who wrote the poem Meghnad Bodh Kabbo?",
            "option1": "Michael Madhusudan Datta",
            "option2": "Rabindranath Tagore",
            "option3": "Kazi Nazrul Islam",
            "option4": "Bibhuti Bhushon",
            "answer": "Michael Modhushudan Datta"
        },
        {
            "question_id": 3,
            "question_stmt": "Who is the national poet of Bangladesh?",
            "option1": "Jashimuddin",
            "option2": "Jibonando Das",
            "option3": "Kazi Najrul Islam",
            "option4": "Modhushudon Dutta",
            "answer": "Kazi Najrul Islam"
        }
    ]
}
```

## Submit MCQ Exam

- **API Endpoint**: `api/student/exam/mcq/{exam_id}/submit`
- **example API Endpoint**: `http://localhost:3000/api/student/exam/mcq/1/submit`
- **HTTP Method**: POST
- **Request Body**:
```json
{
  "examId": 1,
  "answers": {
    "1": "Rabindranath Tagore",
    "3": "Kazi Najrul Islam"
  }
}
 ```

- **Status Code**: 200
- **Response Body**:
```json
{
    "score": 1
}
```

