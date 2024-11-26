# Snom Dialer Browser Extension

A browser extension that enables click-to-call functionality for Snom IP phones directly from your web browser.

## Features

- One-click dialing from your browser to your Snom phone
  - right click on a tel:-Link
  - highlight a number and right click on it
  - click on the extension icon to dial a number manually
- Compatible with Snom's web interface (currently only the old version)
- Configurable settings

## Setup

1. Install the extension from the [chrome web store](https://chromewebstore.google.com/detail/snom-dialer/fncinajncfppdjcjbniimggfmcepmlmf)
2. Open the extension settings
3. Configure the following parameters:
   - IP Address / Hostname of your Snom phone (may require port :3112)
   - Protocol (http/https)
   - User credentials (username and password)

## Important Notes

- This extension uses Snom's old web interface to initiate calls
- Port 3112 may need to be added to your IP address (e.g., 192.168.1.100:3112)
- Make sure you have the correct credentials for your Snom phone

## Security

Credentials are stored in your browser's local storage.

## Support

For support or feature requests, please [create an issue](https://github.com/mkay-io/snomdialer/issues) or shoot me an email: [mkay.io](https://mkay.io).
