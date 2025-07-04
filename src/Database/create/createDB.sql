USE [master]
GO
/****** Object:  Database [data_health_web]    Script Date: 6/21/2025 3:16:23 PM ******/
CREATE DATABASE [data_health_web]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'data_health_web', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\data_health_web.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'data_health_web_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\data_health_web_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [data_health_web] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [data_health_web].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [data_health_web] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [data_health_web] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [data_health_web] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [data_health_web] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [data_health_web] SET ARITHABORT OFF 
GO
ALTER DATABASE [data_health_web] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [data_health_web] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [data_health_web] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [data_health_web] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [data_health_web] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [data_health_web] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [data_health_web] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [data_health_web] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [data_health_web] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [data_health_web] SET  DISABLE_BROKER 
GO
ALTER DATABASE [data_health_web] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [data_health_web] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [data_health_web] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [data_health_web] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [data_health_web] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [data_health_web] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [data_health_web] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [data_health_web] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [data_health_web] SET  MULTI_USER 
GO
ALTER DATABASE [data_health_web] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [data_health_web] SET DB_CHAINING OFF 
GO
ALTER DATABASE [data_health_web] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [data_health_web] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [data_health_web] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [data_health_web] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [data_health_web] SET QUERY_STORE = ON
GO
ALTER DATABASE [data_health_web] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [data_health_web]
GO
/****** Object:  Table [dbo].[ads]    Script Date: 6/21/2025 3:16:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ads](
	[AdsID] [int] IDENTITY(1,1) NOT NULL,
	[AdsTitle] [nvarchar](255) NULL,
	[ImageAds] [nvarchar](255) NULL,
	[ContentAds] [text] NULL,
	[BeginDate] [date] NULL,
	[EndDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[AdsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[body_part]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[body_part](
	[BodypartID] [int] IDENTITY(1,1) NOT NULL,
	[PartName] [nvarchar](100) NULL,
	[ImagePart] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[BodypartID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cart_item]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart_item](
	[CartItemID] [int] IDENTITY(1,1) NOT NULL,
	[CartID] [int] NOT NULL,
	[FunctionalFoodsID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CartItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[CartID] ASC,
	[FunctionalFoodsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[carts]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[carts](
	[CartID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[CreateAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[CartID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[disease]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[disease](
	[DiseaseID] [int] IDENTITY(1,1) NOT NULL,
	[DiseaseName] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[DiseaseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[first_aid_cases]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[first_aid_cases](
	[FirstAidID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NULL,
	[ImageFirstAid] [nvarchar](255) NULL,
	[VideoURL] [nvarchar](255) NULL,
	[CreateAt] [datetime2](7) NULL,
	[FirstAidDescription] [nvarchar](max) NULL,
	[CommonMistake] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[FirstAidID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_first_aid_cases_Title] UNIQUE NONCLUSTERED 
(
	[Title] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[first_aid_quizz]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[first_aid_quizz](
	[QuizID] [int] IDENTITY(1,1) NOT NULL,
	[Question] [nvarchar](max) NULL,
	[ImageQuestion] [nvarchar](255) NULL,
	[OptionA] [nvarchar](255) NULL,
	[OptionB] [nvarchar](255) NULL,
	[OptionC] [nvarchar](255) NULL,
	[OptionD] [nvarchar](255) NULL,
	[TestID] [int] NULL,
	[CorrectAnswer] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[QuizID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[first_aid_test]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[first_aid_test](
	[TestID] [int] IDENTITY(1,1) NOT NULL,
	[FirstAidID] [int] NULL,
	[Quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[FirstAidID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[forum_comment]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[forum_comment](
	[CommentID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[ImageComment] [nvarchar](255) NULL,
	[Content] [text] NOT NULL,
	[CreateAt] [datetime2](7) NULL,
	[PostID] [int] NOT NULL,
	[Reply] [text] NULL,
	[LevelReply] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[forum_post]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[forum_post](
	[PostID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[ImagePost] [nvarchar](255) NULL,
	[PostTitle] [nvarchar](255) NULL,
	[PostDescription] [text] NOT NULL,
	[CreateAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[PostID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[functional_food]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[functional_food](
	[FunctionalFoodsID] [int] IDENTITY(1,1) NOT NULL,
	[NameFood] [nvarchar](255) NULL,
	[ImageFood] [nvarchar](255) NULL,
	[Benefit] [nvarchar](max) NULL,
	[Instructions] [nvarchar](max) NULL,
	[Alert] [nvarchar](max) NULL,
	[TypeID] [int] NULL,
	[PriceFoods] [numeric](18, 0) NOT NULL,
	[Rating] [float] NULL,
	[Sold] [float] NULL,
	[Discount] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[FunctionalFoodsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[functional_food_type]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[functional_food_type](
	[TypeID] [int] IDENTITY(1,1) NOT NULL,
	[NameType] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[TypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[intermedium]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[intermedium](
	[IntermediumID] [int] IDENTITY(1,1) NOT NULL,
	[DiseaseID] [int] NOT NULL,
	[BodypartID] [int] NOT NULL,
	[SymptomID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IntermediumID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[BodypartID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[DiseaseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[SymptomID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[news]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[news](
	[NewsID] [int] IDENTITY(1,1) NOT NULL,
	[NewsTitle] [nvarchar](255) NULL,
	[ImageNews] [nvarchar](255) NULL,
	[NewsDescription] [nvarchar](max) NULL,
	[SourceNews] [nvarchar](255) NULL,
	[PublishAt] [date] NULL,
	[CreateAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[NewsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[symptom]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[symptom](
	[SymptomID] [int] IDENTITY(1,1) NOT NULL,
	[ImageSymptom] [nvarchar](255) NULL,
	[SymptomName] [nvarchar](255) NULL,
	[SymptomDescription] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SymptomID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_test_answer]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_test_answer](
	[AnswerID] [int] IDENTITY(1,1) NOT NULL,
	[ResultID] [int] NULL,
	[QuizID] [int] NULL,
	[SelectedOption] [char](1) NULL,
	[isCorrect] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[AnswerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_test_result]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_test_result](
	[ResultID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[TestID] [int] NULL,
	[Score] [int] NOT NULL,
	[SubmitAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[ResultID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 6/21/2025 3:16:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[ImageUser] [nvarchar](255) NULL,
	[UserName] [nvarchar](50) NULL,
	[Email] [nvarchar](100) NULL,
	[FullName] [nvarchar](100) NULL,
	[PhoneNumber] [nvarchar](15) NULL,
	[PassWordUser] [nvarchar](255) NULL,
	[RoleUser] [nvarchar](10) NULL,
	[CreateAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_users_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_users_UserName] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[carts] ADD  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[first_aid_cases] ADD  DEFAULT (sysdatetime()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[forum_comment] ADD  DEFAULT (sysdatetime()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[forum_post] ADD  DEFAULT (sysdatetime()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[news] ADD  DEFAULT (sysdatetime()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[user_test_result] ADD  DEFAULT (sysdatetime()) FOR [SubmitAt]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_RoleUser]  DEFAULT ('user') FOR [RoleUser]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT (sysdatetime()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[cart_item]  WITH CHECK ADD FOREIGN KEY([CartID])
REFERENCES [dbo].[carts] ([CartID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[cart_item]  WITH CHECK ADD FOREIGN KEY([FunctionalFoodsID])
REFERENCES [dbo].[functional_food] ([FunctionalFoodsID])
GO
ALTER TABLE [dbo].[carts]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[users] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[first_aid_quizz]  WITH CHECK ADD FOREIGN KEY([TestID])
REFERENCES [dbo].[first_aid_test] ([TestID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[first_aid_test]  WITH CHECK ADD FOREIGN KEY([FirstAidID])
REFERENCES [dbo].[first_aid_cases] ([FirstAidID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[forum_comment]  WITH CHECK ADD FOREIGN KEY([PostID])
REFERENCES [dbo].[forum_post] ([PostID])
GO
ALTER TABLE [dbo].[forum_comment]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[users] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[forum_post]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[users] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[functional_food]  WITH CHECK ADD FOREIGN KEY([TypeID])
REFERENCES [dbo].[functional_food_type] ([TypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[intermedium]  WITH CHECK ADD FOREIGN KEY([BodypartID])
REFERENCES [dbo].[body_part] ([BodypartID])
GO
ALTER TABLE [dbo].[intermedium]  WITH CHECK ADD FOREIGN KEY([DiseaseID])
REFERENCES [dbo].[disease] ([DiseaseID])
GO
ALTER TABLE [dbo].[intermedium]  WITH CHECK ADD FOREIGN KEY([SymptomID])
REFERENCES [dbo].[symptom] ([SymptomID])
GO
ALTER TABLE [dbo].[user_test_answer]  WITH CHECK ADD FOREIGN KEY([QuizID])
REFERENCES [dbo].[first_aid_quizz] ([QuizID])
GO
ALTER TABLE [dbo].[user_test_answer]  WITH CHECK ADD FOREIGN KEY([ResultID])
REFERENCES [dbo].[user_test_result] ([ResultID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[user_test_result]  WITH CHECK ADD FOREIGN KEY([TestID])
REFERENCES [dbo].[first_aid_test] ([TestID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[user_test_result]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[users] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ads]  WITH CHECK ADD  CONSTRAINT [check_date_ads] CHECK  (([EndDate]>=[BeginDate]))
GO
ALTER TABLE [dbo].[ads] CHECK CONSTRAINT [check_date_ads]
GO
ALTER TABLE [dbo].[cart_item]  WITH CHECK ADD CHECK  (([Quantity]>(0)))
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [check_email] CHECK  (([Email] like '%@%.%'))
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [check_email]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [check_phone] CHECK  (([PhoneNumber] like '0%' AND len([PhoneNumber])=(10) AND NOT [PhoneNumber] like '%[^0-9]%'))
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [check_phone]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [check_role] CHECK  (([RoleUser]='expert' OR [RoleUser]='user' OR [RoleUser]='admin'))
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [check_role]
GO
USE [master]
GO
ALTER DATABASE [data_health_web] SET  READ_WRITE 
GO
