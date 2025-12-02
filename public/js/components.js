// // UI Components for Aberdeen Energy Hub
// class Components {
//     // Navigation component
//     static renderNavigation() {
//         return `
//             <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
//                 <div class="container">
//                     <a class="navbar-brand" href="#">
//                         <i class="fas fa-oil-well me-2"></i>Aberdeen Energy Hub
//                     </a>
//                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//                         <span class="navbar-toggler-icon"></span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarNav">
//                         <ul class="navbar-nav ms-auto">
//                             <li class="nav-item"><a class="nav-link" href="#overview">Overview</a></li>
//                             <li class="nav-item"><a class="nav-link" href="#companies">Companies</a></li>
//                             <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
//                             <li class="nav-item"><a class="nav-link" href="#market">Market Data</a></li>
//                             <li class="nav-item"><a class="nav-link" href="#news">Industry News</a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         `;
//     }

//     // Statistics cards component
//     static renderStats(stats) {
//         return stats.map(stat => `
//             <div class="col-md-3 col-6 mb-4">
//                 <div class="stat-card">
//                     <div class="stat-number">${stat.value}</div>
//                     <div class="stat-label">${stat.label}</div>
//                 </div>
//             </div>
//         `).join('');
//     }

//     // Overview content component
//     static renderOverview() {
//         return `
//             <div class="col-lg-6 mb-4">
//                 <div class="card h-100">
//                     <div class="card-body">
//                         <h4 class="card-title"><i class="fas fa-hard-hat text-primary me-2"></i>Development Focus</h4>
//                         <p class="card-text">Aberdeen continues to be a global hub for oil and gas development with ongoing projects in the North Sea focusing on both traditional energy and transition to renewables.</p>
//                         <ul>
//                             <li>Offshore platform development and maintenance</li>
//                             <li>Subsea engineering and technology</li>
//                             <li>Decommissioning projects</li>
//                             <li>Carbon capture and storage initiatives</li>
//                             <li>Wind energy project development</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-lg-6 mb-4">
//                 <div class="card h-100">
//                     <div class="card-body">
//                         <h4 class="card-title"><i class="fas fa-chart-line text-primary me-2"></i>Economic Impact</h4>
//                         <p class="card-text">The oil and gas sector remains crucial to the Scottish and UK economy with Aberdeen at its center.</p>
//                         <div class="mt-4">
//                             <h5>Key Statistics:</h5>
//                             <div class="row mt-3">
//                                 <div class="col-6">
//                                     <strong>£24.9bn</strong>
//                                     <div class="small text-muted">GVA to UK economy</div>
//                                 </div>
//                                 <div class="col-6">
//                                     <strong>71,000</strong>
//                                     <div class="small text-muted">Scottish jobs supported</div>
//                                 </div>
//                             </div>
//                             <div class="row mt-3">
//                                 <div class="col-6">
//                                     <strong>65%</strong>
//                                     <div class="small text-muted">UK oil production</div>
//                                 </div>
//                                 <div class="col-6">
//                                     <strong>34%</strong>
//                                     <div class="small text-muted">UK gas production</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     // Company card component
//     static renderCompanyCard(company) {
//         return `
//             <div class="col-lg-4 col-md-6">
//                 <div class="card company-card h-100">
//                     <div class="card-body">
//                         <h5 class="card-title">${company.name}</h5>
//                         <h6 class="card-subtitle mb-2 text-muted">${company.type}</h6>
//                         <p class="card-text"><strong>Focus:</strong> ${company.focus}</p>
//                         <p class="card-text"><strong>Employees:</strong> ${company.employees}</p>
//                         <p class="card-text"><strong>Location:</strong> ${company.location}</p>
//                         <p class="card-text"><strong>Projects:</strong> ${company.projects}</p>
//                         <div class="mt-2">
//                             ${company.tags ? company.tags.map(tag =>
//                                 `<span class="badge bg-light text-dark me-1">${tag}</span>`
//                             ).join('') : ''}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     // Projects timeline component
//     static renderProjects(projects) {
//         return `
//             <div class="col-lg-8 mx-auto">
//                 <div class="project-timeline">
//                     ${projects.map(project => `
//                         <div class="timeline-item">
//                             <h5>${project.name}</h5>
//                             <p class="text-muted">${project.company} | Status: <span class="text-${project.statusColor}">${project.status}</span></p>
//                             <p>${project.description}</p>
//                         </div>
//                     `).join('')}
//                 </div>
//             </div>
//         `;
//     }

//     // Market data component
//     static renderMarketData(commoditiesHTML, stocksHTML) {
//         return `
//             <div class="col-md-6">
//                 <div class="market-data">
//                     <h5><i class="fas fa-gas-pump me-2"></i>Commodity Prices</h5>
//                     ${commoditiesHTML}
//                 </div>
//             </div>
//             <div class="col-md-6">
//                 <div class="market-data">
//                     <h5><i class="fas fa-chart-bar me-2"></i>Energy Stocks</h5>
//                     ${stocksHTML}
//                 </div>
//             </div>
//         `;
//     }

