const FigmaMCPIntegration = require('../scripts/figma-integration.js');

// Example: Using Figma MCP Integration
async function figmaExample() {
  console.log('🎨 Figma MCP Integration Example');
  
  const figma = new FigmaMCPIntegration();
  
  try {
    // Start the server
    const server = figma.startServer();
    
    console.log('📡 Figma MCP Server started successfully');
    console.log('🔗 Ready to connect to Figma designs');
    
    // Example: You can now use the server to:
    // 1. Connect to specific Figma files
    // 2. Extract design tokens
    // 3. Generate components
    // 4. Sync design changes
    
    // Keep the server running for a few seconds
    setTimeout(() => {
      console.log('🔄 Shutting down server...');
      server.kill();
    }, 5000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  figmaExample();
}

module.exports = figmaExample; 