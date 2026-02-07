import { Redis } from "ioredis";

let redisInstance = null;

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  // Return null if Redis URL is not defined - will skip Redis operations
  return null;
};

const getRedisConnection = () => {
  if (!redisInstance && process.env.REDIS_URL) {
    redisInstance = new Redis(getRedisUrl());
  }
  return redisInstance;
};

// Export a proxy that handles undefined Redis gracefully
export const redis = {
  rpush: async (key, value) => {
    const instance = getRedisConnection();
    if (instance) {
      return await instance.rpush(key, value);
    }
    // Gracefully skip if Redis is not available
    console.log("Redis not configured, skipping cache operation");
    return null;
  },
  lrange: async (key, start, stop) => {
    const instance = getRedisConnection();
    if (instance) {
      return await instance.lrange(key, start, stop);
    }
    return [];
  },
  del: async (key) => {
    const instance = getRedisConnection();
    if (instance) {
      return await instance.del(key);
    }
    return null;
  },
  get: async (key) => {
    const instance = getRedisConnection();
    if (instance) {
      return await instance.get(key);
    }
    return null;
  },
  set: async (key, value, options) => {
    const instance = getRedisConnection();
    if (instance) {
      return await instance.set(key, value, ...(options ? [options] : []));
    }
    return null;
  },
};
