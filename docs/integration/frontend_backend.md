---
title: "Frontend-Backend Integration: Technical Implementation Analysis"
description: "Detailed technical analysis of how Anytype's frontend and backend components integrate and communicate"
sidebar_position: 2
---

# Frontend-Backend Integration: Technical Implementation Analysis

## Overview

Anytype's architecture employs a clear separation between the frontend (anytype-ts) and the backend (anytype-heart) components. The frontend is built as an Electron application using TypeScript, React, and MobX, while the backend is implemented in Go. These components communicate through a sophisticated integration layer that enables seamless interaction while maintaining separation of concerns.

## Integration Architecture

The integration between frontend and backend follows this high-level architecture:

```
+-----------------------------------------------------------+
|                   ANYTYPE-TS (FRONTEND)                   |
|                                                           |
|  +---------------+    +------------+    +-------------+   |
|  |               |    |            |    |             |   |
|  |  React UI     |--->|  MobX      |--->|  API Layer  |   |
|  |  Components   |<---|  Stores    |<---|  (IPC)      |   |
|  |               |    |            |    |             |   |
|  +---------------+    +------------+    +------+------+   |
|                                                |          |
+------------------------------------------------|----------+
                                                 |
                                                 | IPC
                                                 |
+------------------------------------------------|----------+
|                                                |          |
|  +------+------+    +-------------+    +------+------+   |
|  |             |    |             |    |             |   |
|  |  IPC        |--->|  Service    |--->|  Core       |   |
|  |  Handler    |<---|  Layer      |<---|  Services   |   |
|  |             |    |             |    |             |   |
|  +-------------+    +-------------+    +-------------+   |
|                                                           |
|                   ANYTYPE-HEART (BACKEND)                 |
+-----------------------------------------------------------+
```

## Key Integration Mechanisms

### 1. Binary Embedding

The anytype-heart backend is compiled into a binary and embedded within the anytype-ts frontend application:

```
anytype-ts/
├── dist/
│   └── anytypeHelper     # Compiled anytype-heart binary
```

This embedded binary is launched by the Electron application when it starts:

```javascript
// In electron.js
const binPath = fixPathForAsarUnpack(
  path.join(__dirname, "dist", `anytypeHelper${is.windows ? ".exe" : ""}`)
);
```

### 2. Inter-Process Communication (IPC)

Communication between frontend and backend occurs through Electron's IPC mechanism. The frontend sends commands to the backend and receives responses asynchronously:

#### Frontend IPC Implementation

The frontend implements an API layer in `src/ts/lib/api/` that abstracts the IPC communication:

```typescript
// Simplified renderer.ts
class Renderer {
  send(...args: any[]) {
    const cmd = args[0];
    const electron = U.Common.getElectron();
    const currentWindow = electron.currentWindow();
    const winId = Number(currentWindow?.windowId) || 0;

    args.shift();
    args = args.map((it: any) => {
      if ("undefined" == typeof it || it === null) {
        it = "";
      }
      return it;
    });

    return electron.Api(winId, cmd, U.Common.objectCopy(args));
  }

  on(event: string, callBack: any) {
    this.remove(event);
    U.Common.getElectron().on(event, (...args: any[]) =>
      callBack.apply(this, args)
    );
  }

  remove(event: string) {
    U.Common.getElectron().removeAllListeners(event);
  }
}
```

The Electron preload script exposes the IPC bridge to the renderer process:

```javascript
// Simplified preload.js
contextBridge.exposeInMainWorld("Electron", {
  // Other methods...

  Api: (id, cmd, args) => {
    id = Number(id) || 0;
    cmd = String(cmd || "");
    args = args || [];

    let ret = new Promise(() => {});

    try {
      ret = ipcRenderer.invoke("Api", id, cmd, args).catch((error) => {
        console.log(error);
      });
    } catch (e) {}

    return ret;
  },
});
```

#### Backend IPC Implementation

The backend (anytype-heart) implements a gateway that receives commands from the frontend:

```go
// Simplified gateway implementation
package gateway

type gateway struct {
  // Dependencies and state
}

func (g *gateway) HandleCommand(cmd string, args []interface{}) (interface{}, error) {
  // Route the command to the appropriate service
  // Return the result
}
```

