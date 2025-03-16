---
id: stores
title: "Frontend State Management: Technical Implementation Analysis"
description: "Detailed technical analysis of Anytype's frontend state management using MobX"
sidebar_label: "State Management"
sidebar_position: 1
---

# Frontend State Management: Technical Implementation Analysis

## Overview

Anytype's frontend state management is built around MobX, a state management library that uses observable data structures and reactive programming concepts. The implementation follows a multi-store pattern, with specialized stores for different domains of the application state.

## File Structure

The state management code is organized in the following directory structure:

```
anytype-ts/
├── src/
│   └── ts/
│       ├── store/
│       │   ├── index.ts           # Store exports
│       │   ├── common.ts          # Application-wide state
│       │   ├── block.ts           # Block-related state
│       │   ├── record.ts          # Object/record-related state
│       │   ├── detail.ts          # Object details and properties
│       │   ├── auth.ts            # Authentication-related state
│       │   ├── menu.ts            # Menu-related state
│       │   ├── popup.ts           # Popup/modal-related state
│       │   ├── notification.ts    # Notification-related state
│       │   ├── progress.ts        # Progress indicators
│       │   ├── chat.ts            # Chat-related state
│       │   └── extension.ts       # Extension-related state
│       └── lib/
│           └── store.ts           # Store initialization and utilities
```

## Core Implementation

### Store Pattern

The store implementation follows a consistent pattern across all stores:

```typescript
// Simplified example of a store
class ExampleStore {
  // Observable state properties
  @observable public propertyOne: string = "";
  @observable public propertyTwo: number = 0;
  @observable public mapProperty: Map<string, any> = observable.map(new Map());

  constructor() {
    // Initialize MobX decorators
    makeObservable(this, {
      propertyOne: observable,
      propertyTwo: observable,
      mapProperty: observable,

      // Computed properties
      computedProperty: computed,

      // Actions
      actionOne: action,
      actionTwo: action,
    });
  }

  // Computed properties
  @computed get computedProperty(): string {
    return `${this.propertyOne}-${this.propertyTwo}`;
  }

  // Actions - methods that modify the state
  @action actionOne(value: string): void {
    this.propertyOne = value;
  }

  @action actionTwo(value: number): void {
    this.propertyTwo = value;
  }
}
```

### Store Initialization

Stores are initialized in `lib/store.ts` and provided to the application through React's context API:

```typescript
// Store initialization (simplified)
import { Common, Record, Block, Detail /* other stores */ } from "Store";

// Create singleton instances
const common = new Common();
const record = new Record();
const block = new Block();
const detail = new Detail();
// Other store instances...

// Export store instances
export const stores = {
  common,
  record,
  block,
  detail,
  // Other stores...
};

// In app.tsx
import { Provider } from "mobx-react";
import { stores } from "Lib/store";

// Provide stores to React components
const App = () => (
  <Provider {...stores}>{/* Application components */}</Provider>
);
```

## Store Implementations

### Common Store (`common.ts`)

The Common store manages application-wide state:

```typescript
// Simplified Common store
class CommonStore {
  // Core app state
  @observable public dataPathValue: string = "";
  @observable public configObj: any = {};
  @observable public themeId: string = "";
  @observable public isOnlineValue: boolean = false;
  @observable public languages: string[] = [];
  @observable public spaceId: string = "";
  @observable public redirect: string = "";

  // UI state
  @observable public isFullScreen: boolean = false;
  @observable public showVaultValue: boolean = null;
  @observable public showSidebarRightValue = { full: false, popup: false };
  @observable public hideSidebarValue: boolean = null;

  // Preferences
  @observable public showRelativeDatesValue: boolean = null;
  @observable public dateFormatValue: string = null;
  @observable public timeFormatValue: string = null;
  @observable public firstDayValue: number = null;

  constructor() {
    makeObservable(this, {
      // observable properties
      // computed properties
      // actions
    });

    // Initialize from persistent storage
    this.init();
  }

  // Actions for modifying state
  @action setDataPath(v: string): void {
    this.dataPathValue = v;
  }

  @action setTheme(id: string): void {
    this.themeId = id;
    // Apply theme to DOM
    document.body.setAttribute("data-theme", id);
    // Persist to storage
    Storage.set("theme", id);
  }

  // Method to load initial state from storage
  init(): void {
    // Load preferences from storage
    this.themeId = Storage.get("theme") || "light";
    this.showRelativeDatesValue = Storage.get("showRelativeDates") || false;
    // Additional initialization...
  }
}
```

### Block Store (`block.ts`)

The Block store manages blocks that form the content of pages:

