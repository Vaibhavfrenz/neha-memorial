// Simple script to clear visitor data - run this in browser console
// Usage: Open the memorial website, press F12, go to Console, paste this script

console.log('🕯️ Neha Memorial - Visitor Data Cleanup Tool');
console.log('==============================================');

// Check if Firebase is available
if (!window.db) {
    console.error('❌ Firebase database not available. Please run this on the memorial website.');
    console.log('📋 Instructions:');
    console.log('1. Open the memorial website in your browser');
    console.log('2. Press F12 to open Developer Tools');
    console.log('3. Go to Console tab');
    console.log('4. Paste this script and press Enter');
} else {
    console.log('✅ Firebase database connected');
    
    // Function to clear visitors
    async function clearVisitors() {
        try {
            console.log('🔍 Checking visitor data...');
            
            const snapshot = await db.collection('visitors').get();
            const visitorCount = snapshot.size;
            
            console.log(`📊 Found ${visitorCount} visitor records`);
            
            if (visitorCount === 0) {
                console.log('✅ No visitor data to clear');
                return;
            }
            
            // Show sample data
            console.log('\n📋 Sample visitor records:');
            let count = 0;
            snapshot.forEach((doc) => {
                if (count < 5) {
                    const data = doc.data();
                    const timestamp = data.timestamp ? data.timestamp.toDate().toLocaleString() : 'No timestamp';
                    console.log(`  - ${data.city || 'Unknown City'}, ${data.country || 'Unknown Country'} (${timestamp})`);
                    count++;
                }
            });
            
            if (visitorCount > 5) {
                console.log(`  ... and ${visitorCount - 5} more records`);
            }
            
            // Ask for confirmation
            const confirmed = confirm(`⚠️  Are you sure you want to delete ALL ${visitorCount} visitor records?\n\nThis will reset:\n• Total visitors count\n• Countries count\n• Cities count\n\nThis action cannot be undone!`);
            
            if (!confirmed) {
                console.log('❌ Deletion cancelled by user');
                return;
            }
            
            console.log('\n🗑️  Starting deletion...');
            
            // Delete in batches (Firestore limit is 500 operations per batch)
            const batchSize = 400;
            let deletedCount = 0;
            let totalBatches = Math.ceil(visitorCount / batchSize);
            let currentBatch = 0;
            
            // Get all documents first
            const allDocs = [];
            snapshot.forEach((doc) => {
                allDocs.push(doc);
            });
            
            // Delete in batches
            for (let i = 0; i < allDocs.length; i += batchSize) {
                currentBatch++;
                const batch = db.batch();
                const batchDocs = allDocs.slice(i, i + batchSize);
                
                batchDocs.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                
                await batch.commit();
                deletedCount += batchDocs.length;
                console.log(`  ✅ Batch ${currentBatch}/${totalBatches}: Deleted ${deletedCount}/${visitorCount} records`);
            }
            
            console.log(`\n🎉 Successfully deleted ${deletedCount} visitor records!`);
            console.log('📊 Visitor statistics have been reset:');
            console.log('   • Total visitors: 0');
            console.log('   • Countries: 0');
            console.log('   • Cities: 0');
            
            // Show success message
            alert(`✅ Successfully deleted ${deletedCount} visitor records!\n\nVisitor statistics have been reset.`);
            
        } catch (error) {
            console.error('❌ Error deleting visitors:', error);
            alert(`❌ Error: ${error.message}`);
        }
    }
    
    // Auto-run the cleanup
    clearVisitors();
}

// Alternative manual function
function clearVisitorsManual() {
    if (!window.db) {
        console.error('Firebase not available');
        return;
    }
    
    db.collection('visitors').get()
        .then((snapshot) => {
            console.log(`Found ${snapshot.size} visitors`);
            if (snapshot.size === 0) {
                alert('No visitors to delete');
                return;
            }
            
            const confirmed = confirm(`Delete ${snapshot.size} visitor records?`);
            if (!confirmed) return;
            
            const batch = db.batch();
            snapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            
            return batch.commit();
        })
        .then(() => {
            console.log('Visitors deleted successfully');
            alert('All visitor data cleared!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
}

console.log('\n📋 Available commands:');
console.log('• clearVisitors() - Run the full cleanup process');
console.log('• clearVisitorsManual() - Quick manual cleanup'); 