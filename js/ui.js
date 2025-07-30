import { graphqlQuery } from './graphql.js';

const app = document.getElementById('app');

export function showLoginPage() {
    app.innerHTML = `
    <div class="min-h-screen flex">
        <div class="hidden lg:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
            <div>
                <h1 class="text-white font-bold text-4xl font-sans">GraphQL Profile</h1>
                <p class="text-white mt-1">Your journey starts here</p>
            </div>
        </div>
        <div class="flex w-full lg:w-1/2 justify-center items-center bg-gray-100">
            <div class="w-full px-8 md:px-32 lg:px-24">
                <form id="login-form" class="bg-white rounded-md shadow-2xl p-10">
                    <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p class="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
                    <div id="error-message" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 hidden" role="alert"></div>
                    <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input id="username" name="username" class="pl-2 w-full outline-none border-none" type="text" placeholder="Username or Email" required />
                    </div>
                    <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" required />
                    </div>
                    <button type="submit" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
                </form>
            </div>
        </div>
    </div>
    `;
}

export async function showProfilePage() {
    app.innerHTML = `
    <div class="h-screen flex flex-col bg-gray-100">
        <nav class="bg-white shadow-md">
            <div class="container mx-auto px-6 py-3 flex justify-between items-center">
                <h1 class="text-xl font-bold text-gray-800">GraphQL Profile</h1>
                <button id="logout-button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">Logout</button>
            </div>
        </nav>
        <div class="flex-grow container mx-auto p-6">
            <main class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <!-- Sidebar -->
                <div class="lg:col-span-1 h-full">
                    <div class="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
                        <div class="flex flex-col items-center">
                            <div class="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h2 id="user-login" class="text-2xl font-bold text-gray-800"></h2>
                        </div>
                        <hr class="my-6">
                        <div class="space-y-4 text-center flex-grow flex flex-col justify-center">
                            <div>
                                <p class="text-gray-600 text-sm">Total XP</p>
                                <p id="user-xp" class="text-2xl font-semibold text-gray-800"></p>
                            </div>
                            <div>
                                <p class="text-gray-600 text-sm">Audit Ratio</p>
                                <p id="user-audit-ratio" class="text-2xl font-semibold text-gray-800"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Main Content -->
                <div class="lg:col-span-3 h-full">
                    <div class="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6">Statistics</h2>
                        <div class="graph-container flex-grow mb-8 flex flex-col">
                            <h3 class="text-lg font-semibold text-gray-700 mb-2">XP Over Time</h3>
                            <div class="p-4 bg-gray-50 rounded-lg flex-grow">
                                <svg id="xp-graph" class="w-full h-full" viewBox="0 0 500 300"></svg>
                            </div>
                        </div>
                        <div class="graph-container flex flex-col">
                            <h3 class="text-lg font-semibold text-gray-700 mb-2">Audit Performance</h3>
                             <div class="p-4 bg-gray-50 rounded-lg">
                                <svg id="audit-ratio-graph" class="w-full h-auto" viewBox="0 0 500 100"></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    `;

    fetchData();
}

