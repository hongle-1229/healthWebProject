use [data_health_web]
SELECT 
    'ALTER TABLE [' + TABLE_SCHEMA + '].[' + TABLE_NAME + '] ALTER COLUMN [' + COLUMN_NAME + '] NVARCHAR(' +
    CASE 
        WHEN CHARACTER_MAXIMUM_LENGTH = -1 THEN 'MAX'
        ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS VARCHAR)
    END + ')' AS AlterStatement
FROM INFORMATION_SCHEMA.COLUMNS
WHERE DATA_TYPE = 'varchar'

ALTER TABLE [dbo].[users] ALTER COLUMN [ImageUser] NVARCHAR(255)
ALTER TABLE [dbo].[users] ALTER COLUMN [UserName] NVARCHAR(50)
ALTER TABLE [dbo].[users] ALTER COLUMN [Email] NVARCHAR(100)
ALTER TABLE [dbo].[users] ALTER COLUMN [FullName] NVARCHAR(100)
ALTER TABLE [dbo].[users] ALTER COLUMN [PhoneNumber] NVARCHAR(15)
ALTER TABLE [dbo].[users] ALTER COLUMN [PassWordUser] NVARCHAR(255)
ALTER TABLE [dbo].[users] ALTER COLUMN [RoleUser] NVARCHAR(10)
ALTER TABLE [dbo].[first_aid_cases] ALTER COLUMN [Title] NVARCHAR(255)
ALTER TABLE [dbo].[first_aid_cases] ALTER COLUMN [ImageFirstAid] NVARCHAR(255)
ALTER TABLE [dbo].[first_aid_cases] ALTER COLUMN [VideoURL] NVARCHAR(255)
ALTER TABLE [dbo].[first_aid_quizz] ALTER COLUMN [ImageQuestion] NVARCHAR(255)
ALTER TABLE [dbo].[first_aid_quizz] ALTER COLUMN [OptionA] NVARCHAR(255)
ALTER TABLE [dbo].[first_aid_quizz] ALTER COLUMN [OptionB] NVARCHAR(255)
ALTER TABLE [dbo].[first_aid_quizz] ALTER COLUMN [OptionC] NVARCHAR(255)
ALTER TABLE [dbo].[first_aid_quizz] ALTER COLUMN [OptionD] NVARCHAR(255)
ALTER TABLE [dbo].[functional_food_type] ALTER COLUMN [NameType] NVARCHAR(255)
ALTER TABLE [dbo].[functional_food] ALTER COLUMN [ImageFood] NVARCHAR(255)
ALTER TABLE [dbo].[news] ALTER COLUMN [NewsTitle] NVARCHAR(255)
ALTER TABLE [dbo].[news] ALTER COLUMN [ImageNews] NVARCHAR(255)
ALTER TABLE [dbo].[news] ALTER COLUMN [SourceNews] NVARCHAR(255)
ALTER TABLE [dbo].[forum_post] ALTER COLUMN [ImagePost] NVARCHAR(255)
ALTER TABLE [dbo].[forum_post] ALTER COLUMN [PostTitle] NVARCHAR(255)
ALTER TABLE [dbo].[forum_comment] ALTER COLUMN [ImageComment] NVARCHAR(255)
ALTER TABLE [dbo].[ads] ALTER COLUMN [AdsTitle] NVARCHAR(255)
ALTER TABLE [dbo].[ads] ALTER COLUMN [ImageAds] NVARCHAR(255)
ALTER TABLE [dbo].[body_part] ALTER COLUMN [PartName] NVARCHAR(100)
ALTER TABLE [dbo].[body_part] ALTER COLUMN [ImagePart] NVARCHAR(255)
ALTER TABLE [dbo].[disease] ALTER COLUMN [DiseaseName] NVARCHAR(255)
ALTER TABLE [dbo].[symptom] ALTER COLUMN [ImageSymptom] NVARCHAR(255)
ALTER TABLE [dbo].[symptom] ALTER COLUMN [SymptomName] NVARCHAR(255)



SELECT 
    tc.CONSTRAINT_NAME, 
    tc.CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
    ON tc.CONSTRAINT_NAME = ccu.CONSTRAINT_NAME
WHERE tc.TABLE_NAME = 'first_aid_cases' AND ccu.COLUMN_NAME = 'Title';

ALTER TABLE users DROP CONSTRAINT UQ__users__C9F284561403FAD0;
ALTER TABLE users DROP CONSTRAINT check_email;
ALTER TABLE users DROP CONSTRAINT UQ__users__A9D10534ACFE4D79;
ALTER TABLE users DROP CONSTRAINT check_phone;
ALTER TABLE users DROP CONSTRAINT DF__users__RoleUser__398D8EEE;
ALTER TABLE users DROP CONSTRAINT check_role;
ALTER TABLE first_aid_cases DROP CONSTRAINT UQ__first_ai__2CB664DC7EF02AC0;
SELECT name FROM sys.tables ORDER BY name;


-- thêm lại constraint
ALTER TABLE users ADD CONSTRAINT UQ_users_UserName UNIQUE (UserName);

ALTER TABLE users ADD CONSTRAINT check_email 
CHECK (Email LIKE '%@%.%');

ALTER TABLE users ADD CONSTRAINT UQ_users_Email UNIQUE (Email);

ALTER TABLE users ADD CONSTRAINT check_phone 
CHECK (
    PhoneNumber LIKE '0%' AND 
    LEN(PhoneNumber) = 10 AND 
    PhoneNumber NOT LIKE '%[^0-9]%'
);

ALTER TABLE users ADD CONSTRAINT DF_users_RoleUser 
DEFAULT 'user' FOR RoleUser;

ALTER TABLE users ADD CONSTRAINT check_role 
CHECK (RoleUser IN ('admin', 'user', 'expert'));

ALTER TABLE first_aid_cases ADD CONSTRAINT UQ_first_aid_cases_Title UNIQUE (Title);


