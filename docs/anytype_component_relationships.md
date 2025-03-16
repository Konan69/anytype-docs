---
id: anytype_component_relationships
title: "Component Relationships"
sidebar_label: "Component Relationships"
weight: 2
---

# Anytype Component Relationships

This document outlines the relationships between the various components of the Anytype system, showing how they interact and depend on each other.

> **Note:** This document focuses on the high-level relationships between components. For detailed analysis of specific components, refer to the component-specific documentation files in the corresponding directories.

## System Architecture Diagram

```
+--------------------------------------------------------------------------------------------+
|                                     ANYTYPE SYSTEM                                         |
+--------------------------------------------------------------------------------------------+

+---------------------+     +----------------------+     +--------------------+
|    FRONTEND         |     |      BACKEND         |     |      SYNC          |
|   (anytype-ts)      |     |    (anytype-heart)   |     |   INFRASTRUCTURE   |
+---------------------+     +----------------------+     +--------------------+
|                     |     |                      |     |                    |
| +---------------+   |     | +----------------+   |     | +--------------+   |
| |               |   |     | |                |   |     | |              |   |
| |  UI           |   |     | |  Core Services |   |     | |  Network     |   |
| |  Components   |   |     | |                |   |     | |  Services    |   |
| |               |   |     | +----------------+   |     | |              |   |
| +-------+-------+   |     | |                |   |     | +--------------+   |
|         |           |     | |  Data Services |   |     | |              |   |
| +-------v-------+   |     | |                |   |     | |  Space       |   |
| |               |   |     | +----------------+   |     | |  Services    |   |
| |  State        |   |     | |                |   |     | |              |   |
| |  Management   |   |     | |  Storage       |   |     | +--------------+   |
| |  (MobX)       |   |     | |  Services      |   |     | |              |   |
| |               |   |     | |                |   |     | |  File        |   |
| +-------+-------+   |     | +----------------+   |     | |  Services    |   |
|         |           |     | |                |   |     | |              |   |
| +-------v-------+   |     | |  Sync          |   |     | +--------------+   |
| |               |   |     | |  Services      |   |     | |              |   |
| |  IPC          |<----------------+------------------>| |  Identity     |   |
| |  Bridge       |   |     | |                |   |     | |  Services    |   |
| |               |   |     | +-------^--------+   |     | |              |   |
| +---------------+   |     |         |          ^ |     | +--------------+   |
|                     |     |         |          | |     |                    |
+---------------------+     +---------+----------+-+     +--------------------+
                                      |          |
                                      v          |
                             +--------+----------+-+
                             |                     |
                             | PROTOCOL DEFINITIONS |
                             |    (any-block)       |
                             |                     |
                             +---------------------+
```

## Component Interaction Flow

### 1. Frontend to Backend Communication

The frontend (anytype-ts) communicates with the backend (anytype-heart) through Electron's IPC mechanism:

```
Frontend Component -> MobX Store -> IPC Bridge -> Backend Service -> Business Logic
```

Key files involved:

- `anytype-ts/src/ts/lib/api.ts`: Frontend API wrapper for IPC calls
- `anytype-ts/electron.js`: Electron main process handling IPC
- `anytype-heart/pkg/lib/gateway/gateway.go`: Backend IPC handler

This communication leverages a command pattern where each backend operation is wrapped in a function that constructs a Protocol Buffer request.

> For detailed analysis of this interaction, see [Frontend-Backend Integration Documentation](integration/index.md).

### 2. Backend to Protocol Definitions

The backend uses Protocol Buffer definitions for data structures and serialization:

```
Backend Service -> Protocol Buffer Objects -> Data Storage/Transmission
```

Key files involved:

- `any-block/models.proto`: Core data models
- `any-block/changes.proto`: CRDT change definitions
- `any-block/events.proto`: Event definitions
- `anytype-heart/pb/`: Generated Go code from protocol definitions

Protocol Buffers provide a consistent format for data serialization across components, ensuring type safety and efficiency.

### 3. Backend to Sync Infrastructure

The backend communicates with the sync infrastructure for data synchronization:

```
Backend Sync Service -> Network Layer -> Sync Infrastructure -> Other Devices
```

Key files involved:

- `anytype-heart/space/spacecore/`: Core space synchronization
- `anytype-heart/core/filestorage/filesync/`: File synchronization
- `anytype-heart/core/identity/`: Identity management

This interaction is built on CRDT principles, allowing changes to be synchronized consistently between devices.

> For detailed analysis of the synchronization mechanism, see [CRDT and Sync Mechanism Documentation](sync/index.md).

### 4. Data Flow for Content Creation/Editing

When creating or editing content, the data flows through these components:

```
UI Component -> MobX Store -> IPC -> Backend Service ->
CRDT Change -> Storage -> Event Generation ->
Event Broadcast -> Frontend Update
```

Key files involved:

- `anytype-ts/src/ts/component/block/`: Block rendering components
- `anytype-ts/src/ts/store/block.ts`: Block state management
- `anytype-heart/core/block.go`: Block operations backend
- `anytype-heart/core/object.go`: Object operations backend