async function fetchData() {
    try {
        // 1. Fetch basic user info (Simple Query)
        const userQuery = `{
            user {
                id
                login
            }
        }`;
        const userData = await graphqlQuery(userQuery);
        const user = userData.data.user[0];
        document.getElementById('user-login').textContent = user.login;

        // 2. Fetch total XP (Nested Query with Aggregation)
        const xpQuery = `{
            transaction_aggregate(where: {type: {_eq: "xp"}, userId: {_eq: ${user.id}}}) {
                aggregate {
                    sum {
                        amount
                    }
                }
            }
        }`;
        const xpData = await graphqlQuery(xpQuery);
        const totalXp = xpData.data.transaction_aggregate.aggregate.sum.amount;
        document.getElementById('user-xp').textContent = `${(totalXp / 1000).toFixed(0)} kB`;


        // 3. Fetch audit ratio
        const auditQuery = `{
            up: transaction_aggregate(where: {type: {_eq: "up"}, userId: {_eq: ${user.id}}}) {
                aggregate { sum { amount } }
            }
            down: transaction_aggregate(where: {type: {_eq: "down"}, userId: {_eq: ${user.id}}}) {
                aggregate { sum { amount } }
            }
        }`;
        const auditData = await graphqlQuery(auditQuery);
        const totalUp = auditData.data.up.aggregate.sum.amount || 0;
        const totalDown = auditData.data.down.aggregate.sum.amount || 1; // Avoid division by zero
        const auditRatio = (totalUp / totalDown).toFixed(2);
        document.getElementById('user-audit-ratio').textContent = auditRatio;


        // 4. Fetch data for graphs
        const xpOverTimeQuery = `{
            transaction(where: {type: {_eq: "xp"}, userId: {_eq: ${user.id}}}, order_by: {createdAt: asc}) {
                amount
                createdAt
                path
            }
        }`;
        const xpOverTimeData = await graphqlQuery(xpOverTimeQuery);
        createXpGraph(xpOverTimeData.data.transaction);
        createAuditRatioGraph(totalUp, totalDown);

    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

function createXpGraph(data) {
    const svg = document.getElementById('xp-graph');
    if (!svg || data.length < 2) return;
    svg.innerHTML = ''; // Clear previous graph

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    let cumulativeXp = 0;
    const processedData = data.map(d => {
        cumulativeXp += d.amount;
        return {
            date: new Date(d.createdAt),
            xp: cumulativeXp,
        };
    });

    const firstDate = processedData[0].date.getTime();
    const lastDate = processedData[processedData.length - 1].date.getTime();
    const maxXp = cumulativeXp;

    const xScale = (date) => {
        if (lastDate === firstDate) return 0;
        return ((date.getTime() - firstDate) / (lastDate - firstDate)) * width;
    }
    const yScale = (xp) => height - (xp / maxXp) * height;

    // Draw X and Y axes
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('y1', height);
    xAxis.setAttribute('x2', width);
    xAxis.setAttribute('y2', height);
    xAxis.setAttribute('stroke', '#e5e7eb');
    g.appendChild(xAxis);

    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', 0);
    yAxis.setAttribute('y1', 0);
    yAxis.setAttribute('x2', 0);
    yAxis.setAttribute('y2', height);
    yAxis.setAttribute('stroke', '#e5e7eb');
    g.appendChild(yAxis);

    // Create smooth path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let pathData = `M ${xScale(processedData[0].date)},${yScale(processedData[0].xp)}`;
    for (let i = 0; i < processedData.length - 1; i++) {
        const p0 = i > 0 ? processedData[i - 1] : processedData[i];
        const p1 = processedData[i];
        const p2 = processedData[i + 1];
        const p3 = i < processedData.length - 2 ? processedData[i + 2] : p2;

        const cp1x = xScale(p1.date) + (xScale(p2.date) - xScale(p0.date)) / 6;
        const cp1y = yScale(p1.xp) + (yScale(p2.xp) - yScale(p0.xp)) / 6;
        const cp2x = xScale(p2.date) - (xScale(p3.date) - xScale(p1.date)) / 6;
        const cp2y = yScale(p2.xp) - (yScale(p3.xp) - yScale(p1.xp)) / 6;

        pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${xScale(p2.date)},${yScale(p2.xp)}`;
    }

    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#3b82f6');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    g.appendChild(path);

    // Add axis labels
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', width / 2);
    xLabel.setAttribute('y', height + margin.bottom - 5);
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('fill', '#6b7280');
    xLabel.textContent = 'Time';
    g.appendChild(xLabel);

    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('transform', 'rotate(-90)');
    yLabel.setAttribute('x', -height/2);
    yLabel.setAttribute('y', -margin.left + 15);
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.setAttribute('fill', '#6b7280');
    yLabel.textContent = 'XP';
    g.appendChild(yLabel);
}

function createAuditRatioGraph(up, down) {
    const svg = document.getElementById('audit-ratio-graph');
    if (!svg) return;
    svg.innerHTML = ''; // Clear previous graph

    const width = 500;
    const height = 100;
    const barHeight = 50;
    const total = up + down;
    if (total === 0) return;

    const upPercentage = (up / total);
    const downPercentage = (down / total);

    const upWidth = upPercentage * width;
    const downWidth = downPercentage * width;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(0, ${height/2 - barHeight/2})`);
    svg.appendChild(g);

    const upRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    upRect.setAttribute('x', '0');
    upRect.setAttribute('y', '0');
    upRect.setAttribute('width', upWidth);
    upRect.setAttribute('height', barHeight);
    upRect.setAttribute('fill', '#10b981');
    g.appendChild(upRect);

    const downRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    downRect.setAttribute('x', upWidth);
    downRect.setAttribute('y', '0');
    downRect.setAttribute('width', downWidth);
    downRect.setAttribute('height', barHeight);
    downRect.setAttribute('fill', '#ef4444');
    g.appendChild(downRect);

    const upText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    upText.setAttribute('x', upWidth / 2);
    upText.setAttribute('y', barHeight / 2 + 5); 
    upText.setAttribute('text-anchor', 'middle');
    upText.setAttribute('fill', 'white');
    upText.textContent = `Up: ${(up / 1000000).toFixed(2)} MB`;
    g.appendChild(upText);

    const downText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    downText.setAttribute('x', upWidth + downWidth / 2);
    downText.setAttribute('y', barHeight / 2 + 5);
    downText.setAttribute('text-anchor', 'middle');
    downText.setAttribute('fill', 'white');
    downText.textContent = `Down: ${(down / 1000000).toFixed(2)} MB`;
    g.appendChild(downText);
}