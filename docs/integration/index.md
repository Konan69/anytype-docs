---
id: index
title: "Frontend-Backend Integration"
sidebar_label: "Integration"
---

# Frontend-Backend Integration

This section documents how the TypeScript frontend and Go backend of Anytype communicate and integrate.

## Communication Mechanisms

Several mechanisms facilitate communication:

- **IPC** - Inter-process communication between frontend and backend
- **Command Pattern** - Structured command execution from frontend to backend
- **Event System** - Events propagated from backend to frontend

## Data Mapping

The integration layer maps between different data representations:

- **Protocol Buffers** - Binary serialization format for data exchange
- **Type Mapping** - Translation between TypeScript and Go types
- **State Synchronization** - Keeping frontend and backend state in sync
