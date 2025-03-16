---
id: index
title: "Backend Documentation"
sidebar_label: "Backend"
---

# Backend Documentation

This section contains detailed documentation about the Anytype backend, which is implemented in Go.

## Core Services

The backend contains several core services:

- **Object Store** - Manages the storage and retrieval of objects
- **Block Service** - Handles the creation, updating, and deletion of blocks
- **Middleware** - Provides communication between frontend and backend
- **Event System** - Manages the flow of events throughout the system

## Data Storage

The backend uses several storage mechanisms:

- **Local Storage** - Storage of objects and blocks on the local device
- **Object Database** - Structured storage for object metadata
- **Block Database** - Efficient storage for block content
