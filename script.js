
// Sample data - in a real application, this would come from an API
const mockData = [
    {
        sNo: 1,
        state: "Andhra Pradesh (Package 1)",
        pia: "Railtel",
        gpsInScope: { total: 13432, current: 13432, percentage: 100 },
        hoto: { current: 13120, percentage: 97.7 },
        survey: { current: 13200, percentage: 98.3 },
        commissioned: { current: 12800, percentage: 95.3 },
        ftthConnections: { current: 45678, target: 50000, percentage: 91.4 },
        financial: { amount: "₹850.5 Cr", percentage: 78.2 },
        snoc: { status: "Active monitoring with 24/7 support team deployed" }
    },
    {
        sNo: 2,
        state: "Assam (Package 2)",
        pia: "PowerGrid",
        gpsInScope: { total: 22156, current: 22156, percentage: 100 },
        hoto: { current: 20543, percentage: 92.7 },
        survey: { current: 21234, percentage: 95.8 },
        commissioned: { current: 19876, percentage: 89.7 },
        ftthConnections: { current: 67234, target: 75000, percentage: 89.6 },
        financial: { amount: "₹1,125.8 Cr", percentage: 85.4 },
        snoc: { status: "Operational with periodic maintenance scheduled" }
    },
    // ... more states would be added here
];

// Global state
let currentData = [];
let selectedState = 'India';
let selectedUnit = 'GPs';
let metrics = null;
let barChart = null;
let pieChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSelectors();
    loadData();
    setupEventListeners();
});

function initializeSelectors() {
    // Initialize state selector
    const stateSelector = document.getElementById('stateSelector');
    const states = ['India', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
    
    states.forEach(state => {
        const button = document.createElement('button');
        button.textContent = state;
        button.className = `px-3 py-1 text-xs font-medium rounded-md transition-all min-w-[40px] ${
            state === 'India' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
        }`;
        button.onclick = () => handleStateChange(state);
        stateSelector.appendChild(button);
    });

    // Initialize unit selector
    const unitSelector = document.getElementById('unitSelector');
    const units = ['GPs', 'Blocks', 'Kms'];
    
    units.forEach(unit => {
        const button = document.createElement('button');
        button.textContent = unit;
        button.className = `px-3 py-1 text-xs font-medium rounded-md transition-all ${
            unit === 'GPs' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
        }`;
        button.onclick = () => handleUnitChange(unit);
        unitSelector.appendChild(button);
    });
}

function setupEventListeners() {
    document.getElementById('exportBtn').onclick = exportData;
    document.getElementById('refreshBtn').onclick = refreshData;
}

function loadData() {
    // Simulate loading
    setTimeout(() => {
        currentData = mockData;
        updateDashboard();
        hideLoading();
    }, 1000);
}

function hideLoading() {
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
}

function handleStateChange(state) {
    selectedState = state;
    updateStateSelector();
    updateDashboard();
}

function handleUnitChange(unit) {
    selectedUnit = unit;
    updateUnitSelector();
    updateDashboard();
}

function updateStateSelector() {
    const buttons = document.querySelectorAll('#stateSelector button');
    buttons.forEach(button => {
        if (button.textContent === selectedState) {
            button.className = 'px-3 py-1 text-xs font-medium rounded-md transition-all min-w-[40px] bg-white text-gray-900 shadow-sm';
        } else {
            button.className = 'px-3 py-1 text-xs font-medium rounded-md transition-all min-w-[40px] text-gray-600 hover:text-gray-900';
        }
    });
}

function updateUnitSelector() {
    const buttons = document.querySelectorAll('#unitSelector button');
    buttons.forEach(button => {
        if (button.textContent === selectedUnit) {
            button.className = 'px-3 py-1 text-xs font-medium rounded-md transition-all bg-white text-gray-900 shadow-sm';
        } else {
            button.className = 'px-3 py-1 text-xs font-medium rounded-md transition-all text-gray-600 hover:text-gray-900';
        }
    });
}

function updateDashboard() {
    const filteredData = getFilteredData();
    metrics = calculateMetrics(filteredData);
    
    updateMetricCards();
    updateCharts(filteredData);
    updateTable(filteredData);
    updateTableHeaders();
}

function getFilteredData() {
    if (selectedState === 'India') {
        return currentData;
    } else {
        const packageNumber = parseInt(selectedState);
        return currentData.filter(item => item.state.includes(`Package ${packageNumber}`));
    }
}

function calculateMetrics(data) {
    if (data.length === 0) {
        return {
            totalGPs: 0,
            hotoCompleted: 0,
            surveyCompleted: 0,
            ftthConnections: 0,
            commissioning: 0
        };
    }

    const totals = data.reduce((acc, item) => {
        acc.totalGPs += item.gpsInScope.total;
        acc.hotoCompleted += item.hoto.current;
        acc.surveyCompleted += item.survey.current;
        acc.ftthConnections += item.ftthConnections.current;
        acc.commissioning += item.commissioned.current;
        return acc;
    }, {
        totalGPs: 0,
        hotoCompleted: 0,
        surveyCompleted: 0,
        ftthConnections: 0,
        commissioning: 0
    });

    return totals;
}

function updateMetricCards() {
    const metricCardsContainer = document.getElementById('metricCards');
    metricCardsContainer.innerHTML = '';

    const metricsConfig = [
        {
            title: `Total ${selectedUnit}`,
            value: metrics.totalGPs,
            change: 5.2,
            color: 'blue'
        },
        {
            title: 'HOTO Completed',
            value: metrics.hotoCompleted,
            change: 3.8,
            color: 'green'
        },
        {
            title: 'Survey Completed',
            value: metrics.surveyCompleted,
            change: 7.1,
            color: 'orange'
        },
        {
            title: 'FTTH Connections',
            value: metrics.ftthConnections,
            change: 12.5,
            color: 'purple'
        }
    ];

    metricsConfig.forEach(metric => {
        const card = createMetricCard(metric);
        metricCardsContainer.appendChild(card);
    });
}

function createMetricCard(metric) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in metric-card';
    
    const colorClasses = {
        blue: 'gradient-blue',
        green: 'gradient-green',
        orange: 'gradient-orange',
        purple: 'gradient-purple',
        red: 'gradient-red'
    };

    card.innerHTML = `
        <div class="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
            <h3 class="text-sm font-medium text-gray-600">${metric.title}</h3>
            <div class="p-2 rounded-lg ${colorClasses[metric.color]}">
                <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
            </div>
        </div>
        <div class="p-6 pt-0">
            <div class="text-2xl font-bold">
                ${formatNumber(metric.value)}
            </div>
            <p class="text-xs ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1">
                <span class="mr-1">${metric.change >= 0 ? '↗' : '↘'}</span>
                ${Math.abs(metric.change)}% from last week
            </p>
        </div>
    `;
    
    return card;
}