//     // News card component
//     static renderNewsCard(article) {
//         return `
//             <div class="col-lg-6 mb-4">
//                 <div class="card news-card h-100">
//                     <div class="card-body">
//                         <span class="badge bg-primary mb-2">${article.category || 'Energy'}</span>
//                         <h5 class="card-title">${article.title}</h5>
//                         <p class="card-text">${article.description || 'No description available'}</p>
//                         <div class="d-flex justify-content-between align-items-center">
//                             <small class="text-muted">${new Date(article.publishedAt).toLocaleDateString()}</small>
//                             <a href="${article.url || '#'}" class="btn btn-sm btn-outline-primary" target="_blank">Read More</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     // Footer component
//     static renderFooter() {
//         return `
//             <footer class="footer">
//                 <div class="container">
//                     <div id="weather-display" class="text-center mb-3"></div>
//                     <div class="row">
//                         <div class="col-lg-4 mb-4">
//                             <h5>Aberdeen Oil & Gas Development Hub</h5>
//                             <p>Your comprehensive resource for energy sector development in Europe's Energy Capital.</p>
//                             <div class="mt-3">
//                                 <span class="api-status status-online" id="api-status">Data Status: Loading...</span>
//                             </div>
//                         </div>
//                         <div class="col-lg-2 col-6 mb-4">
//                             <h5>Resources</h5>
//                             <ul class="list-unstyled">
//                                 <li><a href="#" class="text-light">Industry Reports</a></li>
//                                 <li><a href="#" class="text-light">Market Analysis</a></li>
//                                 <li><a href="#" class="text-light">Regulatory Updates</a></li>
//                                 <li><a href="#" class="text-light">Investment Guides</a></li>
//                             </ul>
//                         </div>
//                         <div class="col-lg-2 col-6 mb-4">
//                             <h5>Links</h5>
//                             <ul class="list-unstyled">
//                                 <li><a href="#" class="text-light">OGUK</a></li>
//                                 <li><a href="#" class="text-light">OEUK</a></li>
//                                 <li><a href="#" class="text-light">SEPA</a></li>
//                                 <li><a href="#" class="text-light">Scottish Enterprise</a></li>
//                             </ul>
//                         </div>
//                         <div class="col-lg-4 mb-4">
//                             <h5>Contact</h5>
//                             <p><i class="fas fa-map-marker-alt me-2"></i> Aberdeen, Scotland</p>
//                             <p><i class="fas fa-envelope me-2"></i> info@aberdeenenergyhub.com</p>
//                             <div class="mt-3">
//                                 <a href="#" class="text-light me-3"><i class="fab fa-linkedin fa-lg"></i></a>
//                                 <a href="#" class="text-light me-3"><i class="fab fa-twitter fa-lg"></i></a>
//                                 <a href="#" class="text-light"><i class="fab fa-facebook fa-lg"></i></a>
//                             </div>
//                         </div>
//                     </div>
//                     <hr class="my-4">
//                     <div class="text-center">
//                         <p>&copy; 2025 Aberdeen Oil & Gas Development Hub. Educational project for CE2000 Assessment.</p>
//                     </div>
//                 </div>
//             </footer>
//         `;
//     }
// }

class Components {
  static renderCompanyCard(company) {
    return (
      <div class="col-lg-4 col-md-6 mb-4">
        {" "}
        <div class="card company-card h-100">
          {" "}
          <div class="card-body">
            {" "}
            <h5 class="card-title">${company.name}</h5>{" "}
            <h6 class="card-subtitle mb-2 text-muted">${company.type}</h6>{" "}
            <p class="card-text">
              <strong>Employees:</strong> ${company.employees}
            </p>{" "}
            $
            {company.location ? (
              <p class="card-text">
                <strong>Location:</strong> ${company.location}
              </p>
            ) : (
              ""
            )}{" "}
            $
            {company.projects ? (
              <p class="card-text">
                <strong>Projects:</strong> ${company.projects}
              </p>
            ) : (
              ""
            )}{" "}
            $
            {company.tags ? (
              <div class="mt-2">
                $
                {company.tags
                  .map((tag) => (
                    <span class="badge bg-light text-dark me-1">${tag}</span>
                  ))
                  .join("")}
              </div>
            ) : (
              ""
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }

  text;
  static renderNewsCard(article) {
    return `
        <div class="col-lg-6 mb-4">
            <div class="card news-card h-100">
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
    `;
  }

  static renderMarketData(stocks, commodities) {
    const stocksHTML = stocks
      .map((stock) => {
        const changeClass = stock.change >= 0 ? "positive" : "negative";
        return `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${stock.symbol}:</span>
                <div>
                    <span class="fw-bold">$${stock.price}</span>
                    <span class="${changeClass} ms-2">
                        ${stock.change >= 0 ? "+" : ""}${stock.change}%
                    </span>
                </div>
            </div>
        `;
      })
      .join("");

    const commoditiesHTML = commodities
      .map(
        (item) => `
        <div class="d-flex justify-content-between">
            <span>${item.name}:</span>
            <span class="fw-bold">$${item.price}</span>
        </div>
    `
      )
      .join("");

    return `
        <div class="col-md-6">
            <div class="market-data">
                <h5><i class="fas fa-gas-pump me-2"></i>Commodity Prices</h5>
                ${commoditiesHTML}
            </div>
        </div>
        <div class="col-md-6">
            <div class="market-data">
                <h5><i class="fas fa-chart-bar me-2"></i>Energy Stocks</h5>
                ${stocksHTML}
            </div>
        </div>
    `;
  }

  static showToast(title, message, type = "info") {
    const toastEl = document.getElementById("liveToast");
    const toastTitle = document.getElementById("toast-title");
    const toastMessage = document.getElementById("toast-message");

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Set color based on type
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}
