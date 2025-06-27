// Node.js script to clear visitor data from Firebase
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "neha-memorial-website-1f540",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "YOUR_CLIENT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "YOUR_CERT_URL"
};

// Initialize the app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function clearVisitors() {
  try {
    console.log('🔍 Checking visitor data...');
    
    // Get all visitors
    const visitorsSnapshot = await db.collection('visitors').get();
    const visitorCount = visitorsSnapshot.size;
    
    console.log(`📊 Found ${visitorCount} visitor records`);
    
    if (visitorCount === 0) {
      console.log('✅ No visitor data to clear');
      return;
    }
    
    // Show some visitor details
    console.log('\n📋 Sample visitor records:');
    let count = 0;
    visitorsSnapshot.forEach((doc) => {
      if (count < 5) { // Show first 5 records
        const data = doc.data();
        console.log(`  - ${data.city || 'Unknown City'}, ${data.country || 'Unknown Country'} (${data.timestamp ? data.timestamp.toDate().toLocaleString() : 'No timestamp'})`);
        count++;
      }
    });
    
    if (visitorCount > 5) {
      console.log(`  ... and ${visitorCount - 5} more records`);
    }
    
    // Ask for confirmation
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('\n⚠️  Are you sure you want to delete ALL visitor data? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        console.log('\n🗑️  Starting deletion...');
        
        // Delete in batches (Firestore has a limit of 500 operations per batch)
        const batchSize = 400;
        let deletedCount = 0;
        
        for (let i = 0; i < visitorCount; i += batchSize) {
          const batch = db.batch();
          const batchSnapshot = await db.collection('visitors').limit(batchSize).get();
          
          batchSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          
          await batch.commit();
          deletedCount += batchSnapshot.size;
          console.log(`  ✅ Deleted batch: ${deletedCount}/${visitorCount} records`);
        }
        
        console.log(`\n🎉 Successfully deleted ${deletedCount} visitor records!`);
        console.log('📊 Visitor count, country count, and city count have been reset.');
        
      } else {
        console.log('\n❌ Deletion cancelled');
      }
      
      rl.close();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
clearVisitors(); 