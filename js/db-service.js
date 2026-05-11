// db-service.js
// Single abstraction point over the database provider.
// To swap Firebase for another provider, only this file changes.

window.dbService = (() => {
    const db = () => window.db;
    const ts = () => firebase.firestore.FieldValue.serverTimestamp();

    return {
        // --- Candles ---
        onCandles(callback, onError) {
            return db().collection('candles')
                .orderBy('timestamp', 'desc')
                .onSnapshot(callback, onError);
        },
        addCandle(data) {
            return db().collection('candles').add({ ...data, timestamp: ts() });
        },

        // --- Photos ---
        onPhotos(callback, onError) {
            return db().collection('photos')
                .orderBy('timestamp', 'desc')
                .onSnapshot(callback, onError);
        },
        addPhoto(data) {
            return db().collection('photos').add({ ...data, timestamp: ts() });
        },

        // --- Memories ---
        onMemories(callback, onError) {
            return db().collection('memories')
                .orderBy('timestamp', 'desc')
                .onSnapshot(callback, onError);
        },
        addMemory(data) {
            return db().collection('memories').add({ ...data, timestamp: ts() });
        },

        // --- Visitors ---
        addVisitor(data) {
            return db().collection('visitors').add(data);
        },
        getVisitors() {
            return db().collection('visitors').get();
        },
        onVisitors(callback, onError) {
            return db().collection('visitors').onSnapshot(callback, onError);
        },
    };
})();
