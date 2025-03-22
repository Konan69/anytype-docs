"use strict";(self.webpackChunkanytype_docs=self.webpackChunkanytype_docs||[]).push([[868],{387:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"backend/object_store","title":"Object Store: Technical Implementation Analysis","description":"Detailed technical analysis of Anytype\'s Object Store implementation","source":"@site/docs/backend/object_store.md","sourceDirName":"backend","slug":"/backend/object_store","permalink":"/anytype-docs/docs/backend/object_store","draft":false,"unlisted":false,"editUrl":"https://github.com/konan69/anytype-docs/tree/main/docs/backend/object_store.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"Object Store: Technical Implementation Analysis","description":"Detailed technical analysis of Anytype\'s Object Store implementation","sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Block Service: Technical Implementation Analysis","permalink":"/anytype-docs/docs/backend/block_service"},"next":{"title":"CRDT and Sync Mechanism: Technical Implementation Analysis","permalink":"/anytype-docs/docs/sync/crdt"}}');var i=t(4848),o=t(8453);const s={title:"Object Store: Technical Implementation Analysis",description:"Detailed technical analysis of Anytype's Object Store implementation",sidebar_position:3},c="Object Store: Technical Implementation Analysis",a={},l=[{value:"Overview",id:"overview",level:2},{value:"File Structure",id:"file-structure",level:2},{value:"Core Implementation",id:"core-implementation",level:2},{value:"Main Interface (objectstore.go)",id:"main-interface-objectstorego",level:3},{value:"Storage Implementation",id:"storage-implementation",level:3},{value:"Querying System (query.go)",id:"querying-system-querygo",level:3},{value:"Indexing System (index.go)",id:"indexing-system-indexgo",level:3},{value:"Transaction Support (transaction.go)",id:"transaction-support-transactiongo",level:2},{value:"Collection Management (collection.go)",id:"collection-management-collectiongo",level:2},{value:"Performance Optimization",id:"performance-optimization",level:2},{value:"Change Buffer",id:"change-buffer",level:3},{value:"Read Caching",id:"read-caching",level:3},{value:"Error Handling",id:"error-handling",level:2},{value:"Metrics and Monitoring (metrics.go)",id:"metrics-and-monitoring-metricsgo",level:2},{value:"Design Patterns",id:"design-patterns",level:2},{value:"Integration Points",id:"integration-points",level:2},{value:"Performance Characteristics",id:"performance-characteristics",level:2},{value:"Concurrency Handling",id:"concurrency-handling",level:2},{value:"Key Insights",id:"key-insights",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"object-store-technical-implementation-analysis",children:"Object Store: Technical Implementation Analysis"})}),"\n",(0,i.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,i.jsx)(n.p,{children:"The Object Store is a fundamental component of anytype-heart, providing persistence and retrieval functionality for Anytype objects. It serves as the primary data storage mechanism, handling everything from basic CRUD operations to complex queries and indexing."}),"\n",(0,i.jsx)(n.h2,{id:"file-structure",children:"File Structure"}),"\n",(0,i.jsx)(n.p,{children:"The Object Store implementation is organized as follows:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"anytype-heart/\n\u251c\u2500\u2500 pkg/\n\u2502   \u2514\u2500\u2500 lib/\n\u2502       \u2514\u2500\u2500 localstore/\n\u2502           \u251c\u2500\u2500 objectstore/\n\u2502           \u2502   \u251c\u2500\u2500 objectstore.go         # Main implementation\n\u2502           \u2502   \u251c\u2500\u2500 collection.go          # Collection handling\n\u2502           \u2502   \u251c\u2500\u2500 query.go               # Query processor\n\u2502           \u2502   \u251c\u2500\u2500 index.go               # Indexing functionality\n\u2502           \u2502   \u251c\u2500\u2500 transaction.go         # Transaction handling\n\u2502           \u2502   \u2514\u2500\u2500 metrics.go             # Performance metrics\n\u2502           \u2514\u2500\u2500 common/\n\u2502               \u251c\u2500\u2500 types.go               # Common type definitions\n\u2502               \u2514\u2500\u2500 errors.go              # Error definitions\n"})}),"\n",(0,i.jsx)(n.h2,{id:"core-implementation",children:"Core Implementation"}),"\n",(0,i.jsx)(n.h3,{id:"main-interface-objectstorego",children:"Main Interface (objectstore.go)"}),"\n",(0,i.jsx)(n.p,{children:"The Object Store follows a clean repository pattern with clearly defined interfaces:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// ObjectStore represents the main interface for object storage\ntype ObjectStore interface {\n    // Basic CRUD operations\n    GetObject(ctx context.Context, id string) (*Object, error)\n    StoreObject(ctx context.Context, object *Object) error\n    DeleteObject(ctx context.Context, id string) error\n\n    // Batch operations\n    GetObjects(ctx context.Context, ids []string) (map[string]*Object, error)\n    StoreObjects(ctx context.Context, objects []*Object) error\n    DeleteObjects(ctx context.Context, ids []string) error\n\n    // Query operations\n    Query(ctx context.Context, query *Query) ([]*Object, error)\n    Count(ctx context.Context, query *Query) (int64, error)\n\n    // Transaction support\n    WithTransaction(ctx context.Context, fn func(tx Transaction) error) error\n\n    // Service lifecycle\n    Start(ctx context.Context) error\n    Stop(ctx context.Context) error\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"storage-implementation",children:"Storage Implementation"}),"\n",(0,i.jsx)(n.p,{children:"The object store uses BadgerDB as its underlying key-value store, with custom serialization and indexing mechanisms built on top of it:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// Simplified implementation of Store\ntype store struct {\n    db           *badger.DB        // Underlying BadgerDB instance\n    indexer      *indexer          // Custom indexing system\n    metrics      *metrics          // Performance metrics\n    collections  map[string]bool   // Known collections\n    changeBuffer *changeBuffer     // Buffer for batching changes\n    mutex        sync.RWMutex      // Concurrency control\n}\n\n// Store object implementation\nfunc (s *store) StoreObject(ctx context.Context, object *Object) error {\n    // 1. Validate object\n    if err := validateObject(object); err != nil {\n        return err\n    }\n\n    // 2. Get existing object (if any) for update operations\n    existingObj, err := s.GetObject(ctx, object.ID)\n    isUpdate := err == nil && existingObj != nil\n\n    // 3. Prepare transaction\n    return s.db.Update(func(txn *badger.Txn) error {\n        // 4. Serialize object\n        data, err := proto.Marshal(object)\n        if err != nil {\n            return err\n        }\n\n        // 5. Store object data\n        key := objectKey(object.ID)\n        err = txn.Set(key, data)\n        if err != nil {\n            return err\n        }\n\n        // 6. Update indexes\n        err = s.indexer.updateIndexes(txn, object, existingObj, isUpdate)\n        if err != nil {\n            return err\n        }\n\n        // 7. Update collection info\n        return s.updateCollectionEntry(txn, object.Collection, object.ID)\n    })\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"querying-system-querygo",children:"Querying System (query.go)"}),"\n",(0,i.jsx)(n.p,{children:"The querying system provides powerful filtering, sorting, and pagination capabilities:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// Query executor\nfunc (s *store) Query(ctx context.Context, q *Query) ([]*Object, error) {\n    // 1. Prepare result storage\n    results := make([]*Object, 0)\n\n    // 2. Handle special cases\n    if q.Limit == 0 {\n        return results, nil\n    }\n\n    // 3. Check if we can use an index for this query\n    indexPlan, useIndex := s.indexer.planQuery(q)\n\n    // 4. Execute query based on plan\n    err := s.db.View(func(txn *badger.Txn) error {\n        var err error\n\n        if useIndex {\n            // Use index-based querying\n            results, err = s.executeIndexQuery(txn, q, indexPlan)\n        } else {\n            // Use full scan with filter\n            results, err = s.executeFullScanQuery(txn, q)\n        }\n\n        return err\n    })\n\n    // 5. Apply sorting (if not handled by index)\n    if err == nil && q.Sort != nil && !indexPlan.sortsApplied {\n        sortObjects(results, q.Sort)\n    }\n\n    // 6. Apply pagination\n    if err == nil && q.Offset > 0 {\n        if q.Offset < len(results) {\n            results = results[q.Offset:]\n        } else {\n            results = nil\n        }\n    }\n\n    if err == nil && q.Limit > 0 && len(results) > q.Limit {\n        results = results[:q.Limit]\n    }\n\n    // 7. Return results\n    return results, err\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"indexing-system-indexgo",children:"Indexing System (index.go)"}),"\n",(0,i.jsx)(n.p,{children:"The indexing system optimizes query performance by maintaining specialized indexes:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// Key index types\ntype IndexType int\n\nconst (\n    IndexTypeExact IndexType = iota  // Exact match index\n    IndexTypePrefix             // Prefix match index\n    IndexTypeRange              // Range match index\n    IndexTypeFullText           // Full-text search index\n)\n\n// Index implementation\ntype indexer struct {\n    indexes   map[string]*index    // Map of indexes by name\n    db        *badger.DB           // Reference to DB for operations\n    // Optimization settings...\n}\n\n// Create and update indexes for an object\nfunc (idx *indexer) updateIndexes(txn *badger.Txn, obj *Object, oldObj *Object, isUpdate bool) error {\n    // Remove old index entries for updates\n    if isUpdate && oldObj != nil {\n        err := idx.removeIndexEntries(txn, oldObj)\n        if err != nil {\n            return err\n        }\n    }\n\n    // Add new index entries\n    for fieldName, index := range idx.indexes {\n        value, exists := getFieldValue(obj, fieldName)\n        if !exists {\n            continue\n        }\n\n        // Create index entry\n        key := index.createIndexKey(obj.Collection, fieldName, value, obj.ID)\n        err := txn.Set(key, []byte{1}) // We only need the key, value is a placeholder\n        if err != nil {\n            return err\n        }\n    }\n\n    return nil\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"transaction-support-transactiongo",children:"Transaction Support (transaction.go)"}),"\n",(0,i.jsx)(n.p,{children:"The Object Store provides robust transaction support, ensuring atomic operations:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// Transaction interface\ntype Transaction interface {\n    GetObject(id string) (*Object, error)\n    StoreObject(object *Object) error\n    DeleteObject(id string) error\n    Query(query *Query) ([]*Object, error)\n    // Additional methods...\n}\n\n// Transaction implementation\ntype transaction struct {\n    txn        *badger.Txn    // Badger transaction\n    store      *store         // Reference to main store\n    operations []txOperation  // Log of operations for rollback\n}\n\n// WithTransaction wraps operations in a transaction\nfunc (s *store) WithTransaction(ctx context.Context, fn func(tx Transaction) error) error {\n    return s.db.Update(func(txn *badger.Txn) error {\n        tx := &transaction{\n            txn:   txn,\n            store: s,\n        }\n        return fn(tx)\n    })\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"collection-management-collectiongo",children:"Collection Management (collection.go)"}),"\n",(0,i.jsx)(n.p,{children:"Collections provide logical grouping of objects and optimize querying:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// Collection operations\ntype CollectionOperations interface {\n    GetCollections(ctx context.Context) ([]string, error)\n    GetCollectionObjects(ctx context.Context, collection string) ([]string, error)\n    DeleteCollection(ctx context.Context, collection string) error\n}\n\n// Implementation for collection listing\nfunc (s *store) GetCollections(ctx context.Context) ([]string, error) {\n    collections := make([]string, 0)\n\n    err := s.db.View(func(txn *badger.Txn) error {\n        it := txn.NewIterator(badger.DefaultIteratorOptions)\n        defer it.Close()\n\n        prefix := []byte(collectionPrefix)\n        for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {\n            key := it.Item().Key()\n            collection := extractCollectionFromKey(key)\n            collections = append(collections, collection)\n        }\n\n        return nil\n    })\n\n    return collections, err\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"performance-optimization",children:"Performance Optimization"}),"\n",(0,i.jsx)(n.h3,{id:"change-buffer",children:"Change Buffer"}),"\n",(0,i.jsx)(n.p,{children:"To optimize write performance, changes are buffered and batch-processed:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// Change buffer for batching writes\ntype changeBuffer struct {\n    changes    map[string]*Object    // Map of object changes\n    deletions  map[string]bool       // Map of object deletions\n    mutex      sync.Mutex            // Concurrency control\n    flushTimer *time.Timer           // Timer for auto-flushing\n}\n\n// Add object to buffer\nfunc (b *changeBuffer) addObject(obj *Object) {\n    b.mutex.Lock()\n    defer b.mutex.Unlock()\n\n    // Add to changes, remove from deletions if present\n    b.changes[obj.ID] = obj\n    delete(b.deletions, obj.ID)\n\n    // Ensure flush timer is running\n    b.ensureFlushTimer()\n}\n\n// Flush buffer to storage\nfunc (b *changeBuffer) flush(s *store) error {\n    b.mutex.Lock()\n    changes := b.changes\n    deletions := b.deletions\n    b.changes = make(map[string]*Object)\n    b.deletions = make(map[string]bool)\n    b.mutex.Unlock()\n\n    // Process in transaction\n    return s.db.Update(func(txn *badger.Txn) error {\n        // Process changes\n        for _, obj := range changes {\n            data, err := proto.Marshal(obj)\n            if err != nil {\n                return err\n            }\n\n            key := objectKey(obj.ID)\n            err = txn.Set(key, data)\n            if err != nil {\n                return err\n            }\n\n            // Update indexes...\n        }\n\n        // Process deletions\n        for id := range deletions {\n            key := objectKey(id)\n            err := txn.Delete(key)\n            if err != nil {\n                return err\n            }\n\n            // Clean up indexes...\n        }\n\n        return nil\n    })\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"read-caching",children:"Read Caching"}),"\n",(0,i.jsx)(n.p,{children:"Frequently accessed objects are cached to improve read performance:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"// Object cache\ntype objectCache struct {\n    cache      *lru.Cache    // LRU cache for objects\n    maxSize    int           // Maximum cache size\n    hitCount   int64         // Cache hit counter\n    missCount  int64         // Cache miss counter\n}\n\n// Get object from cache\nfunc (c *objectCache) get(id string) (*Object, bool) {\n    value, found := c.cache.Get(id)\n    if found {\n        atomic.AddInt64(&c.hitCount, 1)\n        return value.(*Object), true\n    }\n\n    atomic.AddInt64(&c.missCount, 1)\n    return nil, false\n}\n\n// Put object in cache\nfunc (c *objectCache) put(obj *Object) {\n    c.cache.Add(obj.ID, obj)\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"error-handling",children:"Error Handling"}),"\n",(0,i.jsx)(n.p,{children:"The Object Store implements comprehensive error handling with custom error types:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'// Error types\nvar (\n    ErrObjectNotFound = errors.New("object not found")\n    ErrInvalidObject = errors.New("invalid object")\n    ErrDuplicateID = errors.New("duplicate object ID")\n    ErrInvalidQuery = errors.New("invalid query")\n    // Additional error types...\n)\n\n// Error wrapping with context\nfunc wrapError(err error, msg string, id string) error {\n    if err == nil {\n        return nil\n    }\n\n    if errors.Is(err, badger.ErrKeyNotFound) {\n        return fmt.Errorf("%s: %w for ID %s", msg, ErrObjectNotFound, id)\n    }\n\n    return fmt.Errorf("%s: %w for ID %s", msg, err, id)\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"metrics-and-monitoring-metricsgo",children:"Metrics and Monitoring (metrics.go)"}),"\n",(0,i.jsx)(n.p,{children:"The implementation includes detailed metrics for monitoring performance:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'// Metrics collection\ntype metrics struct {\n    readLatency       prometheus.Histogram\n    writeLatency      prometheus.Histogram\n    queryLatency      prometheus.Histogram\n    cacheHitRatio     prometheus.Gauge\n    objectCount       prometheus.Gauge\n    bytesUsed         prometheus.Gauge\n    // Additional metrics...\n}\n\n// Record operation timing\nfunc (m *metrics) recordOperation(op string, start time.Time) {\n    duration := time.Since(start).Seconds()\n\n    switch op {\n    case "read":\n        m.readLatency.Observe(duration)\n    case "write":\n        m.writeLatency.Observe(duration)\n    case "query":\n        m.queryLatency.Observe(duration)\n    }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"design-patterns",children:"Design Patterns"}),"\n",(0,i.jsx)(n.p,{children:"The Object Store implementation employs several design patterns:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Repository Pattern"}),": Providing a clean abstraction over the data storage"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Transaction Script Pattern"}),": Using transactions to ensure atomicity"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Decorator Pattern"}),": Adding functionality like metrics and caching"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Strategy Pattern"}),": Using different strategies for query execution"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Builder Pattern"}),": Building complex queries programmatically"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Factory Method"}),": Creating specialized index instances"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"integration-points",children:"Integration Points"}),"\n",(0,i.jsx)(n.p,{children:"The Object Store integrates with several other components:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Block Service"}),": Storing block data as part of objects"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Sync Service"}),": Providing persistence for the synchronization system"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Indexer Service"}),": Coordinating with the full-text search functionality"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Query Service"}),": Supporting complex querying operations"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"performance-characteristics",children:"Performance Characteristics"}),"\n",(0,i.jsx)(n.p,{children:"Based on the implementation, we can observe several key performance characteristics:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Write Optimization"}),": Prioritizing write performance through batching"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Read Caching"}),": Optimizing repeated reads of the same objects"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Query Planning"}),": Intelligently choosing the most efficient query execution plan"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Index Utilization"}),": Leveraging indexes for common query patterns"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Lazy Loading"}),": Loading object data only when needed"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"concurrency-handling",children:"Concurrency Handling"}),"\n",(0,i.jsx)(n.p,{children:"The implementation shows careful attention to concurrency:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Mutex Protection"}),": Protecting shared data structures with mutexes"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Transaction Isolation"}),": Using BadgerDB's transaction system for isolation"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Atomic Operations"}),": Ensuring operations are atomic"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Lock Management"}),": Careful management of read/write locks to prevent deadlocks"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"key-insights",children:"Key Insights"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"The Object Store is designed with a strong focus on performance, with careful optimizations for common operations."}),"\n",(0,i.jsx)(n.li,{children:"It uses BadgerDB as an embedded key-value store, providing persistence without requiring external databases."}),"\n",(0,i.jsx)(n.li,{children:"The implementation includes a sophisticated indexing system to support efficient querying."}),"\n",(0,i.jsx)(n.li,{children:"Transactions ensure data consistency even in the face of failures."}),"\n",(0,i.jsx)(n.li,{children:"The caching strategy optimizes frequently accessed data while maintaining consistency."}),"\n",(0,i.jsx)(n.li,{children:"Careful error handling ensures robust operation even in edge cases."}),"\n",(0,i.jsx)(n.li,{children:"The metrics system provides visibility into performance characteristics."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"This analysis provides a comprehensive look at the Object Store implementation, revealing the sophisticated data management capabilities of the Anytype system."})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var r=t(6540);const i={},o=r.createContext(i);function s(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);