```typescript
// Simplified Block store
class BlockStore {
  // Block data structures
  @observable public rootId: string = "";
  @observable public profileId: string = "";
  @observable public widgetsId: string = "";
  @observable public spaceviewId: string = "";

  // Maps for storing block data
  public treeMap: Map<string, Map<string, I.BlockStructure>> = new Map();
  public blockMap: Map<string, Map<string, I.Block>> = new Map();
  public restrictionMap: Map<string, Map<string, any>> = new Map();

  constructor() {
    makeObservable(this, {
      rootId: observable,
      profileId: observable,
      spaceviewId: observable,
      widgetsId: observable,

      profile: computed,
      root: computed,
      spaceview: computed,

      rootSet: action,
      profileSet: action,
      widgetsSet: action,
      spaceviewSet: action,

      set: action,
      clear: action,
      clearAll: action,
      add: action,
      update: action,
      updateContent: action,
      delete: action,
    });
  }

  // Computed getters
  @computed get root(): string {
    return String(this.rootId || "");
  }

  // Block manipulation actions
  @action set(
    rootId: string,
    blocks: I.Block[],
    tree: I.BlockStructure[]
  ): void {
    // Create maps for the object if they don't exist
    if (!this.blockMap.has(rootId)) {
      this.blockMap.set(rootId, new Map());
    }
    if (!this.treeMap.has(rootId)) {
      this.treeMap.set(rootId, new Map());
    }

    // Set blocks in the map
    const bm = this.blockMap.get(rootId);
    blocks.forEach((block) => {
      bm.set(block.id, block);
    });

    // Set tree structure
    const tm = this.treeMap.get(rootId);
    tree.forEach((item) => {
      tm.set(item.id, item);
    });
  }

  @action add(
    rootId: string,
    blocks: I.Block[],
    tree: I.BlockStructure[]
  ): void {
    // Similar to set, but for adding new blocks
  }

  @action update(rootId: string, id: string, data: any): I.Block {
    // Update block properties
    const bm = this.blockMap.get(rootId);
    if (!bm) {
      return null;
    }

    const block = bm.get(id);
    if (!block) {
      return null;
    }

    // Apply updates
    Object.assign(block, data);
    bm.set(id, block);
    return block;
  }

  @action updateContent(rootId: string, id: string, data: any): I.Block {
    // Update block content specifically
    const bm = this.blockMap.get(rootId);
    if (!bm) {
      return null;
    }

    const block = bm.get(id);
    if (!block) {
      return null;
    }

    // Apply content updates
    block.content = { ...block.content, ...data };
    bm.set(id, block);
    return block;
  }

  @action delete(rootId: string, ids: string[]): void {
    // Remove blocks from maps
    const bm = this.blockMap.get(rootId);
    const tm = this.treeMap.get(rootId);
    if (!bm || !tm) {
      return;
    }

    // Remove blocks and their tree entries
    ids.forEach((id) => {
      bm.delete(id);
      tm.delete(id);
    });
  }
}
```

### Record Store (`record.ts`)

The Record store manages object records, their types, and relations:

```typescript
// Simplified Record store
class RecordStore {
  // Maps for storing records
  public recordMap: Map<string, Map<string, I.Record>> = new Map();
  public relationMap: Map<string, Map<string, I.Relation>> = new Map();
  public objectTypeMap: Map<string, Map<string, I.ObjectType>> = new Map();

  // Active record tracking
  @observable public activeId: string = "";
  @observable public activeView: string = "";

  constructor() {
    makeObservable(this, {
      activeId: observable,
      activeView: observable,

      active: computed,
      activeData: computed,

      activeSet: action,
      viewSet: action,
      create: action,
      update: action,
      delete: action,
      clear: action,
    });
  }

  // Computed getters
  @computed get active(): string {
    return String(this.activeId || "");
  }

  @computed get activeData(): I.Record {
    if (!this.active) {
      return null;
    }

    const map = this.recordMap.get(S.Common.space);
    if (!map) {
      return null;
    }

    return map.get(this.active);
  }

  // Actions
  @action activeSet(id: string): void {
    this.activeId = id;
  }

  @action viewSet(view: string): void {
    this.activeView = view;
  }

  @action create(spaceId: string, obj: I.Record): void {
    // Add record to map
    if (!this.recordMap.has(spaceId)) {
      this.recordMap.set(spaceId, new Map());
    }

    const map = this.recordMap.get(spaceId);
    map.set(obj.id, obj);
  }

  @action update(spaceId: string, id: string, data: any): I.Record {
    // Update record properties
    const map = this.recordMap.get(spaceId);
    if (!map) {
      return null;
    }

    const record = map.get(id);
    if (!record) {
      return null;
    }

    // Apply updates
    Object.assign(record, data);
    map.set(id, record);
    return record;
  }

  @action delete(spaceId: string, ids: string[]): void {
    // Remove records from map
    const map = this.recordMap.get(spaceId);
    if (!map) {
      return;
    }

    ids.forEach((id) => {
      map.delete(id);
    });
  }
}
```

### Detail Store (`detail.ts`)

The Detail store manages UI state related to object details and editing:

