// ===== BOOT SEQUENCE DATA =====
const bootSequence = [
    { text: '[    0.000000] Initializing Victor Admin System...', delay: 100, status: null },
    { text: '[    0.124531] Loading kernel modules...', delay: 150, status: null },
    { text: '[    0.245832] CPU: 8x Intel Xeon @ 3.6GHz', delay: 100, status: 'OK' },
    { text: '[    0.389234] Memory: 64GB DDR4 ECC', delay: 100, status: 'OK' },
    { text: '[    0.445123] Storage: 2TB NVMe SSD RAID', delay: 100, status: 'OK' },
    { text: '[    0.567234] Detecting network interfaces...', delay: 200, status: null },
    { text: '[    0.734521] eth0: Link detected', delay: 150, status: 'OK' },
    { text: '[    0.892341] eth1: Link detected', delay: 150, status: 'OK' },
    { text: '[    1.023456] Configuring networking stack...', delay: 200, status: null },
    { text: '[    1.234567] IPv4 routing table initialized', delay: 100, status: 'OK' },
    { text: '[    1.345678] IPv6 routing table initialized', delay: 100, status: 'OK' },
    { text: '[    1.523491] Starting firewall service...', delay: 300, status: null },
    { text: '[    1.782341] iptables: Loaded 147 rules', delay: 150, status: 'OK' },
    { text: '[    1.892451] Firewall: ACTIVE', delay: 100, status: 'OK' },
    { text: '[    2.012345] Starting SSH daemon...', delay: 250, status: null },
    { text: '[    2.234156] sshd: Listening on port 22', delay: 150, status: 'OK' },
    { text: '[    2.445267] Starting Docker service...', delay: 300, status: null },
    { text: '[    2.734189] Docker: daemon started', delay: 150, status: 'OK' },
    { text: '[    2.891234] Starting Kubernetes components...', delay: 350, status: null },
    { text: '[    3.234567] kubelet: RUNNING', delay: 150, status: 'OK' },
    { text: '[    3.445678] kube-proxy: RUNNING', delay: 150, status: 'OK' },
    { text: '[    3.567891] Starting Istio service mesh...', delay: 300, status: null },
    { text: '[    3.892345] istiod: ACTIVE', delay: 150, status: 'OK' },
    { text: '[    4.023456] ztunnel: ACTIVE', delay: 150, status: 'OK' },
    { text: '[    4.234567] Starting monitoring services...', delay: 250, status: null },
    { text: '[    4.445678] Prometheus: RUNNING', delay: 150, status: 'OK' },
    { text: '[    4.567891] Grafana: RUNNING', delay: 150, status: 'OK' },
    { text: '[    4.789234] Running security checks...', delay: 400, status: null },
    { text: '[    5.123456] mTLS certificates: VALID', delay: 150, status: 'OK' },
    { text: '[    5.234567] Network policies: ENFORCED', delay: 150, status: 'OK' },
    { text: '[    5.456789] RBAC permissions: CONFIGURED', delay: 150, status: 'OK' },
    { text: '[    5.678912] Port scanning: PROTECTED', delay: 150, status: 'OK' },
    { text: '[    5.891234] Verifying system integrity...', delay: 300, status: null },
    { text: '[    6.123456] All services operational', delay: 200, status: 'OK' },
    { text: '[    6.345678] Infrastructure: READY', delay: 200, status: 'OK' },
    { text: '', delay: 500, status: null },
    { text: '══════════════════════════════════════════════════', delay: 100, status: null },
    { text: '   ✓ SYSTEM INITIALIZATION COMPLETE', delay: 200, status: 'INFO' },
    { text: '══════════════════════════════════════════════════', delay: 100, status: null }
];

// ===== DOM ELEMENTS =====
const logsContainer = document.getElementById('boot-logs');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const finalMessage = document.getElementById('final-message');

// ===== VARIABLES =====
let currentLine = 0;

// ===== FUNCTIONS =====

/**
 * Add a boot line to the display
 */
function addBootLine(text, status) {
    const line = document.createElement('div');
    line.className = 'boot-line';
    
    let lineContent = text;
    if (status) {
        const statusClass = status.toLowerCase();
        lineContent += `<span class="status ${statusClass}">[ ${status} ]</span>`;
    }
    
    line.innerHTML = lineContent;
    logsContainer.appendChild(line);
    
    // Trigger animation
    setTimeout(() => {
        line.classList.add('show');
    }, 50);

    // Auto scroll to bottom
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

/**
 * Update progress bar
 */
function updateProgress() {
    const percent = Math.floor((currentLine / bootSequence.length) * 100);
    progressFill.style.width = percent + '%';
    progressText.textContent = `Initializing System: ${percent}%`;
}

/**
 * Run the boot sequence
 */
function runBootSequence() {
    // Show progress bar after header
    setTimeout(() => {
        progressContainer.classList.add('show');
    }, 1500);

    /**
     * Process next line in sequence
     */
    function processNextLine() {
        if (currentLine < bootSequence.length) {
            const item = bootSequence[currentLine];
            addBootLine(item.text, item.status);
            updateProgress();
            currentLine++;
            
            setTimeout(processNextLine, item.delay);
        } else {
            // Boot complete
            completeBootSequence();
        }
    }

    // Start the sequence after 2 seconds
    setTimeout(processNextLine, 2000);
}

/**
 * Complete boot sequence and show enter button
 */
function completeBootSequence() {
    setTimeout(() => {
        progressText.textContent = 'System Ready: 100%';
        progressFill.style.width = '100%';
        
        setTimeout(() => {
            finalMessage.classList.add('show');
            
            // Activer le bouton Enter
            const enterButton = document.getElementById('enter-button');
            enterButton.addEventListener('click', redirectToPortfolio);
            
            // Permettre aussi d'appuyer sur Enter au clavier
            document.addEventListener('keydown', handleEnterKey);
            
            // Retirer le listener de skip pendant l'animation
            document.removeEventListener('keypress', skipAnimation);
        }, 500);
    }, 500);
}

/**
 * Handle Enter key press
 */
function handleEnterKey(e) {
    if (e.key === 'Enter') {
        redirectToPortfolio();
    }
}

/**
 * Redirect to portfolio
 */
function redirectToPortfolio() {
    window.location.href = 'index.html';
}

/**
 * Skip animation on key press (only during boot)
 */
function skipAnimation(e) {
    // Skip uniquement si le boot n'est pas terminé
    if (currentLine < bootSequence.length) {
        window.location.href = 'index.html';
    }
}

// ===== EVENT LISTENERS =====

// Start boot sequence when page loads
window.addEventListener('load', runBootSequence);

// Easter egg: skip animation on any key press (sera retiré à la fin)
document.addEventListener('keypress', skipAnimation);

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 SYSTEM BOOT INITIALIZED', 'color: #00ff00; font-size: 16px; font-weight: bold;');
console.log('%c⚡ Press any key to skip animation', 'color: #00ff00; font-size: 12px;');
console.log('%c⏎ Press ENTER when ready to continue', 'color: #00ff00; font-size: 12px;');