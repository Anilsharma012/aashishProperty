import { MongoClient, Db } from "mongodb";

const username = "Aashishpropeorty";
const password = "ANILSHARMA";
const cluster = "property.zn2cowc.mongodb.net";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${cluster}/?retryWrites=true&w=majority&appName=Property`;

const DB_NAME = process.env.DB_NAME || "aashish_property";

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) {
    console.log("📌 Using existing MongoDB connection");
    return { client, db };
  }

  try {
    console.log("🔄 Connecting to MongoDB Atlas...");
    console.log("🔗 Connection string:", MONGODB_URI.replace(password, "***"));
    console.log("👤 Username:", username);
    console.log("🌐 Cluster:", cluster);
    console.log("📊 Target Database:", DB_NAME);

    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 20000,
      maxPoolSize: 10,
      retryWrites: true,
      retryReads: true,
      maxIdleTimeMS: 30000,
      heartbeatFrequencyMS: 10000,
      authSource: "admin",
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
    });

    console.log("🤝 Attempting to connect...");
    await client.connect();
    console.log("✅ Client connected to MongoDB Atlas");

    console.log("🏓 Testing connection with ping...");
    const pingResult = await client.db("admin").command({ ping: 1 });
    console.log("🏓 Ping result:", pingResult);

    db = client.db(DB_NAME);
    console.log("✅ Connected to MongoDB Atlas successfully!");
    console.log("📊 Database:", DB_NAME);

    const stats = await db.stats();
    console.log("📈 Database stats:", {
      collections: stats.collections,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
    });

    return { client, db };
  } catch (error: any) {
    console.error("❌ Failed to connect to MongoDB Atlas:");
    console.error("📋 Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
    });

    // Diagnostic logging (but no recursion!)
    if (client) {
      try {
        await client.close();
      } catch (closeError) {
        console.error("⚠️ Error closing failed connection:", closeError);
      }
    }

    throw error; // ✅ DO NOT RETRY HERE! Just throw it.
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}