```typescript
// Simplified Detail store
class DetailStore {
  // Object details state
  @observable public viewId: string = "";
  @observable public objects: any[] = [];
  @observable public cellId: string = "";
  @observable public relationId: string = "";
  @observable public isReadonly: boolean = false;

  // UI state
  @observable public selection: any = null;
  @observable public menuContext: any = null;
  @observable public menuObjectContext: any = null;

  constructor() {
    makeObservable(this, {
      viewId: observable,
      objects: observable,
      cellId: observable,
      relationId: observable,
      isReadonly: observable,
      selection: observable,
      menuContext: observable,
      menuObjectContext: observable,

      viewSet: action,
      objectsSet: action,
      cellSet: action,
      relationSet: action,
      readonlySet: action,
      selectionSet: action,
      menuContextSet: action,
      menuObjectContextSet: action,
      clear: action,
    });
  }

  // Actions
  @action viewSet(id: string): void {
    this.viewId = id;
  }

  @action objectsSet(items: any[]): void {
    this.objects = items;
  }

  @action cellSet(id: string): void {
    this.cellId = id;
  }

  @action relationSet(id: string): void {
    this.relationId = id;
  }

  @action readonlySet(v: boolean): void {
    this.isReadonly = v;
  }

  @action selectionSet(v: any): void {
    this.selection = v;
  }

  @action menuContextSet(v: any): void {
    this.menuContext = v;
  }

  @action menuObjectContextSet(v: any): void {
    this.menuObjectContext = v;
  }

  @action clear(): void {
    this.viewId = "";
    this.objects = [];
    this.cellId = "";
    this.relationId = "";
    this.isReadonly = false;
    this.selection = null;
    this.menuContext = null;
    this.menuObjectContext = null;
  }
}
```

## State Flow and Integration

The stores interact with each other and with the backend through a defined flow:

1. **User Interaction**: User interacts with a React component
2. **Component Action**: Component calls a store action
3. **Store Action**: Store action may update local state and/or call the API
4. **API Call**: API methods communicate with the backend via IPC
5. **Backend Processing**: Backend processes the request and returns a result
6. **State Update**: Store updates its state based on the result
7. **Reactive UI**: React components re-render automatically due to MobX

Example flow for creating a new block:

```typescript
// Component code (simplified)
const handleAddBlock = () => {
  S.Block.add(recordId,
    [ newBlock ],
    [ blockStructure ]
  );
};

// In Block store
@action add(rootId: string, blocks: I.Block[], tree: I.BlockStructure[]): void {
  // Update local state first (optimistic update)
  this.updateLocalState(rootId, blocks, tree);

  // Call backend
  API.BlockCreate(rootId, blocks, tree, (result) => {
    // Handle any differences between expected and actual result
    if (result.error) {
      // Revert optimistic update if needed
      this.handleError(result.error);
    }
  });
}
```

## Performance Optimizations

The store implementation includes several performance optimizations:

1. **Selective Rendering**: MobX only re-renders components that depend on changed state
2. **Map Data Structures**: Using Map objects for efficient lookups and updates
3. **Batched Updates**: Grouping multiple state changes in a single transaction
4. **Computed Properties**: Caching derived state until dependencies change
5. **Lazy Loading**: Loading data only when needed

Example of batched updates:

```typescript
import { runInAction } from "mobx";

runInAction(() => {
  store.property1 = "value1";
  store.property2 = "value2";
  store.property3 = "value3";
  // Only one re-render will occur
});
```

## Store Integration with React Components

React components connect to the stores using the `observer` higher-order component and context:

```typescript
import { observer } from 'mobx-react';
import { useStore } from 'Lib/store';

const MyComponent = observer(() => {
  const { common, block } = useStore();

  const handleClick = () => {
    block.add(common.root, [...], [...]);
  };

  return (
    <div>
      {/* Component rendering based on store state */}
      {block.blockMap.get(common.root)?.map(block => (
        <BlockComponent key={block.id} block={block} />
      ))}
      <button onClick={handleClick}>Add Block</button>
    </div>
  );
});
```

## Error Handling

The stores implement error handling to maintain consistency:

1. **Optimistic Updates**: Updates UI immediately, then reverts if backend fails
2. **Error State**: Stores track error states for UI feedback
3. **Retry Mechanisms**: Implementing retry logic for failed operations
4. **Fallback States**: Defining fallback states when data is unavailable

## Key Insights

1. **Multi-Store Pattern**: The state is divided into domain-specific stores for modularity and separation of concerns.
2. **Reactive Architecture**: MobX provides a reactive system that automatically updates the UI when state changes.
3. **Clear State Ownership**: Each store has clear ownership of specific parts of the application state.
4. **Backend Integration**: Stores act as the integration point between the UI and backend services.
5. **Optimistic Updates**: The system uses optimistic updates to provide a responsive user experience.
6. **Consistent Patterns**: All stores follow consistent patterns, making the codebase easier to understand and maintain.
7. **Type Safety**: TypeScript interfaces ensure type safety throughout the state management system.

This architecture enables Anytype to maintain a clean separation between UI and state management while providing a responsive and consistent user experience.
