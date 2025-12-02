const express = require('express');
const router = express.Router();
const axios = require('axios');

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Aberdeen Energy Hub API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Companies endpoint
router.get('/companies', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/?results=6');
        
        const companies = response.data.results.map((user, index) => ({
            id: index + 1,
            name: `${user.name.first} ${user.name.last} Energy`,
            type: ['Major Operator', 'Operator', 'Service Provider', 'Contractor', 'Technology Provider', 'Engineering'][index % 6],
            focus: ['Exploration & Production', 'Integrated Energy', 'Drilling Services', 'Subsea Engineering', 'Renewable Energy', 'Decommissioning'][index % 6],
            employees: `${(500 + index * 250)}+`,
            location: 'Aberdeen, UK',
            projects: ['Clair Ridge', 'ETAP', 'Andrew', 'Penguins', 'Pierce', 'Jackdaw'][index % 6],
            established: 1970 + (index * 5)
        }));
        
        res.json({
            success: true,
            count: companies.length,
            data: companies,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Companies API Error:', error.message);
        
        // Fallback data
        const fallbackCompanies = [
            {
                id: 1,
                name: "BP North Sea",
                type: "Major Operator",
                focus: "Exploration & Production",
                employees: "1,800+",
                location: "Aberdeen, UK",
                projects: "Clair Ridge, ETAP, Andrew, Schiehallion",
                established: 1970
            },
            {
                id: 2,
                name: "Shell UK Limited",
                type: "Major Operator",
                focus: "Integrated Energy",
                employees: "1,200+",
                location: "Aberdeen City",
                projects: "Penguins, Pierce, Jackdaw, Fram",
                established: 1972
            }
        ];
        
        res.json({
            success: true,
            count: fallbackCompanies.length,
            data: fallbackCompanies,
            timestamp: new Date().toISOString(),
            fallback: true
        });
    }
});

// Market data endpoint
router.get('/market', async (req, res) => {
    try {
        // Generate market data
        const stocks = [
            { symbol: 'BP', name: 'BP plc', price: (5.2 + Math.random()).toFixed(2), change: (Math.random() * 4 - 2).toFixed(2), currency: 'GBP' },
            { symbol: 'SHEL', name: 'Shell plc', price: (28.5 + Math.random() * 2).toFixed(2), change: (Math.random() * 3 - 1.5).toFixed(2), currency: 'GBP' },
            { symbol: 'EQNR', name: 'Equinor ASA', price: (32.7 + Math.random() * 1.5).toFixed(2), change: (Math.random() * 2 - 1).toFixed(2), currency: 'USD' }
        ];
        
        const commodities = [
            { name: 'Crude Oil (Brent)', price: (78.5 + Math.random() * 10).toFixed(2), unit: 'USD/bbl', change: (Math.random() * 2 - 1).toFixed(2) },
            { name: 'Natural Gas', price: (2.65 + Math.random()).toFixed(2), unit: 'USD/MMBtu', change: (Math.random() * 0.5 - 0.25).toFixed(2) },
            { name: 'UK Gas Price', price: (65.8 + Math.random() * 5).toFixed(2), unit: 'p/therm', change: (Math.random() * 1 - 0.5).toFixed(2) }
        ];
        
        res.json({
            success: true,
            data: {
                stocks: stocks,
                commodities: commodities,
                indices: [
                    { name: 'FTSE 100', value: (7520 + Math.random() * 100).toFixed(0), change: (Math.random() * 2 - 1).toFixed(2) },
                    { name: 'FTSE Energy', value: (4850 + Math.random() * 50).toFixed(0), change: (Math.random() * 3 - 1.5).toFixed(2) }
                ],
                lastUpdated: new Date().toISOString()
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Market API Error:', error.message);
        
        res.json({
            success: true,
            data: {
                stocks: [
                    { symbol: 'BP', price: '5.45', change: 0.25, currency: 'GBP' },
                    { symbol: 'SHEL', price: '28.75', change: -0.15, currency: 'GBP' }
                ],
                commodities: [
                    { name: 'Crude Oil', price: '78.50', unit: 'USD/bbl' },
                    { name: 'Natural Gas', price: '2.65', unit: 'USD/MMBtu' }
                ]
            },
            fallback: true
        });
    }
});

// News endpoint
router.get('/news', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=4');
        
        const news = response.data.map((post, index) => ({
            id: post.id,
            title: `Energy Sector Update: ${post.title}`,
            description: post.body.substring(0, 120) + '...',
            category: ['Technology', 'Market', 'Development', 'Innovation'][index % 4],
            date: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
            source: 'Industry Reports'
        }));
        
        res.json({
            success: true,
            count: news.length,
            data: news,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('News API Error:', error.message);
        
        const fallbackNews = [
            {
                id: 1,
                title: "North Sea Energy Sector Shows Strong Growth",
                description: "Recent reports indicate positive trends in the North Sea energy industry.",
                category: "Industry",
                date: new Date().toISOString().split('T')[0],
                source: "Local Reports"
            }
        ];
        
        res.json({
            success: true,
            count: fallbackNews.length,
            data: fallbackNews,
            fallback: true
        });
    }
});

// Weather endpoint
router.get('/weather', async (req, res) => {
    try {
        // Generate weather data
        const weatherData = {
            current: {
                temperature: (8 + Math.random() * 8).toFixed(1),
                windspeed: (10 + Math.random() * 15).toFixed(1),
                winddirection: Math.floor(Math.random() * 360),
                weathercode: 3,
                description: 'Partly cloudy',
                time: new Date().toLocaleTimeString('en-GB')
            },
            location: {
                name: "Aberdeen, Scotland",
                latitude: 57.1497,
                longitude: -2.0943
            },
            units: {
                temperature: '°C',
                windspeed: 'km/h'
            }
        };
        
        res.json({
            success: true,
            data: weatherData,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Weather API Error:', error.message);
        
        res.json({
            success: true,
            data: {
                current: {
                    temperature: '9.5',
                    windspeed: '15.2',
                    description: 'Cloudy'
                }
            },
            fallback: true
        });
    }
});

// Projects endpoint
router.get('/projects', async (req, res) => {
    try {
        const projects = [
            {
                id: 1,
                name: "Rosebank Field Development",
                company: "Equinor",
                status: "Approved",
                statusColor: "success",
                type: "Oil & Gas",
                description: "Major oil field development in the North Sea with significant reserves.",
                location: "North Sea, West of Shetland",
                startDate: "2024-01-15",
                estimatedCompletion: "2027-12-31",
                investment: "£4.1 billion",
                jobs: 1600
            },
            {
                id: 2,
                name: "Viking CCS Project",
                company: "Harbour Energy",
                status: "Development",
                statusColor: "primary",
                type: "CCS",
                description: "Carbon capture and storage initiative to reduce emissions.",
                location: "Southern North Sea",
                startDate: "2023-06-01",
                estimatedCompletion: "2026-03-31",
                investment: "£1.8 billion",
                jobs: 850
            }
        ];
        
        res.json({
            success: true,
            count: projects.length,
            data: projects,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Projects API Error:', error.message);
        
        res.json({
            success: true,
            data: [
                {
                    id: 1,
                    name: "Test Project",
                    company: "Test Company",
                    status: "Planning",
                    description: "Test project description."
                }
            ],
            fallback: true
        });
    }
});

module.exports = router;