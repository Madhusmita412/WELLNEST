// Batch Language System Integration
// This script can be used to automatically add language system to all pages

const fs = require('fs');
const path = require('path');

// List of HTML files that need language system integration
const htmlFiles = [
    'depression.html',
    'sleep-disorder.html', 
    'face-analysis.html',
    'ocd.html',
    'panic.html',
    'condition-az.html',
    'sleeptracker.html',
    'question.html',
    'gaslighting.html',
    'emotion.html',
    'ptsd.html',
    'bipolar.html',
    'signup.html'
];

function addLanguageSystemToFiles() {
    htmlFiles.forEach(filename => {
        const filePath = path.join(__dirname, filename);
        
        try {
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Check if language system is already added
                if (content.includes('universal-language-system.js')) {
                    console.log(`${filename} already has language system`);
                    return;
                }
                
                // Add language system script before closing body tag
                content = content.replace(
                    '</body>',
                    '    <script src="universal-language-system.js"></script>\n</body>'
                );
                
                fs.writeFileSync(filePath, content);
                console.log(`✓ Added language system to ${filename}`);
            } else {
                console.log(`❌ File not found: ${filename}`);
            }
        } catch (error) {
            console.error(`Error processing ${filename}:`, error.message);
        }
    });
}

// Run the integration
addLanguageSystemToFiles();
console.log('🌐 Language system integration completed!');

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addLanguageSystemToFiles };
}