This bidirectional flow ensures that changes are immediately reflected in the UI while being persistently stored and properly synchronized.

## Service Dependencies

### Frontend Dependencies

- **React Components** depend on **MobX Stores** for state
- **MobX Stores** depend on **IPC Bridge** for backend communication
- **UI Components** depend on **Block Rendering System** for content display

> For detailed analysis of the frontend state management, see [Frontend State Management Documentation](frontend/stores.md).

### Backend Dependencies

- **Core Services** depend on **Protocol Definitions** for data structures
- **Data Services** depend on **Storage Services** for persistence
- **Sync Services** depend on **Network Services** for communication
- **All Services** depend on **Bootstrap System** for initialization

> For detailed analysis of key backend services, see [Block Service Documentation](backend/block_service.md) and [Object Store Documentation](backend/object_store.md).

### Protocol Dependencies

- **models.proto** defines base structures used by all components
- **changes.proto** depends on **models.proto** for change structures
- **events.proto** depends on **models.proto** for event structures

## File Relationship Map

### Frontend (anytype-ts)

```
src/ts/
|
├── app.tsx                    # Main application entry point
├── entry.tsx                  # React rendering entry point
|
├── component/                 # React components
|   ├── block/                 # Block rendering components
|   ├── page/                  # Page components
|   └── ...                    # Other UI components
|
├── store/                     # MobX state management
|   ├── index.ts               # Store exports
|   ├── block.ts               # Block state management
|   ├── record.ts              # Record/object state management
|   ├── common.ts              # Global state management
|   └── ...                    # Other stores
|
├── model/                     # Data models
|   ├── block.ts               # Block model
|   ├── account.ts             # Account model
|   └── ...                    # Other models
|
└── lib/                       # Utility functions
    ├── api.ts                 # API wrapper for IPC
    └── ...                    # Other utilities
```

### Backend (anytype-heart)

```
core/
|
├── anytype/
|   └── bootstrap.go           # Service initialization
|
├── block.go                   # Block service implementation
├── block_dataview.go          # Dataview functionality
├── object.go                  # Object service implementation
├── space.go                   # Space service implementation
|
├── block/                     # Block-related functionality
|   ├── editor/                # Block editor
|   └── ...                    # Other block operations
|
└── filestorage/               # File storage functionality
    ├── filesync/              # File synchronization
    └── ...                    # Other file operations

pkg/lib/
|
├── localstore/                # Local storage implementation
|   ├── objectstore/           # Object storage
|   ├── filestore/             # File storage
|   └── ftsearch/              # Full-text search
|
└── gateway/                   # IPC gateway
    └── gateway.go             # IPC handler
```

### Protocol Definitions (any-block)

```
any-block/
|
├── models.proto               # Base data structures
├── changes.proto              # CRDT change definitions
└── events.proto               # Event definitions
```

## Key Integration Points

### 1. Frontend-Backend Integration

The frontend and backend are integrated through:

- **Binary Embedding**: The anytype-heart backend is compiled and embedded in the frontend application
- **IPC Communication**: Electron's IPC mechanism provides the communication channel
- **Event System**: A bidirectional event system allows for state synchronization
- **Command Pattern**: Each backend operation is wrapped in a function in the frontend
- **Data Mappers**: Convert between Protocol Buffer objects and JavaScript objects

### 2. CRDT Synchronization

The CRDT implementation enables:

- **Offline-First Operation**: All operations can be performed locally without an internet connection
- **Conflict Resolution**: Concurrent changes from different devices are merged consistently
- **Eventual Consistency**: All replicas eventually converge to the same state
- **Selective Synchronization**: Users can control what gets synchronized

### 3. Object Store Integration

The Object Store provides:

- **Persistent Storage**: Reliable storage for application data
- **Querying Capabilities**: Efficient data access and filtering
- **Transaction Support**: Ensures data consistency
- **Indexing**: Optimizes common access patterns

## Key Implementation Insights

1. **Clear Separation of Concerns**: Each component has a well-defined responsibility, making the system maintainable and extensible.

2. **Protocol-First Design**: Protocol Buffers provide a consistent data format across components, ensuring type safety and efficiency.

3. **Event-Driven Architecture**: The system uses events for communication between components, enabling loose coupling and reactivity.

4. **Offline-First Approach**: All operations are designed to work offline first, with synchronization as an optional layer.

5. **CRDT-Based Synchronization**: The use of CRDTs enables conflict-free updates in a distributed environment, essential for multi-device use.

6. **Modular Services**: The backend follows a service-oriented architecture with clear interfaces between services.

7. **Reactive UI**: The frontend uses MobX for reactive state management, ensuring the UI stays in sync with the application state.

This document provides a comprehensive overview of how the various components in Anytype interact and depend on each other, forming a cohesive system while maintaining clear boundaries between responsibilities.

> For a complete understanding of the Anytype system, combine this component relationship overview with the detailed component-specific documentation files.
