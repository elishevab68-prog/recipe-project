# Recipe Project - Project Guidelines & Architecture

## 1. Project Overview
A full-stack recipe and user management web application built with Node.js, Express, MongoDB (Mongoose), and Joi validation.

## 2. Collections & Schemas
- **Users**: 
  - `UserName` (String, Required)
  - `Email` (String, Required, Valid Email)
  - `Password` (String, Required)
- **Recipes**: 
  - `Name` (String, Required)
  - `Description` (String, Required)
  - `Ingredients` (Array of Strings, Required)
  - `PrepTime` (Number, Required)
  - `Category` (String, Required)
  - `Image` (String, Required)

## 3. Architecture & Standards
- **Routing**: Modular routing using Express `Router`.
- **Validation**: Input validation enforced using Joi schemas via custom middleware.
- **Error Handling**: Centralized Error Handling Middleware for Express 5 using custom Error classes.
- **Git Workflow**: Strict branching model. No direct pushes to `main`. All changes go through feature branches and Pull Requests (PR).