function formatNumber(num) {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
    if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function updateCharts(data) {
    updateBarChart(data);
    updatePieChart(data);
}

function updateBarChart(data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    if (barChart) {
        barChart.destroy();
    }

    const chartData = data.slice(0, 6).map(state => ({
        name: state.state.split(' ')[0],
        hoto: state.hoto.percentage,
        survey: state.survey.percentage
    }));

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(d => d.name),
            datasets: [
                {
                    label: 'HOTO %',
                    data: chartData.map(d => d.hoto),
                    backgroundColor: 'rgba(136, 132, 216, 0.8)',
                    borderColor: 'rgba(136, 132, 216, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Survey %',
                    data: chartData.map(d => d.survey),
                    backgroundColor: 'rgba(130, 202, 157, 0.8)',
                    borderColor: 'rgba(130, 202, 157, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updatePieChart(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    if (pieChart) {
        pieChart.destroy();
    }

    const pieData = data.slice(0, 5).map((state, index) => ({
        name: state.state.split(' ')[0],
        value: state.gpsInScope.total,
        color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'][index]
    }));

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: pieData.map(d => d.name),
            datasets: [{
                data: pieData.map(d => d.value),
                backgroundColor: pieData.map(d => d.color),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(state => {
        const row = document.createElement('tr');
        row.className = 'border-b transition-colors hover:bg-gray-50';
        
        row.innerHTML = `
            <td class="p-4 font-medium">${state.state}</td>
            <td class="p-4">${state.pia}</td>
            <td class="p-4">${state.gpsInScope.total.toLocaleString()}</td>
            <td class="p-4">
                <span class="badge ${getStatusColor(state.hoto.percentage)}">
                    ${state.hoto.percentage}%
                </span>
            </td>
            <td class="p-4">
                <span class="badge ${getStatusColor(state.survey.percentage)}">
                    ${state.survey.percentage}%
                </span>
            </td>
            <td class="p-4">${state.ftthConnections.current.toLocaleString()}</td>
            <td class="p-4">${state.financial.amount}</td>
            <td class="p-4 max-w-xs">
                <div class="truncate text-xs text-gray-600">
                    ${state.snoc.status}
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function getStatusColor(percentage) {
    if (percentage >= 100) return 'badge-green';
    if (percentage >= 80) return 'badge-yellow';
    return 'badge-red';
}

function updateTableHeaders() {
    document.getElementById('tableUnit').textContent = selectedUnit;
    document.getElementById('tableHeaderUnit').textContent = selectedUnit;
}

function exportData() {
    const csvContent = convertToCSV(currentData);
    downloadCSV(csvContent, 'bharatnet-dashboard-data.csv');
}

function convertToCSV(data) {
    const headers = ['State', 'PIA', 'Total GPs', 'HOTO %', 'Survey %', 'FTTH Connections', 'Financial', 'Status'];
    const rows = data.map(item => [
        item.state,
        item.pia,
        item.gpsInScope.total,
        item.hoto.percentage,
        item.survey.percentage,
        item.ftthConnections.current,
        item.financial.amount,
        item.snoc.status
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function refreshData() {
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('mainContent').classList.add('hidden');
    loadData();
}
