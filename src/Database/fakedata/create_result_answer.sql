use [data_health_web]
alter table [dbo].[first_aid_quizz] add CorrectAnswer char(1);
-- kết quả tổng của 1 lượt làm bài
create table user_test_result(
	ResultID int primary key identity(1,1),
	UserID int ,
	TestID int,
	Score int not null,
	SubmitAt datetime2 default sysdatetime(),
	foreign key (UserID) references users(UserID) on delete cascade,
	foreign key (TestID) references first_aid_test(TestID)
);
--kết quả chi tiết từng câu
create table user_test_answer(
	AnswerID int primary key identity(1,1),
	ResultID int,
	QuizID int,
	SelectedOption char(1),
	isCorrect BIT,
	foreign key (ResultID) references user_test_result(ResultID) on delete cascade,
	foreign key (QuizID) references first_aid_quizz(QuizID) 
);