The backend communicates with the frontend through a compiled C library interface that uses Protocol Buffers for serialization:

```go
// From clientlibrary/clib/main.go
//export Command
func Command(cmd *C.char, data unsafe.Pointer, dataLen C.int, callback C.proxyFunc, callbackContext unsafe.Pointer) {
  service.CommandAsync(C.GoString(cmd), C.GoBytes(data, dataLen), func(data []byte) {
    C.ProxyCall(callback, callbackContext, C.CString(""), C.CString(string(data)), C.int(len(data)))
  })
}
```

### 3. Command Pattern

The API layer in the frontend implements a command pattern, with each backend operation wrapped in a function:

```typescript
// Example command in command.ts
export const BlockSetFields = (
  contextId: string,
  blockId: string,
  fields: any,
  callBack?: (message: any) => void
) => {
  const request = new Rpc.Block.SetFields.Request();

  request.setContextid(contextId);
  request.setBlockid(blockId);
  request.setFields(Encode.struct(fields || {}));

  dispatcher.request(BlockSetFields.name, request, callBack);
};
```

Each command follows a consistent pattern:

1. Create a Protocol Buffer request object
2. Set parameters on the request
3. Send the request through the dispatcher
4. Optionally process the response in a callback

### 4. Event System

The integration includes a sophisticated event system for bidirectional communication:

#### Event Dispatcher

The frontend implements a dispatcher that handles events from the backend:

```typescript
// Simplified dispatcher.ts
class Dispatcher {
  service: Service.ClientCommandsClient = null;

  // Event handler
  event(event: Events.Event, skipDebug?: boolean) {
    const { config, space } = S.Common;

    // Process events and update stores accordingly
    if (event && event.getMessagesList) {
      event.getMessagesList().forEach((message) => {
        const mapped = this.mapEvent(message);

        switch (message.getPayloadCase()) {
          case "BlockDataviewTargetObjectIdSet": {
            const { id, targetObjectId } = mapped;
            const block = S.Block.getLeaf(rootId, id);

            if (!block) {
              break;
            }

            S.Block.updateContent(rootId, id, { targetObjectId });
            break;
          }

          // Other event handlers...
        }
      });
    }
  }

  // Map event from Protocol Buffer to JavaScript object
  mapEvent(message: any) {
    // Use Mapper to convert Protocol Buffer to JavaScript object
    return Mapper.From[message.getPayloadCase()](message.getPayload());
  }
}
```

#### Event Subscription

The backend sends events to the frontend through a subscription mechanism:

```typescript
// Example subscription in command.ts
export const ObjectSubscribeIds = (
  spaceId: string,
  subId: string,
  ids: string[],
  keys: string[],
  noDeps: boolean,
  callBack?: (message: any) => void
) => {
  const request = new Rpc.Object.SubscribeIds.Request();

  request.setSpaceid(spaceId);
  request.setSubid(subId);
  request.setIdsList(ids);
  request.setKeysList(keys);
  request.setNodepsubscription(noDeps);

  dispatcher.request(ObjectSubscribeIds.name, request, callBack);
};
```

The backend uses gRPC streaming to send events back to the frontend, implemented through the `ListenSessionEvents` method:

```go
// From pb/service/service.pb.go
func (s *service) ListenSessionEvents(req *pb.StreamRequest, stream pb.ClientCommands_ListenSessionEventsServer) error {
  // Setup event listener
  // When events occur, send them to the frontend
  return stream.Send(&pb.Event{
    Messages: []*pb.Event_Message{
      // Event messages
    },
  })
}
```

This event streaming is critical for maintaining the reactive nature of the frontend UI.

### 5. Data Mappers

To ensure consistent data structures, the frontend includes mappers for converting between Protocol Buffer objects and JavaScript objects:

