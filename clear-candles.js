// Script to clear all candles from Firebase database
// Run this in the browser console on the memorial website

console.log('Starting candle cleanup...');

// Check if Firebase is available
if (!window.db) {
    console.error('Firebase database not available. Please run this on the memorial website.');
} else {
    // Get all candles
    db.collection('candles').get()
        .then((snapshot) => {
            console.log(`Found ${snapshot.size} candles to delete`);
            
            if (snapshot.size === 0) {
                console.log('No candles found to delete.');
                return;
            }
            
            // Create batch delete
            const batch = db.batch();
            snapshot.forEach((doc) => {
                console.log(`Marking candle "${doc.data().name}" for deletion`);
                batch.delete(doc.ref);
            });
            
            // Execute the batch delete
            return batch.commit();
        })
        .then(() => {
            console.log('✅ All candles have been successfully deleted from the database!');
            alert('All candles have been cleared from the database!');
        })
        .catch((error) => {
            console.error('Error deleting candles:', error);
            alert('Error deleting candles: ' + error.message);
        });
} 