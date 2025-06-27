// Comprehensive script to clear all test data from Firebase database
// Run this in the browser console on the memorial website

console.log('Starting comprehensive data cleanup...');

// Check if Firebase is available
if (!window.db) {
    console.error('Firebase database not available. Please run this on the memorial website.');
} else {
    const collections = ['candles', 'photos', 'memories'];
    let totalDeleted = 0;
    
    async function clearCollection(collectionName) {
        try {
            const snapshot = await db.collection(collectionName).get();
            console.log(`Found ${snapshot.size} items in ${collectionName}`);
            
            if (snapshot.size === 0) {
                console.log(`No items found in ${collectionName}`);
                return 0;
            }
            
            // Create batch delete
            const batch = db.batch();
            snapshot.forEach((doc) => {
                const data = doc.data();
                const identifier = data.name || data.caption || data.author || doc.id;
                console.log(`Marking ${collectionName} "${identifier}" for deletion`);
                batch.delete(doc.ref);
            });
            
            // Execute the batch delete
            await batch.commit();
            console.log(`✅ Successfully deleted ${snapshot.size} items from ${collectionName}`);
            return snapshot.size;
            
        } catch (error) {
            console.error(`Error deleting from ${collectionName}:`, error);
            return 0;
        }
    }
    
    // Clear all collections
    async function clearAllData() {
        console.log('Starting cleanup of all test data...');
        
        for (const collection of collections) {
            const deleted = await clearCollection(collection);
            totalDeleted += deleted;
        }
        
        console.log(`🎉 Cleanup complete! Total items deleted: ${totalDeleted}`);
        alert(`Cleanup complete! Total items deleted: ${totalDeleted}`);
    }
    
    // Start the cleanup
    clearAllData();
}

// Alternative: Clear only candles
function clearCandlesOnly() {
    console.log('Starting candle-only cleanup...');
    
    if (!window.db) {
        console.error('Firebase database not available. Please run this on the memorial website.');
        return;
    }
    
    db.collection('candles').get()
        .then((snapshot) => {
            console.log(`Found ${snapshot.size} candles to delete`);
            
            if (snapshot.size === 0) {
                console.log('No candles found to delete.');
                alert('No candles found to delete.');
                return;
            }
            
            // Create batch delete
            const batch = db.batch();
            snapshot.forEach((doc) => {
                const data = doc.data();
                console.log(`Marking candle "${data.name}" for deletion`);
                batch.delete(doc.ref);
            });
            
            // Execute the batch delete
            return batch.commit();
        })
        .then(() => {
            console.log('✅ All candles have been successfully deleted!');
            alert('All candles have been cleared from the database!');
        })
        .catch((error) => {
            console.error('Error deleting candles:', error);
            alert('Error deleting candles: ' + error.message);
        });
}

// Usage instructions
console.log(`
📋 CLEANUP SCRIPT INSTRUCTIONS:

1. Open the memorial website in your browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Copy and paste one of these commands:

   // To clear only candles:
   clearCandlesOnly();
   
   // To clear all test data (candles, photos, memories):
   // (The script will run automatically when loaded)
   
5. Press Enter to execute
6. Wait for the confirmation message

⚠️  WARNING: This will permanently delete all data from the selected collections!
`); 