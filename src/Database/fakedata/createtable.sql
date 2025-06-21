USE [data_health_web]
-- Bảng người dùng
CREATE TABLE users(
	UserID INT PRIMARY KEY IDENTITY(1,1),
	ImageUser VARCHAR(255),
	UserName VARCHAR(50) UNIQUE NOT NULL,
	Email VARCHAR(100) UNIQUE NOT NULL,
	FullName VARCHAR(100),
	PhoneNumber VARCHAR(15) NOT NULL,
	PassWordUser VARCHAR(255) NOT NULL,
	RoleUser VARCHAR(10) DEFAULT 'user',
	CreateAt DATETIME2 DEFAULT SYSDATETIME()
);

ALTER TABLE users
ADD CONSTRAINT check_role CHECK (RoleUser IN ('user', 'admin', 'expert'));
ALTER TABLE users
ADD CONSTRAINT check_phone CHECK (PhoneNumber LIKE '[0-9]%');
ALTER TABLE users
ADD CONSTRAINT check_email CHECK (Email LIKE '_%@_%._%');

-- Tình huống sơ cứu
CREATE TABLE first_aid_cases(
	FirstAidID INT PRIMARY KEY IDENTITY(1,1),
	Title VARCHAR(255) NOT NULL UNIQUE,
	ImageFirstAid VARCHAR(255),
	FirstAidDescription TEXT NOT NULL,
	VideoURL VARCHAR(255),
	CommonMistake TEXT,
	CreateAt DATETIME2 DEFAULT SYSDATETIME()
);
-- Bài test của tình huống sơ cứu đó
CREATE TABLE first_aid_test(
	TestID INT PRIMARY KEY IDENTITY(1,1),
	FirstAidID INT UNIQUE, -- Mỗi tình huống có một bài kiểm tra
	Quantity INT NOT NULL,
	FOREIGN KEY (FirstAidID) REFERENCES first_aid_cases(FirstAidID) ON DELETE CASCADE -- Tự động xoá bài test khi tình huống sơ cứu bị xoá
);
-- Các câu hỏi trong bài test
CREATE TABLE first_aid_quizz (
	QuizID INT PRIMARY KEY IDENTITY(1,1),
	Question TEXT NOT NULL,
	ImageQuestion VARCHAR(255),
	OptionA VARCHAR(255) NOT NULL,
	OptionB VARCHAR(255) NOT NULL,
	OptionC VARCHAR(255) NOT NULL,
	OptionD VARCHAR(255) NOT NULL,
	TestID INT,
	FOREIGN KEY (TestID) REFERENCES first_aid_test(TestID)	ON DELETE CASCADE -- Tự động xoá các câu hỏi liên quan khi bài test bị xoá
);
-- Nhóm thực phẩm chức năng
CREATE TABLE functional_food_type(
	TypeID INT PRIMARY KEY IDENTITY(1,1),
	NameType VARCHAR(255) NOT NULL
);
-- Loại thực phẩm chức năng
CREATE TABLE functional_food(
	FunctionalFoodsID INT PRIMARY KEY IDENTITY(1,1),
	NameFood VARCHAR(255) NOT NULL,
	ImageFood VARCHAR(255),
	Benefit TEXT NOT NULL,
	Instructions TEXT NOT NULL,
	Alert TEXT NOT NULL,
	TypeID INT,
	FOREIGN KEY (TypeID) REFERENCES functional_food_type(TypeID) ON DELETE CASCADE -- Xoá tự động khi nhóm thực phẩm chức năng bị xoá
);
-- Tin tức y tế
CREATE TABLE news(
	NewsID INT PRIMARY KEY IDENTITY(1,1),
	NewsTitle VARCHAR(255) NOT NULL,
	ImageNews VARCHAR(255),
	NewsDescription TEXT NOT NULL,
	SourceNews VARCHAR(255),
	PublishAt DATE,
	CreateAt DATETIME2 DEFAULT SYSDATETIME()
);
--bài viết trên diễn đàn
CREATE TABLE forum_post(
	PostID INT PRIMARY KEY IDENTITY(1,1),
	UserID INT NOT NULL,
	ImagePost VARCHAR(255),
	PostTitle VARCHAR(255) NOT NULL,
	PostDescription TEXT NOT NULL,
	CreateAt DATETIME2 DEFAULT SYSDATETIME(),
	FOREIGN KEY (UserID)REFERENCES users(UserID) ON DELETE CASCADE
);
--comment trên diễn đàn
CREATE TABLE forum_comment(
	CommentID INT PRIMARY KEY IDENTITY(1,1),
	UserID INT NOT NULL,
	ImageComment VARCHAR(255),
	Content TEXT NOT NULL,
	CreateAt DATETIME2 DEFAULT SYSDATETIME(),
	FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE --comment bị xoá tự động nếu tài khoản người dùng bị xoá
);
--lời khuyên từ chuyên gia
CREATE TABLE advice(
	ExpertID INT PRIMARY KEY IDENTITY(1,1),
	ExpertName VARCHAR(100) NOT NULL,
	Title VARCHAR(255),
	UserID INT,
	ImageAdvice VARCHAR(255),
	Advice TEXT,
	CreateAt DATETIME2 DEFAULT SYSDATETIME()
	FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE --advice bị xoá tự động nếu tài khoản người dùng bị xoá
);
-- quảng cáo
CREATE TABLE ads(
	AdsID INT PRIMARY KEY IDENTITY(1,1),
	AdsTitle VARCHAR(255) NOT NULL,
	ImageAds VARCHAR(255),
	ContentAds TEXT,
	BeginDate DATE,
	EndDate DATE
);
ALTER TABLE ads
ADD CONSTRAINT check_date_ads CHECK (EndDate >= BeginDate);
--bộ phận cơ thể
CREATE TABLE body_part(
	BodypartID INT PRIMARY KEY IDENTITY(1,1),
	PartName VARCHAR(100) NOT NULL,
	ImagePart VARCHAR(255)
);
--tên bệnh
CREATE TABLE disease(
	DiseaseID INT PRIMARY KEY IDENTITY(1,1),
	DiseaseName VARCHAR(255) NOT NULL
);
--triệu chứng
CREATE TABLE symptom(
	SymptomID INT PRIMARY KEY IDENTITY(1,1),
	ImageSymptom VARCHAR(255),
	SymptomName VARCHAR(255) NOT NULL,
	SymptomDescription TEXT NOT NULL,
);
-- bảng trung gian ánh xạ bộ phận cơ thể với triệu chứng và bệnh lý
CREATE TABLE intermedium (
	IntermediumID INT PRIMARY KEY IDENTITY(1,1),
	DiseaseID INT UNIQUE NOT NULL,
	BodypartID INT UNIQUE NOT NULL,
	SymptomID INT UNIQUE NOT NULL,
	FOREIGN KEY (DiseaseID) REFERENCES disease(DiseaseID),
	FOREIGN KEY (BodypartID) REFERENCES body_part(BodypartID),
	FOREIGN KEY (SymptomID) REFERENCES symptom(SymptomID)
);

