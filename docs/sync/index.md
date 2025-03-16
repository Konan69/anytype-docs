---
id: index
title: "Sync and CRDT Documentation"
sidebar_label: "Sync"
---

# Sync and CRDT Documentation

This section documents the synchronization infrastructure and CRDT (Conflict-free Replicated Data Type) implementation in Anytype.

## Synchronization Architecture

Anytype uses a sophisticated synchronization system:

- **P2P Synchronization** - Peer-to-peer synchronization between devices
- **Server Infrastructure** - Optional server components for facilitating sync
- **Self-hosting** - Options for self-hosting the sync infrastructure

## CRDT Implementation

Anytype implements CRDTs to handle offline-first editing and conflict resolution:

- **Operation-based CRDTs** - Used for text and structural editing
- **State-based CRDTs** - Used for certain metadata synchronization
- **Conflict Resolution** - Automatic resolution of conflicting changes
