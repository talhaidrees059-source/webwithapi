// Main Application Controller
class AberdeenEnergyHub {
  constructor() {
    this.baseUrl = CONFIG.API_BASE_URL;
    this.dataCache = {};
    this.init();
  }

  init() {
    console.log("🚀 Initializing Aberdeen Energy Hub...");
    this.setupEventHandlers();
    this.updateAPIStatus("Ready to load data", "info");

    // Load all data on page load
    this.loadAllData();
  }

  // Setup all event handlers
  setupEventHandlers() {
    // Refresh all button
    $("#refresh-all").click(() => this.loadAllData());

    // Individual section refresh buttons
    $("#load-companies").click(() => this.loadCompanies());
    $("#load-market").click(() => this.loadMarketData());
    $("#load-news").click(() => this.loadNews());
    $("#load-weather").click(() => this.loadWeather());
    $("#load-projects").click(() => this.loadProjects());

    // Navbar API navigation
    $(".api-nav-item").click((e) => {
      e.preventDefault();
      const endpoint = $(e.target).data("endpoint");
      this.loadAPIEndpoint(endpoint);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').click(function (e) {
      e.preventDefault();
      const target = $($(this).attr("href"));
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800
        );
      }
    });
  }

  // Load all API data
  async loadAllData() {
    this.updateAPIStatus("Loading all data...", "warning");

    try {
      await Promise.all([
        this.loadCompanies(),
        this.loadMarketData(),
        this.loadNews(),
        this.loadWeather(),
        this.loadProjects(),
      ]);

      this.updateAPIStatus("All data loaded successfully", "success");
      this.showNotification("Success", "All data has been loaded!", "success");
    } catch (error) {
      console.error("Error loading all data:", error);
      this.updateAPIStatus("Some data failed to load", "error");
      this.showNotification(
        "Error",
        "Some data failed to load. Please try again.",
        "error"
      );
    }
  }

  // Generic API fetch function
  async fetchAPI(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Cache the data
      this.dataCache[endpoint] = {
        data: data,
        timestamp: Date.now(),
      };

      return data;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);

      // Try to return cached data
      if (this.dataCache[endpoint]) {
        console.log("Using cached data for", endpoint);
        return this.dataCache[endpoint].data;
      }

      throw error;
    }
  }

  // Load companies data
  async loadCompanies() {
    try {
      this.showLoading("#companies-data", "Loading companies...");

      const data = await this.fetchAPI(CONFIG.ENDPOINTS.COMPANIES);

      if (data.success && data.data) {
        this.renderCompanies(data.data);
      }
    } catch (error) {
      this.showError("#companies-data", "Failed to load companies data");
    }
  }

  // Load market data
  async loadMarketData() {
    try {
      this.showLoading("#market-data", "Loading market data...");

      const data = await this.fetchAPI(CONFIG.ENDPOINTS.MARKET);

      if (data.success && data.data) {
        this.renderMarketData(data.data);
      }
    } catch (error) {
      this.showError("#market-data", "Failed to load market data");
    }
  }

  // Load news
  async loadNews() {
    try {
      this.showLoading("#news-data", "Loading news...");

      const data = await this.fetchAPI(CONFIG.ENDPOINTS.NEWS);

      if (data.success && data.data) {
        this.renderNews(data.data);
      }
    } catch (error) {
      this.showError("#news-data", "Failed to load news");
    }
  }

  // Load weather
  async loadWeather() {
    try {
      this.showLoading("#weather-data", "Loading weather...");

      const data = await this.fetchAPI(CONFIG.ENDPOINTS.WEATHER);

      if (data.success && data.data) {
        this.renderWeather(data.data);
      }
    } catch (error) {
      this.showError("#weather-data", "Failed to load weather data");
    }
  }

  // Load projects
  async loadProjects() {
    try {
      this.showLoading("#projects-data", "Loading projects...");

      const data = await this.fetchAPI(CONFIG.ENDPOINTS.PROJECTS);

      if (data.success && data.data) {
        this.renderProjects(data.data);
      }
    } catch (error) {
      this.showError("#projects-data", "Failed to load projects");
    }
  }

  // Render companies data
  renderCompanies(companies) {
    const html = companies
      .map(
        (company) => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${company.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${
                          company.type
                        }</h6>
                        <p class="card-text">
                            <strong>Focus:</strong> ${
                              company.focus || "Energy"
                            }<br>
                            <strong>Employees:</strong> ${company.employees}<br>
                            ${
                              company.location
                                ? `<strong>Location:</strong> ${company.location}<br>`
                                : ""
                            }
                            ${
                              company.projects
                                ? `<strong>Projects:</strong> ${company.projects}`
                                : ""
                            }
                        </p>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    $("#companies-data").html(html);
  }

  // Render market data
  renderMarketData(marketData) {
    const { stocks = [], commodities = [] } = marketData;

    const stocksHTML = stocks
      .map((stock) => {
        const changeClass = stock.change >= 0 ? "text-success" : "text-danger";
        const changeIcon = stock.change >= 0 ? "fa-arrow-up" : "fa-arrow-down";
        return `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>${stock.symbol}:</span>
                    <div>
                        <span class="fw-bold">$${stock.price}</span>
                        <span class="${changeClass} ms-2">
                            <i class="fas ${changeIcon}"></i> ${Math.abs(
          stock.change
        ).toFixed(2)}%
                        </span>
                    </div>
                </div>
            `;
      })
      .join("");

    const commoditiesHTML = commodities
      .map(
        (item) => `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name}:</span>
                <span class="fw-bold">$${item.price}</span>
            </div>
        `
      )
      .join("");

    $("#market-data").html(`
            <div class="row">
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-header">
                            <h5><i class="fas fa-chart-line me-2"></i>Energy Stocks</h5>
                        </div>
                        <div class="card-body">
                            ${stocksHTML}
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-header">
                            <h5><i class="fas fa-gas-pump me-2"></i>Commodities</h5>
                        </div>
                        <div class="card-body">
                            ${commoditiesHTML}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-3">
                <p class="text-muted text-center">
                    <small>Last updated: ${new Date().toLocaleTimeString()}</small>
                </p>
            </div>
        `);
  }

  // Render news
  renderNews(news) {
    const html = news
      .map(
        (article) => `
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${
                          article.category || "Energy"
                        }</span>
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${
                              article.date || new Date().toLocaleDateString()
                            }</small>
                            
                        </div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    $("#news-data").html(html);
  }

  // Render weather
  renderWeather(weatherData) {
    const weather = weatherData.current || weatherData;

    $("#weather-data").html(`
            <div class="col-md-8 mx-auto">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="display-4 fw-bold">${
                          weather.temperature
                        }°C</div>
                        <p class="lead">Aberdeen, Scotland</p>
                        <div class="row mt-4">
                            <div class="col-6">
                                <i class="fas fa-wind fa-2x text-primary mb-2"></i>
                                <p class="mb-0"><strong>Wind Speed</strong></p>
                                <p>${weather.windspeed} km/h</p>
                            </div>
                            <div class="col-6">
                                <i class="fas fa-compass fa-2x text-primary mb-2"></i>
                                <p class="mb-0"><strong>Wind Direction</strong></p>
                                <p>${weather.winddirection || "--"}°</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
  }

  // Render projects
  renderProjects(projects) {
    const html = projects
      .map(
        (project) => `
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${
                          project.company
                        }</h6>
                        <span class="badge bg-${
                          project.statusColor || "primary"
                        }">${project.status}</span>
                        <p class="card-text mt-2">${project.description}</p>
                        <div class="mt-3">
                            <small class="text-muted">
                                <i class="fas fa-calendar me-1"></i>
                                Start: ${project.startDate || "--"}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    $("#projects-data").html(`
            <div class="row">
                ${html}
            </div>
        `);
  }

  // Utility functions
  showLoading(selector, message) {
    $(selector).html(`
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">${message}</p>
            </div>
        `);
  }

  showError(selector, message) {
    $(selector).html(`
            <div class="col-12 text-center text-danger">
                <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <p>${message}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="location.reload()">
                    <i class="fas fa-redo me-1"></i> Retry
                </button>
            </div>
        `);
  }

  updateAPIStatus(message, type = "info") {
    const statusElement = $("#api-status");
    const textElement = $("#api-status-text");

    textElement.text(message);
    statusElement.removeClass("status-online status-offline status-warning");

    switch (type) {
      case "success":
        statusElement.addClass("status-online");
        statusElement
          .find("i")
          .removeClass("fa-sync-alt fa-spin")
          .addClass("fa-check-circle");
        break;
      case "error":
        statusElement.addClass("status-offline");
        statusElement
          .find("i")
          .removeClass("fa-sync-alt fa-spin")
          .addClass("fa-exclamation-triangle");
        break;
      case "warning":
        statusElement.addClass("status-online");
        statusElement
          .find("i")
          .removeClass("fa-check-circle")
          .addClass("fa-sync-alt fa-spin");
        break;
      default:
        statusElement.addClass("status-online");
    }
  }

  showNotification(title, message, type = "info") {
    // Create toast notification
    const toastId = "toast-" + Date.now();
    const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <strong>${title}:</strong> ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

    $(".toast-container").append(toastHTML);
    const toast = new bootstrap.Toast(document.getElementById(toastId));
    toast.show();

    // Remove toast after it hides
    $(`#${toastId}`).on("hidden.bs.toast", function () {
      $(this).remove();
    });
  }
}

// Initialize application when DOM is ready
$(document).ready(() => {
  window.app = new AberdeenEnergyHub();
  console.log("🌍 Aberdeen Energy Hub initialized");
});