```typescript
// Simplified mapper.ts
export const Mapper = {
  // From backend to frontend
  From: {
    SubscriptionAdd: (obj: Events.Event.Object.Subscription.Add) => {
      return {
        id: obj.getId(),
        afterId: obj.getAfterid(),
        subId: obj.getSubid(),
      };
    },
    // Other mappers...
  },

  // From frontend to backend
  To: {
    Filter: (filter: I.Filter) => {
      const f = new Model.Filter();
      f.setRelationkey(filter.relationKey);
      f.setCondition(filter.condition);
      f.setValue(Encode.value(filter.value));
      return f;
    },
    // Other mappers...
  },
};
```

## Data Flow Examples

### 1. Creating a Block

When creating a new block, the data flows as follows:

```
1. User interacts with UI component
2. Component calls store method (Block.add)
3. Store calls API method (BlockCreate)
4. API constructs Protocol Buffer request
5. Request sent via IPC to backend
6. Backend processes request and applies changes
7. Backend sends events back to frontend
8. Frontend dispatcher processes events
9. Store updates based on events
10. UI reacts to store changes
```

### 2. Subscribing to Object Changes

To monitor changes to objects:

```
1. Store calls API method (ObjectSubscribeIds)
2. API constructs subscription request
3. Request sent via IPC to backend
4. Backend sets up subscription
5. When changes occur, backend sends events
6. Frontend dispatcher processes events
7. Store updates based on events
8. UI reacts to store changes
```

## Error Handling

The integration includes robust error handling:

1. **IPC Communication Errors**: Caught and logged at the IPC layer
2. **Command Validation Errors**: Validated in both frontend and backend
3. **Business Logic Errors**: Returned as structured error responses
4. **Event Processing Errors**: Isolated to prevent cascading failures

Error handling is implemented on both sides of the integration:

```typescript
// Frontend error handling
try {
  const result = await renderer.send("Command", args);
  // Process result
} catch (error) {
  console.error("Command failed:", error);
  // Handle error, update UI, show notification, etc.
}
```

```go
// Backend error handling
func (g *gateway) HandleCommand(cmd string, args []interface{}) (interface{}, error) {
  // Validate command and arguments
  if !isValidCommand(cmd) {
    return nil, errors.New("invalid command")
  }

  // Handle command
  result, err := g.executeCommand(cmd, args)
  if err != nil {
    log.Error("Command execution failed", err)
    return nil, err
  }

  return result, nil
}
```

## Performance Considerations

The integration is optimized for performance:

1. **Batched Operations**: Multiple changes sent in a single request
2. **Selective Updates**: Only changed data is sent over IPC
3. **Event Filtering**: Events are filtered based on subscriptions
4. **Lazy Loading**: Data is loaded only when needed

## Integration with Sync Infrastructure

The frontend-backend integration interfaces with the synchronization infrastructure to provide multi-device capabilities:

1. **Local-First**: All operations are first applied locally through the backend
2. **Background Sync**: Backend handles synchronization with other devices in the background
3. **Conflict Resolution**: The CRDT implementation in the backend handles conflicts automatically
4. **Sync Status Events**: Backend sends sync status updates to the frontend through the event system

The sync status is tracked and displayed in the UI:

```typescript
// Example sync status subscription
export const SyncGetStatus = (callBack?: (message: any) => void) => {
  const request = new Rpc.Sync.GetStatus.Request();
  dispatcher.request(SyncGetStatus.name, request, callBack);
};
```

## Key Insights

1. **Clear Separation of Concerns**: The frontend focuses on UI and state management, while the backend handles business logic and data persistence.

2. **Protocol Buffer Foundation**: Protocol Buffers provide a consistent data format between frontend and backend.

3. **Event-Driven Architecture**: The system uses an event-driven approach for updating the UI in response to backend changes.

4. **Command Pattern**: The API layer implements a command pattern for clearly defined operations.

5. **Bidirectional Communication**: The integration supports both request-response and event-based communication.

6. **Local Integration**: The backend is embedded within the frontend application, enabling offline-first operation.

7. **Abstraction Layers**: Multiple abstraction layers (API, Mappers, Stores) ensure clean separation and maintainable code.

This architecture enables Anytype to function as a cohesive application while maintaining a clean separation between frontend and backend concerns, facilitating maintainability and enabling the offline-first approach that is central to Anytype's design philosophy.
