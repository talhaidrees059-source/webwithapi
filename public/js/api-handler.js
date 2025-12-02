// API Handler for Aberdeen Energy Hub
class APIHandler {
    constructor() {
        this.baseUrl = CONFIG.API_BASE_URL;
        this.cache = {};
        this.cacheTimeout = CONFIG.SETTINGS.CACHE_TIMEOUT || 300000;
    }

    async fetchData(endpoint) {
        try {
            const cacheKey = endpoint;
            const cached = this.cache[cacheKey];
            
            // Return cached data if valid
            if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
                console.log(`📦 Using cached data for ${endpoint}`);
                return cached.data;
            }
            
            // Fetch new data
            console.log(`🔄 Fetching from API: ${endpoint}`);
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the data
            this.cache[cacheKey] = {
                data: data,
                timestamp: Date.now(),
                endpoint: endpoint
            };
            
            console.log(`✅ Successfully fetched ${endpoint}`);
            return data;
            
        } catch (error) {
            console.error(`❌ API Error (${endpoint}):`, error.message);
            
            // Try to return cached data even if expired
            const cached = this.cache[endpoint];
            if (cached && CONFIG.FALLBACK.ENABLED) {
                console.log(`⚠️ Using expired cache for ${endpoint}`);
                return cached.data;
            }
            
            throw error;
        }
    }

    // Get industry news
    async getNews() {
        return this.fetchData(CONFIG.ENDPOINTS.NEWS);
    }

    // Get market data
    async getMarketData() {
        return this.fetchData(CONFIG.ENDPOINTS.MARKET);
    }

    // Get companies data
    async getCompanies() {
        return this.fetchData(CONFIG.ENDPOINTS.COMPANIES);
    }

    // Get weather data
    async getWeather() {
        return this.fetchData(CONFIG.ENDPOINTS.WEATHER);
    }

    // Get projects data
    async getProjects() {
        return this.fetchData(CONFIG.ENDPOINTS.PROJECTS);
    }

    // Get health status
    async getHealth() {
        return this.fetchData(CONFIG.ENDPOINTS.HEALTH);
    }

    // Clear cache
    clearCache() {
        this.cache = {};
        console.log('🔄 API cache cleared');
        
        // Show notification
        if (typeof Components !== 'undefined') {
            Components.showToast('Cache Cleared', 'All cached data has been cleared.', 'info');
        }
    }

    // Check if cache is valid for endpoint
    isCacheValid(endpoint) {
        const cached = this.cache[endpoint];
        if (!cached) return false;
        
        const age = Date.now() - cached.timestamp;
        return age < this.cacheTimeout;
    }

    // Get cache statistics
    getCacheStats() {
        const keys = Object.keys(this.cache);
        return {
            total: keys.length,
            endpoints: keys,
            items: keys.map(key => ({
                endpoint: key,
                age: Date.now() - this.cache[key].timestamp,
                valid: this.isCacheValid(key)
            }))
        };
    }

    // Test all APIs
    async testAllAPIs() {
        const endpoints = Object.values(CONFIG.ENDPOINTS);
        const results = [];
        
        for (const endpoint of endpoints) {
            try {
                const startTime = Date.now();
                await this.fetchData(endpoint);
                const duration = Date.now() - startTime;
                
                results.push({
                    endpoint,
                    status: 'success',
                    duration: `${duration}ms`,
                    cached: this.isCacheValid(endpoint)
                });
            } catch (error) {
                results.push({
                    endpoint,
                    status: 'error',
                    error: error.message,
                    cached: this.isCacheValid(endpoint)
                });
            }
        }
        
        return results;
    }
}

// Global API handler instance
const apiHandler = new APIHandler();