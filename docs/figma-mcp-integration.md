# Figma MCP Integration

This document describes how to integrate Figma with the Model Context Protocol (MCP) for the RenewalPal project.

## Overview

The Figma MCP integration allows developers to interact with Figma files programmatically through the MCP server.

## Configuration

### MCP Server Configuration

Add the following configuration to your MCP server setup:

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "npx",
      "args": [
        "-y", 
        "figma-developer-mcp", 
        "YOUR_FIGMA_TOKEN_HERE",
        "--stdio"
      ]
    }
  }
}
```

### Environment Setup

1. Install the Figma MCP package:
   ```bash
   npm install -g figma-developer-mcp
   ```

2. Get your Figma Personal Access Token:
   - Go to Figma → Settings → Account → Personal Access Tokens
   - Generate a new token
   - Replace `YOUR_FIGMA_TOKEN_HERE` in the configuration

## Usage

### Starting the MCP Server

```bash
npx figma-developer-mcp YOUR_FIGMA_TOKEN_HERE --stdio
```

### Available Commands

The Figma MCP server provides various commands for interacting with Figma files:

- File operations
- Component extraction
- Design token management
- Asset export

## Security Considerations

The Figma access token is currently hardcoded in the configuration. For production use, consider:

1. Using environment variables
2. Implementing token rotation
3. Using least-privilege access tokens

## Troubleshooting

### Common Issues

1. **Token invalid**: Check if the Figma token is still valid
2. **Permission denied**: Ensure the token has necessary permissions
3. **Network issues**: Verify internet connectivity

### Debug Mode

Enable debug mode for detailed logging:

```bash
DEBUG=figma-mcp npx figma-developer-mcp YOUR_FIGMA_TOKEN_HERE --stdio
```

## Integration with RenewalPal

This MCP integration is used for:

1. Extracting design components from Figma
2. Generating code from design specifications
3. Maintaining design consistency across the application

### Setup Instructions

1. Verify the Figma token is valid
2. Test the MCP server connection
3. Configure your development environment to use the MCP server

## Examples

See the `examples/` directory for sample integrations and usage patterns.
