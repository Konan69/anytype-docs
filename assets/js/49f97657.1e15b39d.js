"use strict";(self.webpackChunkanytype_docs=self.webpackChunkanytype_docs||[]).push([[102],{8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var o=t(6540);const i={},s=o.createContext(i);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(s.Provider,{value:n},e.children)}},9451:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"frontend/stores","title":"Frontend State Management: Technical Implementation Analysis","description":"Detailed technical analysis of Anytype\'s frontend state management using MobX","source":"@site/docs/frontend/stores.md","sourceDirName":"frontend","slug":"/frontend/stores","permalink":"/anytype-docs/docs/frontend/stores","draft":false,"unlisted":false,"editUrl":"https://github.com/konan69/anytype-docs/tree/main/docs/frontend/stores.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"id":"stores","title":"Frontend State Management: Technical Implementation Analysis","description":"Detailed technical analysis of Anytype\'s frontend state management using MobX","sidebar_label":"State Management","sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Frontend","permalink":"/anytype-docs/docs/frontend/"},"next":{"title":"Backend","permalink":"/anytype-docs/docs/backend/"}}');var i=t(4848),s=t(8453);const r={id:"stores",title:"Frontend State Management: Technical Implementation Analysis",description:"Detailed technical analysis of Anytype's frontend state management using MobX",sidebar_label:"State Management",sidebar_position:1},a="Frontend State Management: Technical Implementation Analysis",c={},l=[{value:"Overview",id:"overview",level:2},{value:"File Structure",id:"file-structure",level:2},{value:"Core Implementation",id:"core-implementation",level:2},{value:"Store Pattern",id:"store-pattern",level:3},{value:"Store Initialization",id:"store-initialization",level:3},{value:"Store Implementations",id:"store-implementations",level:2},{value:"Common Store (<code>common.ts</code>)",id:"common-store-commonts",level:3},{value:"Block Store (<code>block.ts</code>)",id:"block-store-blockts",level:3},{value:"Record Store (<code>record.ts</code>)",id:"record-store-recordts",level:3},{value:"Detail Store (<code>detail.ts</code>)",id:"detail-store-detailts",level:3},{value:"State Flow and Integration",id:"state-flow-and-integration",level:2},{value:"Performance Optimizations",id:"performance-optimizations",level:2},{value:"Store Integration with React Components",id:"store-integration-with-react-components",level:2},{value:"Error Handling",id:"error-handling",level:2},{value:"Key Insights",id:"key-insights",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"frontend-state-management-technical-implementation-analysis",children:"Frontend State Management: Technical Implementation Analysis"})}),"\n",(0,i.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,i.jsx)(n.p,{children:"Anytype's frontend state management is built around MobX, a state management library that uses observable data structures and reactive programming concepts. The implementation follows a multi-store pattern, with specialized stores for different domains of the application state."}),"\n",(0,i.jsx)(n.h2,{id:"file-structure",children:"File Structure"}),"\n",(0,i.jsx)(n.p,{children:"The state management code is organized in the following directory structure:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"anytype-ts/\n\u251c\u2500\u2500 src/\n\u2502   \u2514\u2500\u2500 ts/\n\u2502       \u251c\u2500\u2500 store/\n\u2502       \u2502   \u251c\u2500\u2500 index.ts           # Store exports\n\u2502       \u2502   \u251c\u2500\u2500 common.ts          # Application-wide state\n\u2502       \u2502   \u251c\u2500\u2500 block.ts           # Block-related state\n\u2502       \u2502   \u251c\u2500\u2500 record.ts          # Object/record-related state\n\u2502       \u2502   \u251c\u2500\u2500 detail.ts          # Object details and properties\n\u2502       \u2502   \u251c\u2500\u2500 auth.ts            # Authentication-related state\n\u2502       \u2502   \u251c\u2500\u2500 menu.ts            # Menu-related state\n\u2502       \u2502   \u251c\u2500\u2500 popup.ts           # Popup/modal-related state\n\u2502       \u2502   \u251c\u2500\u2500 notification.ts    # Notification-related state\n\u2502       \u2502   \u251c\u2500\u2500 progress.ts        # Progress indicators\n\u2502       \u2502   \u251c\u2500\u2500 chat.ts            # Chat-related state\n\u2502       \u2502   \u2514\u2500\u2500 extension.ts       # Extension-related state\n\u2502       \u2514\u2500\u2500 lib/\n\u2502           \u2514\u2500\u2500 store.ts           # Store initialization and utilities\n"})}),"\n",(0,i.jsx)(n.h2,{id:"core-implementation",children:"Core Implementation"}),"\n",(0,i.jsx)(n.h3,{id:"store-pattern",children:"Store Pattern"}),"\n",(0,i.jsx)(n.p,{children:"The store implementation follows a consistent pattern across all stores:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'// Simplified example of a store\nclass ExampleStore {\n  // Observable state properties\n  @observable public propertyOne: string = "";\n  @observable public propertyTwo: number = 0;\n  @observable public mapProperty: Map<string, any> = observable.map(new Map());\n\n  constructor() {\n    // Initialize MobX decorators\n    makeObservable(this, {\n      propertyOne: observable,\n      propertyTwo: observable,\n      mapProperty: observable,\n\n      // Computed properties\n      computedProperty: computed,\n\n      // Actions\n      actionOne: action,\n      actionTwo: action,\n    });\n  }\n\n  // Computed properties\n  @computed get computedProperty(): string {\n    return `${this.propertyOne}-${this.propertyTwo}`;\n  }\n\n  // Actions - methods that modify the state\n  @action actionOne(value: string): void {\n    this.propertyOne = value;\n  }\n\n  @action actionTwo(value: number): void {\n    this.propertyTwo = value;\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"store-initialization",children:"Store Initialization"}),"\n",(0,i.jsxs)(n.p,{children:["Stores are initialized in ",(0,i.jsx)(n.code,{children:"lib/store.ts"})," and provided to the application through React's context API:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'// Store initialization (simplified)\nimport { Common, Record, Block, Detail /* other stores */ } from "Store";\n\n// Create singleton instances\nconst common = new Common();\nconst record = new Record();\nconst block = new Block();\nconst detail = new Detail();\n// Other store instances...\n\n// Export store instances\nexport const stores = {\n  common,\n  record,\n  block,\n  detail,\n  // Other stores...\n};\n\n// In app.tsx\nimport { Provider } from "mobx-react";\nimport { stores } from "Lib/store";\n\n// Provide stores to React components\nconst App = () => (\n  <Provider {...stores}>{/* Application components */}</Provider>\n);\n'})}),"\n",(0,i.jsx)(n.h2,{id:"store-implementations",children:"Store Implementations"}),"\n",(0,i.jsxs)(n.h3,{id:"common-store-commonts",children:["Common Store (",(0,i.jsx)(n.code,{children:"common.ts"}),")"]}),"\n",(0,i.jsx)(n.p,{children:"The Common store manages application-wide state:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'// Simplified Common store\nclass CommonStore {\n  // Core app state\n  @observable public dataPathValue: string = "";\n  @observable public configObj: any = {};\n  @observable public themeId: string = "";\n  @observable public isOnlineValue: boolean = false;\n  @observable public languages: string[] = [];\n  @observable public spaceId: string = "";\n  @observable public redirect: string = "";\n\n  // UI state\n  @observable public isFullScreen: boolean = false;\n  @observable public showVaultValue: boolean = null;\n  @observable public showSidebarRightValue = { full: false, popup: false };\n  @observable public hideSidebarValue: boolean = null;\n\n  // Preferences\n  @observable public showRelativeDatesValue: boolean = null;\n  @observable public dateFormatValue: string = null;\n  @observable public timeFormatValue: string = null;\n  @observable public firstDayValue: number = null;\n\n  constructor() {\n    makeObservable(this, {\n      // observable properties\n      // computed properties\n      // actions\n    });\n\n    // Initialize from persistent storage\n    this.init();\n  }\n\n  // Actions for modifying state\n  @action setDataPath(v: string): void {\n    this.dataPathValue = v;\n  }\n\n  @action setTheme(id: string): void {\n    this.themeId = id;\n    // Apply theme to DOM\n    document.body.setAttribute("data-theme", id);\n    // Persist to storage\n    Storage.set("theme", id);\n  }\n\n  // Method to load initial state from storage\n  init(): void {\n    // Load preferences from storage\n    this.themeId = Storage.get("theme") || "light";\n    this.showRelativeDatesValue = Storage.get("showRelativeDates") || false;\n    // Additional initialization...\n  }\n}\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"block-store-blockts",children:["Block Store (",(0,i.jsx)(n.code,{children:"block.ts"}),")"]}),"\n",(0,i.jsx)(n.p,{children:"The Block store manages blocks that form the content of pages:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'// Simplified Block store\nclass BlockStore {\n  // Block data structures\n  @observable public rootId: string = "";\n  @observable public profileId: string = "";\n  @observable public widgetsId: string = "";\n  @observable public spaceviewId: string = "";\n\n  // Maps for storing block data\n  public treeMap: Map<string, Map<string, I.BlockStructure>> = new Map();\n  public blockMap: Map<string, Map<string, I.Block>> = new Map();\n  public restrictionMap: Map<string, Map<string, any>> = new Map();\n\n  constructor() {\n    makeObservable(this, {\n      rootId: observable,\n      profileId: observable,\n      spaceviewId: observable,\n      widgetsId: observable,\n\n      profile: computed,\n      root: computed,\n      spaceview: computed,\n\n      rootSet: action,\n      profileSet: action,\n      widgetsSet: action,\n      spaceviewSet: action,\n\n      set: action,\n      clear: action,\n      clearAll: action,\n      add: action,\n      update: action,\n      updateContent: action,\n      delete: action,\n    });\n  }\n\n  // Computed getters\n  @computed get root(): string {\n    return String(this.rootId || "");\n  }\n\n  // Block manipulation actions\n  @action set(\n    rootId: string,\n    blocks: I.Block[],\n    tree: I.BlockStructure[]\n  ): void {\n    // Create maps for the object if they don\'t exist\n    if (!this.blockMap.has(rootId)) {\n      this.blockMap.set(rootId, new Map());\n    }\n    if (!this.treeMap.has(rootId)) {\n      this.treeMap.set(rootId, new Map());\n    }\n\n    // Set blocks in the map\n    const bm = this.blockMap.get(rootId);\n    blocks.forEach((block) => {\n      bm.set(block.id, block);\n    });\n\n    // Set tree structure\n    const tm = this.treeMap.get(rootId);\n    tree.forEach((item) => {\n      tm.set(item.id, item);\n    });\n  }\n\n  @action add(\n    rootId: string,\n    blocks: I.Block[],\n    tree: I.BlockStructure[]\n  ): void {\n    // Similar to set, but for adding new blocks\n  }\n\n  @action update(rootId: string, id: string, data: any): I.Block {\n    // Update block properties\n    const bm = this.blockMap.get(rootId);\n    if (!bm) {\n      return null;\n    }\n\n    const block = bm.get(id);\n    if (!block) {\n      return null;\n    }\n\n    // Apply updates\n    Object.assign(block, data);\n    bm.set(id, block);\n    return block;\n  }\n\n  @action updateContent(rootId: string, id: string, data: any): I.Block {\n    // Update block content specifically\n    const bm = this.blockMap.get(rootId);\n    if (!bm) {\n      return null;\n    }\n\n    const block = bm.get(id);\n    if (!block) {\n      return null;\n    }\n\n    // Apply content updates\n    block.content = { ...block.content, ...data };\n    bm.set(id, block);\n    return block;\n  }\n\n  @action delete(rootId: string, ids: string[]): void {\n    // Remove blocks from maps\n    const bm = this.blockMap.get(rootId);\n    const tm = this.treeMap.get(rootId);\n    if (!bm || !tm) {\n      return;\n    }\n\n    // Remove blocks and their tree entries\n    ids.forEach((id) => {\n      bm.delete(id);\n      tm.delete(id);\n    });\n  }\n}\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"record-store-recordts",children:["Record Store (",(0,i.jsx)(n.code,{children:"record.ts"}),")"]}),"\n",(0,i.jsx)(n.p,{children:"The Record store manages object records, their types, and relations:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'// Simplified Record store\nclass RecordStore {\n  // Maps for storing records\n  public recordMap: Map<string, Map<string, I.Record>> = new Map();\n  public relationMap: Map<string, Map<string, I.Relation>> = new Map();\n  public objectTypeMap: Map<string, Map<string, I.ObjectType>> = new Map();\n\n  // Active record tracking\n  @observable public activeId: string = "";\n  @observable public activeView: string = "";\n\n  constructor() {\n    makeObservable(this, {\n      activeId: observable,\n      activeView: observable,\n\n      active: computed,\n      activeData: computed,\n\n      activeSet: action,\n      viewSet: action,\n      create: action,\n      update: action,\n      delete: action,\n      clear: action,\n    });\n  }\n\n  // Computed getters\n  @computed get active(): string {\n    return String(this.activeId || "");\n  }\n\n  @computed get activeData(): I.Record {\n    if (!this.active) {\n      return null;\n    }\n\n    const map = this.recordMap.get(S.Common.space);\n    if (!map) {\n      return null;\n    }\n\n    return map.get(this.active);\n  }\n\n  // Actions\n  @action activeSet(id: string): void {\n    this.activeId = id;\n  }\n\n  @action viewSet(view: string): void {\n    this.activeView = view;\n  }\n\n  @action create(spaceId: string, obj: I.Record): void {\n    // Add record to map\n    if (!this.recordMap.has(spaceId)) {\n      this.recordMap.set(spaceId, new Map());\n    }\n\n    const map = this.recordMap.get(spaceId);\n    map.set(obj.id, obj);\n  }\n\n  @action update(spaceId: string, id: string, data: any): I.Record {\n    // Update record properties\n    const map = this.recordMap.get(spaceId);\n    if (!map) {\n      return null;\n    }\n\n    const record = map.get(id);\n    if (!record) {\n      return null;\n    }\n\n    // Apply updates\n    Object.assign(record, data);\n    map.set(id, record);\n    return record;\n  }\n\n  @action delete(spaceId: string, ids: string[]): void {\n    // Remove records from map\n    const map = this.recordMap.get(spaceId);\n    if (!map) {\n      return;\n    }\n\n    ids.forEach((id) => {\n      map.delete(id);\n    });\n  }\n}\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"detail-store-detailts",children:["Detail Store (",(0,i.jsx)(n.code,{children:"detail.ts"}),")"]}),"\n",(0,i.jsx)(n.p,{children:"The Detail store manages UI state related to object details and editing:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'// Simplified Detail store\nclass DetailStore {\n  // Object details state\n  @observable public viewId: string = "";\n  @observable public objects: any[] = [];\n  @observable public cellId: string = "";\n  @observable public relationId: string = "";\n  @observable public isReadonly: boolean = false;\n\n  // UI state\n  @observable public selection: any = null;\n  @observable public menuContext: any = null;\n  @observable public menuObjectContext: any = null;\n\n  constructor() {\n    makeObservable(this, {\n      viewId: observable,\n      objects: observable,\n      cellId: observable,\n      relationId: observable,\n      isReadonly: observable,\n      selection: observable,\n      menuContext: observable,\n      menuObjectContext: observable,\n\n      viewSet: action,\n      objectsSet: action,\n      cellSet: action,\n      relationSet: action,\n      readonlySet: action,\n      selectionSet: action,\n      menuContextSet: action,\n      menuObjectContextSet: action,\n      clear: action,\n    });\n  }\n\n  // Actions\n  @action viewSet(id: string): void {\n    this.viewId = id;\n  }\n\n  @action objectsSet(items: any[]): void {\n    this.objects = items;\n  }\n\n  @action cellSet(id: string): void {\n    this.cellId = id;\n  }\n\n  @action relationSet(id: string): void {\n    this.relationId = id;\n  }\n\n  @action readonlySet(v: boolean): void {\n    this.isReadonly = v;\n  }\n\n  @action selectionSet(v: any): void {\n    this.selection = v;\n  }\n\n  @action menuContextSet(v: any): void {\n    this.menuContext = v;\n  }\n\n  @action menuObjectContextSet(v: any): void {\n    this.menuObjectContext = v;\n  }\n\n  @action clear(): void {\n    this.viewId = "";\n    this.objects = [];\n    this.cellId = "";\n    this.relationId = "";\n    this.isReadonly = false;\n    this.selection = null;\n    this.menuContext = null;\n    this.menuObjectContext = null;\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"state-flow-and-integration",children:"State Flow and Integration"}),"\n",(0,i.jsx)(n.p,{children:"The stores interact with each other and with the backend through a defined flow:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"User Interaction"}),": User interacts with a React component"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Component Action"}),": Component calls a store action"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Store Action"}),": Store action may update local state and/or call the API"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"API Call"}),": API methods communicate with the backend via IPC"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Backend Processing"}),": Backend processes the request and returns a result"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"State Update"}),": Store updates its state based on the result"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Reactive UI"}),": React components re-render automatically due to MobX"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Example flow for creating a new block:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"// Component code (simplified)\nconst handleAddBlock = () => {\n  S.Block.add(recordId,\n    [ newBlock ],\n    [ blockStructure ]\n  );\n};\n\n// In Block store\n@action add(rootId: string, blocks: I.Block[], tree: I.BlockStructure[]): void {\n  // Update local state first (optimistic update)\n  this.updateLocalState(rootId, blocks, tree);\n\n  // Call backend\n  API.BlockCreate(rootId, blocks, tree, (result) => {\n    // Handle any differences between expected and actual result\n    if (result.error) {\n      // Revert optimistic update if needed\n      this.handleError(result.error);\n    }\n  });\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"performance-optimizations",children:"Performance Optimizations"}),"\n",(0,i.jsx)(n.p,{children:"The store implementation includes several performance optimizations:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Selective Rendering"}),": MobX only re-renders components that depend on changed state"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Map Data Structures"}),": Using Map objects for efficient lookups and updates"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Batched Updates"}),": Grouping multiple state changes in a single transaction"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Computed Properties"}),": Caching derived state until dependencies change"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Lazy Loading"}),": Loading data only when needed"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Example of batched updates:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:'import { runInAction } from "mobx";\n\nrunInAction(() => {\n  store.property1 = "value1";\n  store.property2 = "value2";\n  store.property3 = "value3";\n  // Only one re-render will occur\n});\n'})}),"\n",(0,i.jsx)(n.h2,{id:"store-integration-with-react-components",children:"Store Integration with React Components"}),"\n",(0,i.jsxs)(n.p,{children:["React components connect to the stores using the ",(0,i.jsx)(n.code,{children:"observer"})," higher-order component and context:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { observer } from 'mobx-react';\nimport { useStore } from 'Lib/store';\n\nconst MyComponent = observer(() => {\n  const { common, block } = useStore();\n\n  const handleClick = () => {\n    block.add(common.root, [...], [...]);\n  };\n\n  return (\n    <div>\n      {/* Component rendering based on store state */}\n      {block.blockMap.get(common.root)?.map(block => (\n        <BlockComponent key={block.id} block={block} />\n      ))}\n      <button onClick={handleClick}>Add Block</button>\n    </div>\n  );\n});\n"})}),"\n",(0,i.jsx)(n.h2,{id:"error-handling",children:"Error Handling"}),"\n",(0,i.jsx)(n.p,{children:"The stores implement error handling to maintain consistency:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Optimistic Updates"}),": Updates UI immediately, then reverts if backend fails"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Error State"}),": Stores track error states for UI feedback"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Retry Mechanisms"}),": Implementing retry logic for failed operations"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Fallback States"}),": Defining fallback states when data is unavailable"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"key-insights",children:"Key Insights"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Multi-Store Pattern"}),": The state is divided into domain-specific stores for modularity and separation of concerns."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Reactive Architecture"}),": MobX provides a reactive system that automatically updates the UI when state changes."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Clear State Ownership"}),": Each store has clear ownership of specific parts of the application state."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Backend Integration"}),": Stores act as the integration point between the UI and backend services."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Optimistic Updates"}),": The system uses optimistic updates to provide a responsive user experience."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Consistent Patterns"}),": All stores follow consistent patterns, making the codebase easier to understand and maintain."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Type Safety"}),": TypeScript interfaces ensure type safety throughout the state management system."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"This architecture enables Anytype to maintain a clean separation between UI and state management while providing a responsive and consistent user experience."})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);