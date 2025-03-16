---
id: anytype_documentation
title: "Anytype: Technical Documentation and Architecture Analysis"
sidebar_label: "Main Documentation"
---

# Anytype: Technical Documentation and Architecture Analysis

## Overview

Anytype is a privacy-focused, offline-first personal knowledge management system that allows users to create, connect, and organize information using various object types and relationships. The application is built with a distributed architecture that supports local-first operation with optional sync capabilities.

This documentation provides a comprehensive analysis of the Anytype codebase, including its architecture, components, and how they interact with each other.

> **Note:** This document provides a high-level overview of the Anytype system. For more detailed analysis of specific components, refer to the component-specific documentation files in the `component_docs/` directory.

## Project Structure

The Anytype project is composed of several key components:

1. **anytype-ts**: The frontend application built with TypeScript, Electron, and React
2. **anytype-heart**: The backend core engine written in Go
3. **any-block**: Protocol definitions for data structures and communications
4. **anysync**: Synchronization infrastructure components
5. **any-sync-dockercompose**: Docker setup for running the sync infrastructure

Each component plays a specific role in the overall system and communicates with others through well-defined interfaces.

## Component Analysis

### anytype-ts

Anytype-ts is the official Anytype client for MacOS, Linux, and Windows. It serves as the frontend application that users interact with directly. This component is built using:

- **TypeScript/JavaScript**: For application logic
- **Electron**: To create a cross-platform desktop application
- **React**: For the user interface

The application is designed to communicate with the anytype-heart middleware, which handles core functionality and data management.

#### Directory Structure

The frontend code is organized as follows:

