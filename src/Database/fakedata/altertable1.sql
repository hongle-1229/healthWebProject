USE [data_health_web]

-- ALTER TABLE [dbo].[bodypart_symptom] DROP CONSTRAINT PK_body_...; xoá khoá chính của bảng
--ALTER TABLE [dbo].[disease_symptom] DROP CONSTRAINT PK_...;
ALTER TABLE [dbo].[bodypart_symptom] ADD BodypartSymptomID INT IDENTITY(1,1);
ALTER TABLE [dbo].[bodypart_symptom] ADD CONSTRAINT PK_bodypart_symptom PRIMARY KEY (BodypartSymptomID);
ALTER TABLE [dbo].[bodypart_symptom] ADD CONSTRAINT UQ_bodypart_symptom UNIQUE (BodypartID, SymptomID);
ALTER TABLE [dbo].[disease_symptom] ADD DiseaseSymptomID INT IDENTITY(1,1);
ALTER TABLE [dbo].[disease_symptom] ADD CONSTRAINT PK_disease_symptom PRIMARY KEY (DiseaseSymptomID);
ALTER TABLE [dbo].[disease_symptom] ADD CONSTRAINT UQ_disease_symptom UNIQUE (DiseaseID, SymptomID);

-- lấy tên khoá chính của bảng
--SELECT name
--FROM sys.key_constraints
--WHERE type = 'PK' AND parent_object_id = OBJECT_ID ('disease_symptom');