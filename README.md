# Library Management System

A backend application for managing library operations, including member management, book catalog management, and book issuance tracking.

## Overview

This system provides RESTful APIs for managing library resources and maintaining borrowing records. It is designed using a relational database model and follows standard backend development practices.

## Features

* Member Management
* Book Management
* Book Issuance Tracking
* RESTful API Architecture
* Relational Database Design
* Dockerized PostgreSQL Environment
* Prisma ORM Integration

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Docker

## Core Entities

### Member

Represents registered library members.

### Book

Represents books available in the library catalog.

### Issuance

Tracks book borrowing and return information, linking members and books through issuance records.

## Architecture

```text
Client
   │
   ▼
Express API
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```
# Alt-Management