- **src/ts/**: Contains the TypeScript source code
  - **app.tsx**: Main application entry point
  - **component/**: React components
  - **model/**: Data models
  - **store/**: State management
  - **interface/**: TypeScript interfaces
  - **lib/**: Utility functions and libraries
  - **hook/**: React hooks

The frontend follows a component-based architecture with React, using MobX for state management. The main application is initialized in `app.tsx`, which sets up the React router, event handlers, and core application state.

#### Key Features

- Cross-platform desktop application support using Electron
- React-based user interface with a component-driven architecture
- MobX for state management
- Communication with the middleware via IPC (Inter-Process Communication)

#### State Management

The frontend uses MobX for state management, with multiple stores handling different aspects of the application state. The main stores are defined in `anytype-ts/src/ts/store/`:

1. **Block Store** (`store/block.ts`):

   - Manages block data structures that form the content of pages
   - Contains maps for blocks, tree structures, and restrictions
   - Handles operations like adding, updating, and deleting blocks

2. **Record Store** (`store/record.ts`):

   - Manages records/objects and their relationships
   - Maintains maps for relations, views, and metadata
   - Handles operations like filtering, sorting, and displaying objects

3. **Common Store** (`store/common.ts`):

   - Manages application-wide state
   - Contains settings, theme information, and global UI state
   - Handles operations like navigation, UI updates, and global settings

4. **Detail Store** (`store/detail.ts`):
   - Manages object details and properties
   - Contains methods for handling object relations and properties
   - Provides functionality for filtering and querying object data

These stores interact with each other to maintain the application state and are accessed by React components through the MobX provider pattern.

> For a detailed analysis of the frontend state management, see [Frontend State Management Documentation](frontend/stores.md).

#### Component Structure

The React components are organized in `anytype-ts/src/ts/component/` with a modular approach:

- **Block components**: Handle rendering of different block types (text, image, link, etc.)
- **UI components**: Generic UI elements like buttons, menus, popups
- **Page components**: Complete page layouts and structures
- **Functionality components**: Components that handle specific features like search, navigation

Key component files include:

- `component/block/index.tsx`: Main block component that renders different block types
- `component/page/index.tsx`: Main page component for rendering complete pages
- `component/header/index.tsx`: Header component for navigation and controls

### anytype-heart

Anytype-heart is the middleware library for Anytype, distributed as part of the Anytype clients. It serves as the backend core engine responsible for:

- Data management
- Business logic implementation
- Communication with sync infrastructure

The component is written in Go and follows a service-oriented architecture, using a Service Locator pattern for dependency injection through their custom implementation: `github.com/anyproto/any-sync/app`.

#### Directory Structure

The backend code is organized as follows:

- **core/**: Contains the main business logic
  - **anytype/**: Core services and bootstrap functionality
  - **block/**: Block-related operations and data structures
  - **application/**: Application services
  - **subscription/**: Subscription management
  - **files/**: File management
  - **indexer/**: Search indexing
  - **identity/**: Identity management
  - **space/**: Space-related functionality

#### Service Architecture

The backend follows a modular service-oriented architecture. Each service is registered with the application during bootstrap in `core/anytype/bootstrap.go`. The application uses a Service Locator pattern, where services are registered with the application and can be retrieved by their interface types.

The bootstrap process initializes various services such as:

- Data storage services (ftsearch, objectstore, filestore)
- Core functionality services (block, subscription, collection)
- Communication services (server, pool, clientserver)
- Sync-related services (spacecore, streampool, virtualspaceservice)

#### Core Services and Business Logic

The core functionality of anytype-heart is implemented through various services, each responsible for a specific aspect of the application:

1. **Block Service** (`anytype-heart/core/block.go` and `anytype-heart/core/block/` directory):

   - Implements block-related operations like creation, deletion, and updates
   - Handles block data structures and their relationships
   - Manages block content and formatting

   > For a detailed analysis of the Block Service, see [Block Service Documentation](backend/block_service.md).

2. **Object Service** (`anytype-heart/core/object.go`):

   - Manages objects, their properties, and relationships
   - Handles object creation, deletion, and updates
   - Implements object querying and filtering

   > For a detailed analysis of the Object Store, see [Object Store Documentation](backend/object_store.md).

3. **Space Service** (`anytype-heart/core/space.go` and `anytype-heart/space/` directory):

   - Manages spaces, which are containers for objects
   - Handles space creation, deletion, and updates
   - Implements access control and sharing functionality

4. **Subscription Service** (`anytype-heart/core/subscription/` directory):

   - Manages subscriptions to objects and spaces
   - Handles subscription creation, deletion, and updates
   - Implements subscription querying and filtering

#### Data Storage

The backend uses multiple storage mechanisms for different types of data:

1. **Object Store** (`anytype-heart/pkg/lib/localstore/objectstore/`):

   - Stores object data and metadata
   - Implements querying and indexing functionality
   - Uses Badger as the underlying key-value store

2. **File Store** (`anytype-heart/pkg/lib/localstore/filestore/`):

   - Stores file data and metadata
   - Implements file querying and indexing functionality
   - Handles file uploads and downloads

3. **Full-Text Search** (`anytype-heart/pkg/lib/localstore/ftsearch/`):

   - Implements full-text search functionality
   - Indexes object content for efficient searching
   - Provides query capabilities for searching objects

### any-block

Any-block defines the protocol describing data structures used in the Anytype software. It uses Protocol Buffers (Protobuf) to efficiently describe structured data in a binary format for network communication and storage. The key components of any-block are:

- **models.proto**: Describes the base data structures used to represent objects and their components
- **changes.proto**: Outlines CRDT (Conflict-free Replicated Data Type) changes of objects and their blocks
- **events.proto**: Describes events about changes to objects and blocks, used for client notifications and as CRDT changes

#### Data Model

The core data model in Anytype revolves around the following key concepts:

1. **SmartBlock** (`any-block/models.proto`, lines 11-22):

   ```protobuf
   message SmartBlockSnapshotBase {
       repeated Block blocks = 1;
       google.protobuf.Struct details = 2;
       google.protobuf.Struct fileKeys = 3 [deprecated=true];
       repeated Relation extraRelations = 4 [deprecated=true];
       repeated string objectTypes = 5;
       google.protobuf.Struct collections = 6;
       repeated string removedCollectionKeys = 8;
       repeated RelationLink relationLinks = 7;
       string key = 9;
       int64 originalCreatedTimestamp = 10;
       FileInfo fileInfo = 11;
   }
   ```

   This is the fundamental data container that can represent various types of content.

2. **Block** (defined in `any-block/models.proto`):
   Components within a SmartBlock representing different types of content (text, file, link, etc.). The block structure includes:

   - Block ID and type information
   - Content-specific fields based on the block type
   - Layout and styling information
   - Child block references for hierarchical structures

3. **Change** (`any-block/changes.proto`, lines 9-22):

   ```protobuf
   message Change {
       // set of actions to apply
       repeated Content content = 3;
       // snapshot - when not null, the Content will be ignored
       Snapshot snapshot = 4;
       // file keys related to changes content
       repeated FileKeys fileKeys = 6;
       // creation timestamp
       int64 timestamp = 7;

       // version of business logic
       uint32 version = 8;
   }
   ```

   This structure represents changes to objects and blocks, used for CRDT-based conflict resolution.

#### CRDT Implementation

The system uses Conflict-free Replicated Data Types (CRDTs) for handling concurrent changes, which allows for conflict-free updates in a distributed environment. The CRDT implementation in Anytype is operation-based, focusing on representing changes as operations that can be applied in any order while still converging to the same state.

Key aspects of the CRDT implementation include:

- Operation-based approach using changes and updates
- Lamport timestamps for ordering operations
- Tree-based structure for representing document hierarchies
- Custom conflict resolution strategies for different data types

> For a detailed analysis of the CRDT implementation, see [CRDT and Sync Mechanism Documentation](sync/index.md).

### any-sync-dockercompose

This component provides Docker configurations for self-hosting the any-sync network, which is the synchronization infrastructure for Anytype. It includes:

- Docker Compose configuration for setting up the sync infrastructure
- Configuration files for different deployment scenarios
- Scripts for initializing and managing the infrastructure

## Frontend-Backend Integration

The frontend (anytype-ts) and backend (anytype-heart) are tightly integrated yet maintain a clear separation of concerns. The integration relies on several key mechanisms:

1. **Binary Embedding**: The anytype-heart backend is compiled into a binary and embedded within the anytype-ts frontend application. This allows the frontend to communicate with the backend through a local process, eliminating the need for a separate backend server.

2. **IPC Communication**: The frontend communicates with the backend through Electron's Inter-Process Communication (IPC) mechanism. Key files involved in this communication include:

   - `anytype-ts/electron.js`: Sets up IPC handlers in the main process
   - `anytype-ts/src/ts/lib/api.ts`: Provides the API wrapper for making IPC calls
   - `anytype-ts/src/ts/lib/renderer.ts`: Manages the communication with the IPC bridge
   - `anytype-heart/pkg/lib/gateway/gateway.go`: Handles IPC requests on the backend side

3. **Command Pattern**: The frontend implements a command pattern for backend operations, with each command represented as a function that constructs a Protocol Buffer request. This pattern allows for a clean separation between the frontend and backend, with well-defined interfaces.

4. **Event System**: A bidirectional event system allows the backend to notify the frontend of changes, which then updates its state accordingly. The event system is implemented using Electron's IPC events, with the backend emitting events and the frontend subscribing to them.

5. **Data Mappers**: Mappers convert between Protocol Buffer objects and JavaScript objects to ensure consistent data structures. These mappers are implemented in various files throughout the codebase, such as `anytype-ts/src/ts/lib/api.ts`.

> For a detailed analysis of the frontend-backend integration, see [Frontend-Backend Integration Documentation](integration/index.md).

## Technical Architecture

### Overall Architecture

Based on the analysis, Anytype follows a client-server architecture with an offline-first approach:

1. The frontend (anytype-ts) provides the user interface and communicates with the middleware
2. The middleware (anytype-heart) implements the core functionality and data management
3. The protocol definitions (any-block) define how data is structured and communicated
4. The sync infrastructure (anysync, any-sync-dockercompose) enables data synchronization between devices

The system is designed to work offline by default, with synchronization as an optional feature. This approach ensures user data remains available and editable even without an internet connection.

### Communication Flow

1. **User Interaction**: User interacts with the UI in the Electron application (anytype-ts)
2. **IPC Communication**: Frontend sends commands to the middleware through Electron's IPC mechanism
3. **Business Logic**: Middleware (anytype-heart) processes commands and applies business logic
4. **Data Storage**: Changes are stored locally using various storage mechanisms (object store, file store, etc.)
5. **Synchronization**: If enabled, changes are synchronized with other devices through the sync infrastructure

### Data Management

The system uses a CRDT-based approach for data management, which enables:

- Conflict-free updates in a distributed environment
- Offline-first operation with eventual consistency
- Efficient synchronization between devices

The data is stored locally using several storage mechanisms:

- Object store for structured data
- File store for attachments and large files
- Full-text search index for efficient querying

### Synchronization Architecture

The synchronization is implemented in the anysync component, with several key components:

1. **Network Layer** (implemented in `anytype-heart/space/spacecore/`):

   - Handles peer-to-peer communication
   - Manages connections and data transfer
   - Implements transport protocols (QUIC, Yamux)

2. **Space Synchronization** (implemented in `anytype-heart/space/spacecore/`):

   - Manages space data synchronization
   - Handles conflict resolution using CRDTs
   - Implements access control and permissions

3. **File Synchronization** (implemented in `anytype-heart/core/filestorage/filesync/`):

   - Manages file data synchronization
   - Handles large file transfers
   - Implements chunking and resume capabilities

4. **Identity Management** (implemented in `anytype-heart/core/identity/`):
   - Manages user identities and authentication
   - Handles key management and signatures
   - Implements secure communication channels

## Core Components and Technologies

### Frontend (anytype-ts)

- **Electron**: Cross-platform desktop application framework
- **React**: UI component library
- **TypeScript**: Typed JavaScript for better developer experience
- **MobX**: State management library
- **React Router**: Navigation management
- **Webpack/Rspack**: Build tools

### Backend (anytype-heart)

- **Go**: Programming language for the middleware
- **Protocol Buffers**: Data serialization format
- **CRDT**: Conflict-free replicated data types for distributed data management
- **Service Locator Pattern**: For dependency injection and component management
- **Badger**: Key-value database
- **Full-text search**: For indexing and searching content

### Communications

- **Protocol Buffers**: For efficient data serialization
- **IPC (Inter-Process Communication)**: For communication between frontend and backend
- **P2P (Peer-to-Peer)**: For device-to-device synchronization
- **QUIC/Yamux**: Network transport protocols

## Implementation Details

For detailed implementation examples and analyses of specific components, refer to the component-specific documentation files:

- [Frontend State Management](frontend/stores.md): Analysis of the MobX-based state management in the frontend
- [Frontend-Backend Integration](integration/index.md): Analysis of how the frontend and backend communicate
- [Block Service](backend/block_service.md): Analysis of the block-related functionality in the backend
- [Object Store](backend/object_store.md): Analysis of the object storage implementation in the backend
- [CRDT and Sync Mechanism](sync/index.md): Analysis of the CRDT-based synchronization mechanism

## Conclusion

Anytype implements a sophisticated architecture that enables privacy-focused, offline-first knowledge management with seamless synchronization. The clear separation of concerns, combined with well-defined interfaces between components, creates a maintainable and extensible system.

The use of advanced technologies such as CRDTs, Protocol Buffers, and reactive state management allows Anytype to provide a responsive user experience while maintaining data consistency across devices, even in challenging network conditions.

This documentation provides insights into both the high-level architecture and specific implementation details of the Anytype system. For a more detailed analysis of specific components, refer to the component-specific documentation files in the corresponding directories.
